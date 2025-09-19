"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UnitSystem = "metric" | "imperial";

type UnitContextType = {
  unit: UnitSystem;
  setUnit: (u: UnitSystem) => void;
};

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<UnitSystem>("metric");

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error("useUnit must be used inside UnitProvider");
  return ctx;
}
