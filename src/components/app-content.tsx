// src/components/app-content.tsx
"use client";

import { Header } from "./header";

export function AppContent() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-16">
        {/* Your app content here */}
      </main>
    </div>
  );
}
