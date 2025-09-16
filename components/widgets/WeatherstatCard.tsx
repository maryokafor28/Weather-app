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
        "bg-[var(--background-card)] rounded-xl w-full h-28 sm:h-32 border border-[var(--muted)]/15 backdrop-blur-md shadow-[0_8px_30px_hsl(240,6%,70%/0.3)]",
        className
      )}
    >
      <CardContent className="p-3 flex flex-col items-start justify-center space-y-2 h-full">
        <p className="text-sm text-muted leading-relaxed">{label}</p>
        <p className="text-3xl font-semibold text-muted leading-relaxed">
          {value}
          {unit && (
            <span className="text-base font-normal ml-1 leading-none">
              {unit}
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
