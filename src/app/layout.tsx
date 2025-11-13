import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Business Card",
  description: "Smart QR-powered AI business cards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
