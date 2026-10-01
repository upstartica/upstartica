import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Sidebar from "@/app/components/mentor/Sidebar";
import ChatInboxClient from "@/app/components/chat/ChatInboxClient";

export default async function MentorInboxPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/mentor-login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 h-screen p-6">
        <ChatInboxClient roleLabel="Mentor Workspace" accentClassName="bg-[#eef7fb]" />
      </main>
    </div>
  );
}
