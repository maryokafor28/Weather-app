"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
};

export function StatCard({ label, value, unit, className }: StatCardProps) {
  return (
    <Card
      className={cn(
        "bg-[var(--background-card)] rounded-xl w-[180px] h-[100px] border border-[var(--muted)]/15 backdrop-blur-md shadow-[0_8px_30px_hsl(240,6%,70%/0.3)]",
        className
      )}
    >
      <CardContent className="p-3 flex flex-col items-start justify-center space-y-1 h-full">
        <p className="text-sm text-muted">{label}</p>
        <p className="text-lg  text-muted font-semibold">
          {value}
          {unit && <span className="text-base font-normal ml-1">{unit}</span>}
        </p>
      </CardContent>
    </Card>
  );
}
