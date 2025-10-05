"use client";

import { ReactNode } from "react";
import { useTheme } from "next-themes";

interface HourlyRowProps {
  time?: string;
  icon?: ReactNode;
  temperature?: number;
}

export default function HourlyRow({ time, icon, temperature }: HourlyRowProps) {
  const { theme } = useTheme();
  const isSkeleton =
    time === undefined && icon === undefined && temperature === undefined;

  return (
    <div
      className={`flex items-center justify-between 
        px-1 py-2 mb-2 rounded-lg
        shadow-[0_8px_25px_hsl(240,6%,90%/0.6)]
        border border-[var(--muted)]/15 backdrop-blur-xl 
        ${isSkeleton ? "animate-pulse" : ""}`}
      style={{
        background: theme === "light" ? "white" : "#2f2f49",
        color: theme === "light" ? "black" : "white",
      }}
    >
      {/* Left side */}
      <div className="flex flex-row items-center justify-center gap-3 h-8">
        {isSkeleton ? (
          <></>
        ) : (
          <>
            {icon}
            <span
              className="text-sm"
              style={{
                color:
                  theme === "light" ? "hsl(220, 10%, 50%)" : "var(--muted)",
              }}
            >
              {time}
            </span>
          </>
        )}
      </div>

      {/* Right side */}
      {isSkeleton ? (
        <div className="" />
      ) : (
        <span className="text-sm font-medium">{temperature}°</span>
      )}
    </div>
  );
}
