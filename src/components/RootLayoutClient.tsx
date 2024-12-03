// src/components/RootLayoutClient.tsx
"use client";

import { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { EmergencyAlerts } from "@/components/emergency/EmergencyAlerts";

interface RootLayoutClientProps {
  children: ReactNode;
  className: string;
}

export function RootLayoutClient({
  children,
  className,
}: RootLayoutClientProps) {
  return (
    <body className={`${className} bg-slate-50 dark:bg-slate-900`}>
      <header className="fixed top-0 w-full border-b bg-white dark:bg-slate-800 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Bio<span className="text-blue-600">AI</span>
          </h1>
          <Nav />
        </div>
      </header>
      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
      <EmergencyAlerts />
    </body>
  );
}
