// src/components/navbar.tsx
"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/assistant",
      label: "AI Assistant",
      active: pathname === "/assistant",
    },
    {
      href: "/notes",
      label: "My Notes",
      active: pathname === "/notes",
    },
  ];

  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex gap-x-2 items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">
            Bio<span className="text-primary">AI</span>
          </h1>
        </Link>
      </div>
      <div className="flex gap-x-4 items-center">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-x-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
