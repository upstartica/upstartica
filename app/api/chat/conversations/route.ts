import { NextResponse } from "next/server";
import {
  ensureDirectConversation,
  getAuthenticatedChatUser,
  getChatDirectory,
  getConversationSummaries,
} from "@/lib/chat-store";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to create conversation";
}

export async function GET() {
  const currentUser = await getAuthenticatedChatUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [conversations, users] = await Promise.all([
    getConversationSummaries(currentUser.email),
    getChatDirectory(currentUser.email),
  ]);

  return NextResponse.json({
    currentUser,
    conversations,
    users,
  });
}

export async function POST(request: Request) {
  const currentUser = await getAuthenticatedChatUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const participantEmail = typeof body?.participantEmail === "string" ? body.participantEmail : "";

  if (!participantEmail) {
    return NextResponse.json({ error: "participantEmail is required" }, { status: 400 });
  }

  try {
    const conversation = await ensureDirectConversation(currentUser.email, participantEmail);
    return NextResponse.json({ conversation });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 });
  }
}
