// src/components/theme-script.tsx
"use client";

import { useEffect } from "react";

export default function ThemeScript() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "system";
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return null;
}
