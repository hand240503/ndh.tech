"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  if (!mounted) {
    return (
      <div className="h-7 w-20 border border-theme-border rounded-[4px] opacity-0"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-mono rounded-[4px] border border-theme-border bg-theme-panel-2 text-theme-muted hover:text-theme-text hover:border-theme-teal transition-all cursor-pointer select-none"
      title={`Chuyển sang theme ${theme === "dark" ? "sáng" : "tối"}`}
      aria-label="Chuyển đổi giao diện sáng/tối"
    >
      <span className="text-[11px]">{theme === "dark" ? "🌙" : "☀️"}</span>
      <span>theme:</span>
      <span className="text-theme-teal font-medium">{theme}</span>
    </button>
  );
}
