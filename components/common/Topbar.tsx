"use client";

import UnitSettings from "../widgets/UnitSettings";
import ThemeToggle from "../theme/ThemeToggle";

export default function Topbar() {
  return (
    <header className="w-full py-1 sm:py-2 max-[640px]:-mt-2">
      <div className="max-w-8xl mx-auto px-0 sm:px-4 md:px-6 lg:px-12 xl:px-16 flex justify-between items-center">
        <UnitSettings />
        <ThemeToggle />
      </div>
    </header>
  );
}
