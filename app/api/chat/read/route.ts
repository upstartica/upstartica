import { NextResponse } from "next/server";
import { getAuthenticatedChatUser, markConversationAsRead } from "@/lib/chat-store";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to update conversation";
}

export async function POST(request: Request) {
  const currentUser = await getAuthenticatedChatUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const conversationId = typeof body?.conversationId === "string" ? body.conversationId : "";

  if (!conversationId) {
    return NextResponse.json({ error: "conversationId is required" }, { status: 400 });
  }

  try {
    await markConversationAsRead(currentUser.email, conversationId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 });
  }
}
