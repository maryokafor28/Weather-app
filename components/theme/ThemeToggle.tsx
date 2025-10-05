"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sun, Moon, Waves } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleToggle = () => {
    if (theme === "navy") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("navy");
  };

  let icon;
  if (theme === "light") {
    icon = <Sun className="w-5 h-5" />;
  } else if (theme === "dark") {
    icon = <Moon className="w-5 h-5" />;
  } else {
    icon = <Waves className="w-5 h-5" />;
  }

  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size="icon"
      className="rounded-lg hover:bg-[var(--accent-blue)] hover:text-white transition-all"
      aria-label="Toggle theme"
    >
      {icon}
    </Button>
  );
}
