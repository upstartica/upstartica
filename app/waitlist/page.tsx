import type { Metadata } from "next";
import WaitlistPage from "./WaitlistPage";

export const metadata: Metadata = {
  title: "Upstartica | Waitlist",
  description: "Join the Upstartica waitlist for the January 2027 launch.",
  icons: {
    icon: "/images/Upstartica - App Icon.png?v=2",
    shortcut: "/images/Upstartica - App Icon.png?v=2",
    apple: "/images/Upstartica - App Icon.png?v=2",
  },
};

export default function Page() {
  return <WaitlistPage />;
}
