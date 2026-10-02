import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
// import Navbar from "./components/landing/Navbar";
// import "./components/landing/Navbar.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Upstartica | Waitlist",
  description: "Idea Today Bigger Tomorrows",
  icons: {
    icon: "/images/Upstartica - App Icon.png",
    shortcut: "/images/Upstartica - App Icon.png",
    apple: "/images/Upstartica - App Icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/Upstartica - App Icon.png?v=2" />
        <link rel="shortcut icon" href="/images/Upstartica - App Icon.png?v=2" />
        <link rel="apple-touch-icon" href="/images/Upstartica - App Icon.png?v=2" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Preloader /> */}
        {/* <Navbar /> */}
        {children}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C1D8XCS85P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C1D8XCS85P');
          `}
        </Script>
        {/* Cloudflare Analytics */}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "fe9600a57303443ab0af9d39d122c55c"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

