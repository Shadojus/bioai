// src/app/layout.tsx
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { StateProvider } from "@/contexts/StateContext";
import Link from "next/link";
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
        <StateProvider>
          {/* Navigation Bar */}
          <nav className="bg-white shadow-md py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                <Link href="/">BioAI</Link>
              </h1>
              <div className="space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <Link
                  href="/garmin-login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Garmin Login
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="container mx-auto p-6">{children}</main>
        </StateProvider>
      </body>
    </html>
  );
}
