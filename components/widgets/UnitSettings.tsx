"use client";

import React, { useState } from "react";
import Logo from "@/components/widgets/logo";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Unit = "imperial" | "metric";

export default function UnitSettings({
  selected = "imperial",
  onUnitChange,
}: {
  selected?: Unit;
  onUnitChange?: (u: Unit) => void;
}) {
  const [Unit, setUnit] = useState<Unit>(selected);

  return (
    <div className="flex items-center justify-between w-full  ">
      <Logo />

      <div className="flex items-center cursor-pointer rounded-md bg-[var(--background-card)] px-2 ">
        <button aria-label="Settings">
          <Image
            src="/images/icon-units.svg"
            alt="settings"
            width={15}
            height={15}
          />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-1.5 px-2  py-2  shadow-sm bg-card-bg">
              <span className="text-sm">Units</span>
              <Image
                className="cursor-pointer"
                src="/images/icon-dropdown.svg"
                alt="dropdown"
                width={15}
                height={20}
              />
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
