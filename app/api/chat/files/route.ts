import { NextResponse } from "next/server";
import { getAuthenticatedChatUser, getConversationAttachment } from "@/lib/chat-store";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to load attachment";
}

function getContentDisposition(contentType: string, fileName: string) {
  const dispositionType = contentType === "application/pdf" ? "inline" : "inline";
  const normalizedFileName = fileName.replace(/"/g, "");
  return `${dispositionType}; filename="${normalizedFileName}"`;
}

export async function GET(request: Request) {
  const currentUser = await getAuthenticatedChatUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId") ?? "";
  const messageId = searchParams.get("messageId") ?? "";

  if (!conversationId || !messageId) {
    return NextResponse.json(
      { error: "conversationId and messageId are required" },
      { status: 400 }
    );
  }

  try {
    const { attachment, bytes } = await getConversationAttachment(
      currentUser.email,
      conversationId,
      messageId
    );

    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": attachment.contentType,
        "Content-Length": attachment.size.toString(),
        "Content-Disposition": getContentDisposition(
          attachment.contentType,
          attachment.fileName
        ),
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 });
  }
}
