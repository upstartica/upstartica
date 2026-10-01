export type AppUserRole = "learner" | "mentor" | "admin";

export type AppUserRecord = {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  password?: string;
  role?: AppUserRole;
  image?: string | null;
  createdAt?: string;
};

export type ChatParticipant = {
  email: string;
  name: string;
  role?: AppUserRole;
  image?: string | null;
};

export type ChatAttachmentKind = "image" | "pdf" | "file";

export type ChatAttachment = {
  key: string;
  fileName: string;
  contentType: string;
  size: number;
  kind: ChatAttachmentKind;
};

export type ChatMessage = {
  id: string;
  senderEmail: string;
  senderName: string;
  body: string;
  createdAt: string;
  attachment?: ChatAttachment;
};

export type ChatConversation = {
  id: string;
  participantEmails: string[];
  participantDetails: ChatParticipant[];
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  lastReadAt: Record<string, string>;
};

export type ChatConversationSummary = {
  id: string;
  participantDetails: ChatParticipant[];
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
};

export type ChatDirectoryUser = ChatParticipant & {
  hasConversation: boolean;
  conversationId?: string;
};
