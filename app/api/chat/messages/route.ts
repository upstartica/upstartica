import { NextResponse } from "next/server";
import { getAuthenticatedChatUser, sendConversationMessage } from "@/lib/chat-store";

const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to send message";
}

export async function POST(request: Request) {
  const currentUser = await getAuthenticatedChatUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  let conversationId = "";
  let message = "";
  let attachment:
    | {
        fileName: string;
        contentType: string;
        size: number;
        bytes: Buffer;
      }
    | undefined;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    conversationId =
      typeof formData.get("conversationId") === "string"
        ? (formData.get("conversationId") as string)
        : "";
    message =
      typeof formData.get("message") === "string" ? (formData.get("message") as string) : "";

    const file = formData.get("attachment");
    if (file instanceof File && file.size > 0) {
      const normalizedType = file.type || "application/octet-stream";

      if (!normalizedType.startsWith("image/") && normalizedType !== "application/pdf") {
        return NextResponse.json(
          { error: "Only image and PDF files are allowed." },
          { status: 400 }
        );
      }

      if (file.size > MAX_ATTACHMENT_SIZE) {
        return NextResponse.json(
          { error: "Attachment must be 10 MB or smaller." },
          { status: 400 }
        );
      }

      attachment = {
        fileName: file.name || "attachment",
        contentType: normalizedType,
        size: file.size,
        bytes: Buffer.from(await file.arrayBuffer()),
      };
    }
  } else {
    const body = await request.json();
    conversationId = typeof body?.conversationId === "string" ? body.conversationId : "";
    message = typeof body?.message === "string" ? body.message : "";
  }

  if (!conversationId || (!message.trim() && !attachment)) {
    return NextResponse.json(
      { error: "conversationId and either a message or attachment are required" },
      { status: 400 }
    );
  }

  try {
    const conversation = await sendConversationMessage(currentUser.email, conversationId, {
      body: message,
      attachment,
    });
    return NextResponse.json({ conversation });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 });
  }
}
