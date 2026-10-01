"use client";

import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  FileText,
  Image as ImageIcon,
  MessageCircle,
  Paperclip,
  Search,
  Send,
  Smile,
  UserRound,
  Users,
  X,
} from "lucide-react";
import type {
  ChatAttachment,
  ChatConversationSummary,
  ChatDirectoryUser,
  ChatParticipant,
} from "@/types/chat";

type ChatResponse = {
  currentUser: ChatParticipant;
  conversations: ChatConversationSummary[];
  users: ChatDirectoryUser[];
};

type ChatInboxClientProps = {
  roleLabel: string;
  accentClassName: string;
};

const EMOJI_OPTIONS = ["😀", "😂", "😊", "😍", "👍", "🎉", "🔥", "🙏"];

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unexpected error";
}

function formatMessageTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatConversationTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const sameDay = now.toDateString() === date.toDateString();
  if (sameDay) {
    return formatMessageTime(value);
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getOtherParticipants(
  conversation: ChatConversationSummary,
  currentUserEmail: string | undefined
) {
  return conversation.participantDetails.filter(
    (participant) => participant.email !== currentUserEmail
  );
}

function upsertConversation(
  conversations: ChatConversationSummary[],
  nextConversation: ChatConversationSummary
) {
  const remaining = conversations.filter(
    (conversation) => conversation.id !== nextConversation.id
  );
  return [nextConversation, ...remaining].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  );
}

function getAttachmentLabel(attachment: ChatAttachment) {
  if (attachment.kind === "image") {
    return "Image attachment";
  }
  if (attachment.kind === "pdf") {
    return "PDF attachment";
  }
  return "File attachment";
}

function getMessagePreview(conversation: ChatConversationSummary) {
  const lastMessage = conversation.messages.at(-1);
  if (!lastMessage) {
    return "No messages yet";
  }

  if (lastMessage.body) {
    return lastMessage.body;
  }

  if (lastMessage.attachment) {
    return getAttachmentLabel(lastMessage.attachment);
  }

  return "No messages yet";
}

function buildAttachmentUrl(conversationId: string, messageId: string) {
  const params = new URLSearchParams({
    conversationId,
    messageId,
  });
  return `/api/chat/files?${params.toString()}`;
}

