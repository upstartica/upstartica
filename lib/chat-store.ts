import { GetObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/auth";
import {
  getAllUsers,
  findUserByEmail,
  uploadToR2,
  r2Client,
  R2_BUCKET_NAME,
} from "@/lib/r2";
import type {
  AppUserRecord,
  ChatAttachment,
  ChatAttachmentKind,
  ChatConversation,
  ChatConversationSummary,
  ChatDirectoryUser,
  ChatMessage,
  ChatParticipant,
} from "@/types/chat";

const CHAT_STORE_KEY = "Private/chat/conversations.json";
const CHAT_ATTACHMENT_PREFIX = "Private/chat/attachments";

type ChatStore = {
  conversations: ChatConversation[];
};

type ChatAttachmentUpload = {
  fileName: string;
  contentType: string;
  size: number;
  bytes: Buffer;
};

type ChatAttachmentResponse = {
  attachment: ChatAttachment;
  bytes: Uint8Array;
};

function getErrorName(error: unknown) {
  return error instanceof Error ? error.name : "";
}

function hasTransformToString(
  value: unknown
): value is { transformToString: (encoding?: string) => Promise<string> } {
  return (
    typeof value === "object" &&
    value !== null &&
    "transformToString" in value &&
    typeof value.transformToString === "function"
  );
}

function hasTransformToByteArray(
  value: unknown
): value is { transformToByteArray: () => Promise<Uint8Array> } {
  return (
    typeof value === "object" &&
    value !== null &&
    "transformToByteArray" in value &&
    typeof value.transformToByteArray === "function"
  );
}

function isAsyncIterable(value: unknown): value is AsyncIterable<Uint8Array> {
  return (
    typeof value === "object" &&
    value !== null &&
    Symbol.asyncIterator in value &&
    typeof value[Symbol.asyncIterator] === "function"
  );
}

function getUserDisplayName(user: Partial<AppUserRecord>) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  if (fullName) return fullName;
  if (user.name?.trim()) return user.name.trim();
  if (user.email) return user.email.split("@")[0];
  return "Unknown User";
}

function toParticipant(user: Partial<AppUserRecord> & { email: string }): ChatParticipant {
  return {
    email: user.email,
    name: getUserDisplayName(user),
    role: user.role,
    image: user.image ?? null,
  };
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function inferAttachmentKind(contentType: string): ChatAttachmentKind {
  if (contentType.startsWith("image/")) {
    return "image";
  }
  if (contentType === "application/pdf") {
    return "pdf";
  }
  return "file";
}

function normalizeAttachment(attachment: ChatMessage["attachment"]) {
  if (!attachment) {
    return undefined;
  }

  return {
    ...attachment,
    kind: attachment.kind ?? inferAttachmentKind(attachment.contentType),
  };
}

function normalizeConversation(conversation: ChatConversation): ChatConversation {
  return {
    ...conversation,
    participantEmails: [...(conversation.participantEmails ?? [])].sort(),
    participantDetails: conversation.participantDetails ?? [],
    messages: (conversation.messages ?? []).map((message) => ({
      ...message,
      body: message.body ?? "",
      attachment: normalizeAttachment(message.attachment),
    })),
    lastReadAt: conversation.lastReadAt ?? {},
  };
}

function normalizeChatStore(store: ChatStore): ChatStore {
  return {
    conversations: sortConversations((store.conversations ?? []).map(normalizeConversation)),
  };
}

async function readBodyAsString(body: unknown) {
  if (hasTransformToString(body)) {
    return body.transformToString("utf-8");
  }

  if (!isAsyncIterable(body)) {
    throw new Error("Unsupported R2 response body.");
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of body) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString("utf-8");
}

async function readBodyAsBytes(body: unknown) {
  if (hasTransformToByteArray(body)) {
    return body.transformToByteArray();
  }

  if (!isAsyncIterable(body)) {
    throw new Error("Unsupported R2 response body.");
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of body) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}

async function streamToJson<T>(key: string, fallback: T): Promise<T> {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  try {
    const response = await r2Client.send(command);
    if (!response.Body) return fallback;

    return JSON.parse(await readBodyAsString(response.Body)) as T;
  } catch (error: unknown) {
    const errorName = getErrorName(error);
    if (errorName === "NoSuchKey" || errorName === "NotFound") {
      return fallback;
    }
    throw error;
  }
}

async function readChatStore(): Promise<ChatStore> {
  const store = await streamToJson<ChatStore>(CHAT_STORE_KEY, { conversations: [] });
  return normalizeChatStore(store);
}

async function writeChatStore(store: ChatStore) {
  await uploadToR2(
    CHAT_STORE_KEY,
    JSON.stringify(normalizeChatStore(store), null, 2),
    "application/json"
  );
}

function buildConversationId(emails: string[]) {
  return Buffer.from(emails.map((email) => email.toLowerCase()).sort().join("::")).toString("base64url");
}

function sortConversations(conversations: ChatConversation[]) {
  return [...conversations].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  );
}

function summarizeConversation(
  conversation: ChatConversation,
  currentUserEmail: string
): ChatConversationSummary {
  const lastReadAt = conversation.lastReadAt[currentUserEmail];
  const unreadCount = conversation.messages.filter((message) => {
    if (message.senderEmail === currentUserEmail) return false;
    if (!lastReadAt) return true;
    return new Date(message.createdAt).getTime() > new Date(lastReadAt).getTime();
  }).length;

  return {
    ...conversation,
    unreadCount,
  };
}

function getConversationForUser(
  store: ChatStore,
  currentUserEmail: string,
  conversationId: string
) {
  const conversation = store.conversations.find((entry) => entry.id === conversationId);

  if (!conversation || !conversation.participantEmails.includes(currentUserEmail)) {
    throw new Error("Conversation not found.");
  }

  return conversation;
}

