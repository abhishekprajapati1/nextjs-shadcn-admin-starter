import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import { cn } from "@/lib/utils";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rakritech",
  description: `Rakritech helps you hire talent seamlessly.`,
  icons: {
    icon: "/favicon/favicon-32x32.png",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("h-screen overflow-auto")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