export default function ChatInboxClient({
  roleLabel,
  accentClassName,
}: ChatInboxClientProps) {
  const [data, setData] = useState<ChatResponse | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAttachment, setSelectedAttachment] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const loadChatData = useEffectEvent(async (preserveSelection: boolean) => {
    try {
      const response = await fetch("/api/chat/conversations", {
        method: "GET",
        cache: "no-store",
      });
      const payload = (await response.json()) as Partial<ChatResponse> & { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to load conversations.");
      }

      const nextData = payload as ChatResponse;
      const nextConversationIds = new Set(
        nextData.conversations.map((conversation) => conversation.id)
      );

      setData(nextData);
      setSelectedConversationId((currentSelection) => {
        if (preserveSelection && currentSelection && nextConversationIds.has(currentSelection)) {
          return currentSelection;
        }
        return nextData.conversations[0]?.id ?? null;
      });

      setError(null);
    } catch (loadError: unknown) {
      setError(getErrorMessage(loadError) || "Unable to load chat.");
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    void loadChatData(false);
    const intervalId = window.setInterval(() => {
      void loadChatData(true);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeConversation = useMemo(
    () =>
      data?.conversations.find((conversation) => conversation.id === selectedConversationId) ??
      data?.conversations[0] ??
      null,
    [data?.conversations, selectedConversationId]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeConversation?.id, activeConversation?.messages.length]);

  useEffect(() => {
    if (!activeConversation || !data?.currentUser.email || activeConversation.unreadCount === 0) {
      return;
    }

    const hasUnreadFromOtherUser = activeConversation.messages.some(
      (entry) => entry.senderEmail !== data.currentUser.email
    );

    if (!hasUnreadFromOtherUser) {
      return;
    }

    const controller = new AbortController();

    void fetch("/api/chat/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: activeConversation.id }),
      signal: controller.signal,
    })
      .then(() => {
        setData((currentData) => {
          if (!currentData) return currentData;
          return {
            ...currentData,
            conversations: currentData.conversations.map((conversation) =>
              conversation.id === activeConversation.id
                ? { ...conversation, unreadCount: 0 }
                : conversation
            ),
          };
        });
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [activeConversation, data?.currentUser.email]);

  const normalizedSearchQuery = deferredSearchQuery.trim().toLowerCase();

  const filteredConversations = useMemo(() => {
    if (!data) return [];
    if (!normalizedSearchQuery) return data.conversations;

    return data.conversations.filter((conversation) => {
      const participantLabel = getOtherParticipants(conversation, data.currentUser.email)
        .map((participant) => participant.name)
        .join(" ");
      const lastMessage = getMessagePreview(conversation);

      return [participantLabel, lastMessage].some((value) =>
        value.toLowerCase().includes(normalizedSearchQuery)
      );
    });
  }, [data, normalizedSearchQuery]);

  const filteredUsers = useMemo(() => {
    if (!data) return [];

    const alreadyVisibleConversationIds = new Set(
      filteredConversations.map((conversation) => conversation.id)
    );

    return data.users.filter((user) => {
      const matchesSearch =
        !normalizedSearchQuery ||
        user.name.toLowerCase().includes(normalizedSearchQuery) ||
        user.email.toLowerCase().includes(normalizedSearchQuery);

      if (!matchesSearch) {
        return false;
      }

      if (!user.conversationId) {
        return true;
      }

      return !alreadyVisibleConversationIds.has(user.conversationId);
    });
  }, [data, filteredConversations, normalizedSearchQuery]);

  async function startConversation(user: ChatDirectoryUser) {
    try {
      const response = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantEmail: user.email }),
      });
      const payload = (await response.json()) as {
        conversation?: ChatConversationSummary;
        error?: string;
      };

      if (!response.ok || !payload.conversation) {
        throw new Error(payload.error ?? "Unable to start conversation.");
      }

      const conversation = payload.conversation;

      setData((currentData) => {
        if (!currentData) return currentData;

        return {
          ...currentData,
          conversations: upsertConversation(currentData.conversations, conversation),
          users: currentData.users.map((entry) =>
            entry.email === user.email
              ? {
                  ...entry,
                  hasConversation: true,
                  conversationId: conversation.id,
                }
              : entry
          ),
        };
      });
      setSelectedConversationId(conversation.id);
      setError(null);
    } catch (conversationError: unknown) {
      setError(getErrorMessage(conversationError) || "Unable to start conversation.");
    }
  }

  async function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if ((!message.trim() && !selectedAttachment) || !selectedConversationId) {
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/chat/messages", {
        method: "POST",
        body: (() => {
          if (selectedAttachment) {
            const formData = new FormData();
            formData.append("conversationId", selectedConversationId);
            formData.append("message", message);
            formData.append("attachment", selectedAttachment);
            return formData;
          }

          return JSON.stringify({
            conversationId: selectedConversationId,
            message,
          });
        })(),
        headers: selectedAttachment ? undefined : { "Content-Type": "application/json" },
      });

      const payload = (await response.json()) as {
        conversation?: ChatConversationSummary;
        error?: string;
      };

      if (!response.ok || !payload.conversation) {
        throw new Error(payload.error ?? "Unable to send message.");
      }

      const conversation = payload.conversation;

      setData((currentData) => {
        if (!currentData) return currentData;
        return {
          ...currentData,
          conversations: upsertConversation(currentData.conversations, conversation),
        };
      });
      setSelectedConversationId(conversation.id);
      setMessage("");
      setSelectedAttachment(null);
      setShowEmojiPicker(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setError(null);
    } catch (sendError: unknown) {
      setError(getErrorMessage(sendError) || "Unable to send message.");
    } finally {
      setIsSending(false);
    }
  }

  function handleAttachmentSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setSelectedAttachment(null);
      return;
    }

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setError("Only image and PDF files are allowed.");
      event.target.value = "";
      return;
    }

    setSelectedAttachment(file);
    setError(null);
  }

  function removeAttachment() {
    setSelectedAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-gray-100 bg-white text-sm text-gray-500 shadow-sm">
        Loading chat workspace...
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl border border-red-100 bg-red-50 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6">
      <section className="flex w-[25rem] flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              {roleLabel}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">Chat Inbox</h1>
            <p className="mt-1 text-sm text-gray-500">
              Persistent conversations with emoji, images, and PDFs.
            </p>
          </div>

          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search conversations or users"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 pt-4">
          <div>
            <div className="mb-3 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              <MessageCircle size={14} />
              Active Conversations
            </div>

            {filteredConversations.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-6 text-sm text-gray-500">
                No conversations yet. Start one from the directory below.
              </div>
            ) : (
              <div className="space-y-2">
                {filteredConversations.map((conversation) => {
                  const participants = getOtherParticipants(
                    conversation,
                    data?.currentUser.email
                  );
                  const participantLabel = participants.map((participant) => participant.name).join(", ");
                  const isActive = conversation.id === activeConversation?.id;

                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() => setSelectedConversationId(conversation.id)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                        isActive
                          ? `${accentClassName} border-transparent shadow-sm`
                          : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-sm font-bold text-gray-700">
                          {getInitials(participantLabel || "C")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {participantLabel || "Conversation"}
                            </p>
                            <span className="shrink-0 text-[11px] text-gray-400">
                              {formatConversationTime(conversation.updatedAt)}
                            </span>
                          </div>
                          <p className="mt-1 truncate text-sm text-gray-500">
                            {getMessagePreview(conversation)}
                          </p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gray-900 px-2 text-[11px] font-semibold text-white">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              <Users size={14} />
              User Directory
            </div>

            {filteredUsers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-6 text-sm text-gray-500">
                No additional users matched your search.
              </div>
            ) : (
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <button
                    key={user.email}
                    type="button"
                    onClick={() =>
                      user.conversationId
                        ? setSelectedConversationId(user.conversationId)
                        : void startConversation(user)
                    }
                    className="flex w-full items-center gap-3 rounded-2xl border border-transparent bg-gray-50 px-4 py-3 text-left transition hover:border-gray-200 hover:bg-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-bold text-gray-700">
                      {getInitials(user.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="truncate text-xs text-gray-500">
                        {user.role ? `${user.role} - ` : ""}
                        {user.email}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#2c6684]">
                      {user.conversationId ? "Open" : "Start"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-8 py-6">
          {activeConversation && data ? (
            (() => {
              const participants = getOtherParticipants(activeConversation, data.currentUser.email);
              const title = participants.map((participant) => participant.name).join(", ");

              return (
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#edf5f8] text-lg font-bold text-[#2c6684]">
                    {getInitials(title || "C")}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{title || "Conversation"}</h2>
                    <p className="text-sm text-gray-500">
                      {participants[0]?.role ? `${participants[0].role} account` : "Registered user"}
                    </p>
                  </div>
                </div>
              );
            })()
          ) : (
            <div>
              <h2 className="text-xl font-bold text-gray-900">Select a conversation</h2>
              <p className="mt-1 text-sm text-gray-500">
                Choose an existing chat or start one from the directory.
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto bg-[#f8fafb] px-8 py-6">
          {activeConversation && data ? (
            <div className="space-y-5">
              {activeConversation.messages.length === 0 ? (
                <div className="flex min-h-full items-center justify-center">
                  <div className="max-w-sm rounded-3xl border border-dashed border-gray-200 bg-white px-8 py-10 text-center">
                    <UserRound className="mx-auto h-10 w-10 text-gray-300" />
                    <p className="mt-4 text-sm font-medium text-gray-700">
                      This conversation is ready.
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Send the first message to start the thread.
                    </p>
                  </div>
                </div>
              ) : (
                activeConversation.messages.map((entry) => {
                  const isCurrentUser = entry.senderEmail === data.currentUser.email;
                  const attachmentUrl = entry.attachment
                    ? buildAttachmentUrl(activeConversation.id, entry.id)
                    : null;

                  return (
                    <div
                      key={entry.id}
                      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-[24px] px-5 py-4 shadow-sm ${
                          isCurrentUser
                            ? "rounded-br-md bg-[#2c6684] text-white"
                            : "rounded-bl-md border border-gray-100 bg-white text-gray-800"
                        }`}
                      >
                        {!isCurrentUser && (
                          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                            {entry.senderName}
                          </p>
                        )}
                        {entry.attachment && attachmentUrl && entry.attachment.kind === "image" && (
                          <a
                            href={attachmentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mb-3 block overflow-hidden rounded-2xl"
                          >
                            <Image
                              src={attachmentUrl}
                              alt={entry.attachment.fileName}
                              width={320}
                              height={220}
                              unoptimized
                              className="max-h-72 w-full rounded-2xl object-cover"
                            />
                          </a>
                        )}
                        {entry.attachment && attachmentUrl && entry.attachment.kind !== "image" && (
                          <a
                            href={attachmentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`mb-3 flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                              isCurrentUser
                                ? "border-white/15 bg-white/10 text-white"
                                : "border-gray-200 bg-gray-50 text-gray-700"
                            }`}
                          >
                            {entry.attachment.kind === "pdf" ? (
                              <FileText size={20} />
                            ) : (
                              <ImageIcon size={20} />
                            )}
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold">
                                {entry.attachment.fileName}
                              </p>
                              <p
                                className={`text-xs ${
                                  isCurrentUser ? "text-white/70" : "text-gray-500"
                                }`}
                              >
                                {getAttachmentLabel(entry.attachment)}
                              </p>
                            </div>
                          </a>
                        )}
                        {entry.body && <p className="text-sm leading-6">{entry.body}</p>}
                        <p
                          className={`mt-3 text-[11px] ${
                            isCurrentUser ? "text-white/70" : "text-gray-400"
                          }`}
                        >
                          {formatMessageTime(entry.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-md rounded-3xl border border-dashed border-gray-200 bg-white px-8 py-10 text-center">
                <MessageCircle className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-4 text-base font-semibold text-gray-800">
                  No conversation selected
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Open a user from the left panel and the messages will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 bg-white px-8 py-6">
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={handleAttachmentSelection}
          />

          {selectedAttachment && (
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                {selectedAttachment.type.startsWith("image/") ? (
                  <ImageIcon size={18} className="text-[#2c6684]" />
                ) : (
                  <FileText size={18} className="text-[#2c6684]" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {selectedAttachment.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedAttachment.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeAttachment}
                className="rounded-full p-2 text-gray-400 transition hover:bg-white hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-end gap-4">
            <div className="relative flex-1">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={
                  activeConversation
                    ? "Write a message..."
                    : "Select or start a conversation first"
                }
                disabled={!activeConversation || isSending}
                rows={1}
                className="min-h-14 w-full resize-none rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 pr-24 text-sm text-gray-700 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
                <button
                  type="button"
                  disabled={!activeConversation || isSending}
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full p-2 text-gray-400 transition hover:bg-white hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Paperclip size={18} />
                </button>

                <div className="relative">
                  <button
                    type="button"
                    disabled={!activeConversation || isSending}
                    onClick={() => setShowEmojiPicker((currentValue) => !currentValue)}
                    className="rounded-full p-2 text-gray-400 transition hover:bg-white hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Smile size={18} />
                  </button>

                  {showEmojiPicker && activeConversation && (
                    <div className="absolute bottom-12 right-0 z-20 flex w-52 flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setMessage((currentMessage) => `${currentMessage}${emoji}`)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-lg transition hover:bg-gray-50"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!activeConversation || (!message.trim() && !selectedAttachment) || isSending}
              className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#2c6684] text-white transition hover:bg-[#24556d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
