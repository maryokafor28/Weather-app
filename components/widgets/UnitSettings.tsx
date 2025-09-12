"use client";

import React, { useState } from "react";
import Logo from "@/components/common/logo";
import IconUnit from "@/assets/images/icon-units.svg?react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Unit = "imperial" | "metric";

export default function SettingsMenu({
  selected = "imperial",
  onUnitChange,
}: {
  selected?: Unit;
  onUnitChange?: (u: Unit) => void;
}) {
  const [unit, setUnit] = useState<Unit>(selected);

  return (
    <div className="flex items-center justify-between w-full">
      <Logo />

      <div className="flex items-center gap-3">
        <button
          aria-label="Settings"
          className="p-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <IconUnit className="h-6 w-6" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md shadow-sm bg-card-bg">
              <span className="text-sm">Units</span>
              <img src="/icon-dropdown.svg" alt="" className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8} className="w-40">
            <DropdownMenuItem
              onSelect={() => {
                setUnit("imperial");
                onUnitChange?.("imperial");
              }}
            >
              Imperial (°F)
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                setUnit("metric");
                onUnitChange?.("metric");
              }}
            >
              Metric (°C)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
