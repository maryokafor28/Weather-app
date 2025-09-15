// components/HeroSection.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Search() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;

    // ✅ Later you’ll connect this to your weather API
    console.log("Searching weather for:", query);
  };

  return (
    <section className="flex flex-col  items-center text-center space-y-6 py-6">
      {/* Heading */}
      <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl">
        {/* Mobile (stacked) */}
        <h1 className="block sm:hidden text-7xl font-bold leading-tight max-w-2xl-auto">
          How’s the <br />
          sky looking <br />
          today?
        </h1>
        {/* Desktop */}
        <h1 className=" hidden sm:block text-3xl md:text-5xl font-bold leading-tight">
          How’s the sky looking today?
        </h1>
      </div>

      {/* Search bar */}
      <div className="flex flex-col w-full max-w-xl space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-2">
        <div className="relative flex-1">
          {/* Icon inside input */}
          <Image
            src="/images/icon-search.svg"
            alt="Search icon"
            width={16}
            height={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none"
          />
          <Input
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-[var(--background-card)] focus:ring-1 h-10"
          />
        </div>
        <Button
          onClick={handleSearch}
          variant={"default"}
          className="focus:outline-none focus:ring-2 focus:ring-blue-700 h-10"
        >
          Search
        </Button>
      </div>
    </section>
  );
}
