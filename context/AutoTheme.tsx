"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useTheme } from "next-themes";

interface AutoThemeContextType {
  isAuto: boolean;
  setIsAuto: (value: boolean) => void;
  enableAutoTheme: () => void;
  disableAutoTheme: () => void;
}

const AutoThemeContext = createContext<AutoThemeContextType | undefined>(
  undefined
);

export function AutoThemeProvider({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme();
  const [isAuto, setIsAuto] = useState(false);

  useEffect(() => {
    if (!isAuto) return;

    const updateThemeBasedOnTime = () => {
      const hour = new Date().getHours();

      if (hour >= 6 && hour < 18) {
        setTheme("light"); // 6 AM - 6 PM
      } else if (hour >= 18 && hour < 22) {
        setTheme("navy"); // 6 PM - 10 PM
      } else {
        setTheme("dark"); // 10 PM - 6 AM
      }
    };

    updateThemeBasedOnTime();
    const interval = setInterval(updateThemeBasedOnTime, 60 * 60 * 1000); // Update every hour

    return () => clearInterval(interval);
  }, [isAuto, setTheme]);

  const enableAutoTheme = () => setIsAuto(true);
  const disableAutoTheme = () => setIsAuto(false);

  return (
    <AutoThemeContext.Provider
      value={{ isAuto, setIsAuto, enableAutoTheme, disableAutoTheme }}
    >
      {children}
    </AutoThemeContext.Provider>
  );
}

export function useAutoTheme() {
  const context = useContext(AutoThemeContext);
  if (context === undefined) {
    throw new Error("useAutoTheme must be used within AutoThemeProvider");
  }
  return context;
}
