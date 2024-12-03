// src/components/providers/providers.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { StateProvider } from "@/contexts/StateContext";

const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider client={convexClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <StateProvider>{children}</StateProvider>
      </ThemeProvider>
    </ConvexProvider>
  );
}