async function resolveParticipant(email: string) {
  const user = await findUserByEmail(email);
  return toParticipant({ email, ...user });
}

async function resolveRegisteredParticipant(email: string) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found.");
  }

  return toParticipant({ email, ...user });
}

export async function getAuthenticatedChatUser() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return null;
  }

  const user = await findUserByEmail(email);
  return toParticipant({
    email,
    name: session.user.name ?? undefined,
    image: session.user.image ?? null,
    role: session.user.role,
    ...user,
  });
}

export async function getChatDirectory(currentUserEmail: string): Promise<ChatDirectoryUser[]> {
  const [store, users] = await Promise.all([readChatStore(), getAllUsers()]);

  const conversationsByEmail = new Map<string, string>();
  for (const conversation of store.conversations) {
    if (!conversation.participantEmails.includes(currentUserEmail)) {
      continue;
    }

    const otherEmail = conversation.participantEmails.find((email) => email !== currentUserEmail);
    if (otherEmail) {
      conversationsByEmail.set(otherEmail, conversation.id);
    }
  }

  return users
    .filter((user): user is AppUserRecord => Boolean(user?.email))
    .filter((user) => user.email !== currentUserEmail)
    .map((user) => ({
      ...toParticipant(user),
      hasConversation: conversationsByEmail.has(user.email),
      conversationId: conversationsByEmail.get(user.email),
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export async function getConversationSummaries(currentUserEmail: string) {
  const store = await readChatStore();

  return sortConversations(
    store.conversations.filter((conversation) =>
      conversation.participantEmails.includes(currentUserEmail)
    )
  ).map((conversation) => summarizeConversation(conversation, currentUserEmail));
}

export async function ensureDirectConversation(currentUserEmail: string, participantEmail: string) {
  if (currentUserEmail === participantEmail) {
    throw new Error("You cannot create a conversation with yourself.");
  }

  const [store, currentUser, participant] = await Promise.all([
    readChatStore(),
    resolveParticipant(currentUserEmail),
    resolveRegisteredParticipant(participantEmail),
  ]);

  const conversationId = buildConversationId([currentUserEmail, participantEmail]);
  const existingConversation = store.conversations.find(
    (conversation) => conversation.id === conversationId
  );

  if (existingConversation) {
    existingConversation.participantDetails = [currentUser, participant];
    await writeChatStore(store);
    return summarizeConversation(existingConversation, currentUserEmail);
  }

  const now = new Date().toISOString();
  const conversation: ChatConversation = {
    id: conversationId,
    participantEmails: [currentUserEmail, participantEmail].sort(),
    participantDetails: [currentUser, participant],
    messages: [],
    createdAt: now,
    updatedAt: now,
    lastReadAt: {
      [currentUserEmail]: now,
    },
  };

  store.conversations.push(conversation);
  await writeChatStore(store);
  return summarizeConversation(conversation, currentUserEmail);
}

export async function sendConversationMessage(
  currentUserEmail: string,
  conversationId: string,
  input: {
    body?: string;
    attachment?: ChatAttachmentUpload;
  }
) {
  const trimmedBody = input.body?.trim() ?? "";
  if (!trimmedBody && !input.attachment) {
    throw new Error("Message cannot be empty.");
  }

  const store = await readChatStore();
  const conversation = getConversationForUser(store, currentUserEmail, conversationId);

  const sender =
    conversation.participantDetails.find((participant) => participant.email === currentUserEmail) ??
    (await resolveParticipant(currentUserEmail));

  let attachment: ChatAttachment | undefined;
  if (input.attachment) {
    const safeFileName = sanitizeFileName(input.attachment.fileName || "attachment");
    const key = `${CHAT_ATTACHMENT_PREFIX}/${conversationId}/${crypto.randomUUID()}-${safeFileName}`;
    await uploadToR2(key, input.attachment.bytes, input.attachment.contentType);
    attachment = {
      key,
      fileName: input.attachment.fileName,
      contentType: input.attachment.contentType,
      size: input.attachment.size,
      kind: inferAttachmentKind(input.attachment.contentType),
    };
  }

  const message: ChatMessage = {
    id: crypto.randomUUID(),
    senderEmail: currentUserEmail,
    senderName: sender.name,
    body: trimmedBody,
    createdAt: new Date().toISOString(),
    attachment,
  };

  conversation.messages.push(message);
  conversation.updatedAt = message.createdAt;
  conversation.lastReadAt[currentUserEmail] = message.createdAt;

  await writeChatStore({ conversations: sortConversations(store.conversations) });
  return summarizeConversation(conversation, currentUserEmail);
}

export async function markConversationAsRead(currentUserEmail: string, conversationId: string) {
  const store = await readChatStore();
  const conversation = getConversationForUser(store, currentUserEmail, conversationId);

  conversation.lastReadAt[currentUserEmail] = new Date().toISOString();
  await writeChatStore(store);
}

export async function getConversationAttachment(
  currentUserEmail: string,
  conversationId: string,
  messageId: string
): Promise<ChatAttachmentResponse> {
  const store = await readChatStore();
  const conversation = getConversationForUser(store, currentUserEmail, conversationId);
  const message = conversation.messages.find((entry) => entry.id === messageId);

  if (!message?.attachment) {
    throw new Error("Attachment not found.");
  }

  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: message.attachment.key,
  });
  const response = await r2Client.send(command);

  if (!response.Body) {
    throw new Error("Attachment content not found.");
  }

  return {
    attachment: message.attachment,
    bytes: await readBodyAsBytes(response.Body),
  };
}
