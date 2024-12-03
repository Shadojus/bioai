// src/components/header.tsx
"use client";

import { Nav } from "./nav";

export function Header() {
  return (
    <header className="fixed top-0 w-full border-b bg-white dark:bg-slate-800 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Bio<span className="text-blue-600">AI</span>
        </h1>
        <Nav />
      </div>
    </header>
  );
}
