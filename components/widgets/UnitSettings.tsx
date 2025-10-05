"use client";

import Logo from "@/components/widgets/logo";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useUnit } from "@/context/UnitContext";

export default function UnitSettings() {
  const { unit, setUnit } = useUnit();
  const { theme } = useTheme();

  const toggleSystem = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
  };

  // Icon filter for light theme
  const iconFilter =
    theme === "light" ? "brightness(0) saturate(100%)" : "none";

  const renderItem = (label: string, active: boolean) => (
    <DropdownMenuItem
      onSelect={(e) => e.preventDefault()}
      className={`flex items-center justify-between cursor-default rounded-md px-3 py-2 transition
        ${
          active
            ? "bg-white/10 shadow-xl"
            : "bg-[var(--background-card)] shadow-xl"
        }`}
    >
      <span className="text-sm sm:text-md font-medium">{label}</span>
      {active && (
        <Image
          src="/images/icon-checkmark.svg"
          alt="checked"
          width={16}
          height={16}
          style={{
            filter:
              theme === "light"
                ? "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(220deg) brightness(98%) contrast(92%)"
                : "none",
          }}
        />
      )}
    </DropdownMenuItem>
  );

  return (
    <div className="flex items-center justify-between w-full">
      <Logo />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1 sm:gap-1.5 rounded-md bg-[var(--background-card)] px-2 sm:px-3 py-2 shadow focus:outline-none focus:ring-1 focus:ring-offset-1">
            <Image
              src="/images/icon-units.svg"
              alt="units"
              width={16}
              height={16}
              style={{ filter: iconFilter }}
            />
            <span className="text-xs sm:text-sm">Units</span>
            <Image
              src="/images/icon-dropdown.svg"
              alt="dropdown"
              width={15}
              height={20}
              style={{ filter: iconFilter }}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-48 sm:w-55 rounded-xl border border-[var(--muted)]/15 backdrop-blur-md shadow-[0_8px_30px_hsl(240,6%,70%/0.3)] space-y-1 bg-[var(--background-card)]"
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              toggleSystem();
            }}
            className="cursor-pointer text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-offset-1 px-3 py-2 hover:bg-muted/40 rounded-lg"
          >
            <span className="hidden sm:inline">
              {unit === "metric" ? "Switch to Imperial" : "Switch to Metric"}
            </span>
            <span className="sm:hidden">
              {unit === "metric" ? "Switch to Imperial" : "Switch to Metric"}
            </span>
          </DropdownMenuItem>

          <DropdownMenuLabel className="text-xs text-muted border-0 shadow-xl">
            Temperature
          </DropdownMenuLabel>
          {renderItem("Celsius (°C)", unit === "metric")}
          {renderItem("Fahrenheit (°F)", unit === "imperial")}
          <DropdownMenuSeparator className="h-[1px] bg-muted/15 mx-1" />

          <DropdownMenuLabel className="text-xs text-muted border-0 shadow-xl">
            Wind Speed
          </DropdownMenuLabel>
          {renderItem("km/h", unit === "metric")}
          {renderItem("mph", unit === "imperial")}
          <DropdownMenuSeparator className="h-[1px] bg-muted/15 mx-1 my-2" />

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
