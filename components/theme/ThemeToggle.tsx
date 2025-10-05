"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sun, Moon, Waves, Clock } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAuto, setIsAuto] = useState(false);

  useEffect(() => setMounted(true), []);

  // Auto theme logic
  useEffect(() => {
    if (!isAuto) return;

    const updateThemeBasedOnTime = () => {
      const hour = new Date().getHours();

      if (hour >= 6 && hour < 18) {
        setTheme("light");
      } else if (hour >= 18 && hour < 22) {
        setTheme("navy");
      } else {
        setTheme("dark");
      }
    };

    updateThemeBasedOnTime();
    const interval = setInterval(updateThemeBasedOnTime, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAuto, setTheme]);

  if (!mounted) return null;

  const handleToggle = () => {
    if (isAuto) {
      // Exit auto mode, go to navy
      setIsAuto(false);
      setTheme("navy");
    } else if (theme === "navy") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      // Enable auto mode
      setIsAuto(true);
    }
  };

  // Choose icon
  let icon;
  if (isAuto) {
    icon = <Clock className="w-5 h-5 " />;
  } else if (theme === "light") {
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
