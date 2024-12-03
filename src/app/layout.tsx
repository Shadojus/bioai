// src/app/layout.tsx
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { StateProvider } from "@/contexts/StateContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BioAI",
  description: "Your AI Biology Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
