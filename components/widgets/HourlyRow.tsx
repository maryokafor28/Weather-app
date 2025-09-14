import { ReactNode } from "react";

interface HourlyRowProps {
  time: string;
  icon: ReactNode; // you’ll pass your weather icon here
  temperature: number;
}

export default function HourlyRow({ time, icon, temperature }: HourlyRowProps) {
  return (
    <div
      className="flex items-center justify-between 
        px-2 py-2 mb-2 rounded-lg bg-[#2f2f49]
 shadow-[0_8px_25px_hsl(240,6%,90%/0.6)] border border-[var(--muted)]/15 backdrop-blur-xl"
    >
      {" "}
      {/* Time */}
      {/* Icon */}
      <div className="flex flex-row items-center justify-center gap-3 h-8">
        {icon}

        <span className="text-sm text-muted-foreground">{time}</span>
      </div>
      {/* Temperature */}
      <span className="text-sm font-medium">{temperature}°</span>
    </div>
  );
}
