import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Sidebar from "@/app/components/learner/Sidebar";
import ChatInboxClient from "@/app/components/chat/ChatInboxClient";

export default async function LearnerInboxPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 h-screen p-6">
        <ChatInboxClient roleLabel="Learner Workspace" accentClassName="bg-[#edf5f8]" />
      </main>
    </div>
  );
}
