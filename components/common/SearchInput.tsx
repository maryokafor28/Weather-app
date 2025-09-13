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
    <section className="flex flex-col items-center text-center space-y-6 py-12">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold">
        How’s the sky looking today?
      </h1>

      {/* Search bar */}
      <div className="flex w-full max-w-md items-center space-x-2">
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
            className="pl-10 bg-[var(--background-card)] focus:ring-1"
          />
        </div>
        <Button
          onClick={handleSearch}
          variant={"default"}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </Button>
      </div>
    </section>
  );
}
