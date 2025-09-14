"use client";

import { useState } from "react";
import Logo from "@/components/widgets/logo";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

type UnitSystem = "imperial" | "metric";

export default function UnitSettings({
  selected = "metric",
  onUnitChange,
}: {
  selected?: UnitSystem;
  onUnitChange?: (u: UnitSystem) => void;
}) {
  const [unit, setUnit] = useState<UnitSystem>(selected);

  const toggleSystem = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    onUnitChange?.(newUnit);
  };

  // helper to render row with optional checkmark
  const renderItem = (label: string, active: boolean) => (
    <DropdownMenuItem
      disabled
      className={`flex items-center justify-between cursor-default rounded-md px-3 py-2 transition
        ${
          active
            ? "bg-white/10 shadow-xl"
            : "bg-[var(--background-card)] shadow -xl"
        }`}
    >
      <span className="text-md font-medium">{label}</span>
      {active && (
        <Image
          src="/images/icon-checkmark.svg"
          alt="checked"
          width={16}
          height={16}
        />
      )}
    </DropdownMenuItem>
  );

  return (
    <div className="flex items-center justify-between w-full">
      <Logo />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 rounded-md bg-[var(--background-card)] px-3 py-2 shadow focus:outline-none focus:ring-1 focus:ring-offset-1 ">
            <Image
              src="/images/icon-units.svg"
              alt="units"
              width={16}
              height={16}
            />
            <span className="text-sm">Units</span>
            <Image
              src="/images/icon-dropdown.svg"
              alt="dropdown"
              width={15}
              height={20}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-55 rounded-xl  border border-[var(--muted)]/15 backdrop-blur-md shadow-[0_8px_30px_hsl(240,6%,70%/0.3)]  space-y-1 bg-[var(--background-card)]"
        >
          {/* Toggle Button - prevent auto close */}
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              toggleSystem();
            }}
            className="cursor-pointer font-lg focus:outline-none focus:ring-1 focus:ring-offset-1 border-px-3 py-2 hover:bg-muted/40 rounded-lg"
          >
            {unit === "metric" ? "Switch to Imperial" : "Switch to Metric"}
          </DropdownMenuItem>

          {/* Temperature */}
          <DropdownMenuLabel className="text-xs text-muted border-0 shadow-xl">
            Temperature
          </DropdownMenuLabel>
          {renderItem("Celsius (°C)", unit === "metric")}
          {renderItem("Fahrenheit (°F)", unit === "imperial")}
          <DropdownMenuSeparator className="h-[1px] bg-muted mx-1" />

          {/* Wind Speed */}
          <DropdownMenuLabel className="text-xs text-muted border-0 shadow-xl">
            Wind Speed
          </DropdownMenuLabel>
          {renderItem("km/h", unit === "metric")}
          {renderItem("mph", unit === "imperial")}
          <DropdownMenuSeparator className="h-[1px] bg-muted mx-1 my-2" />

          {/* Precipitation */}
          <DropdownMenuLabel className="text-xs text-muted border-0 shadow-xl">
            Precipitation
          </DropdownMenuLabel>
          {renderItem("Millimeters (mm)", unit === "metric")}
          {renderItem("Inches (in)", unit === "imperial")}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
