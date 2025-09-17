// components/HeroSection.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type CityResult = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null);

  const handleInput = async (value: string) => {
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          value
        )}&count=5&language=en&format=json`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  const handleSelect = (city: CityResult) => {
    setSelectedCity(city); // track selection

    setQuery(city.name); // 👈 only show city name in input
    setResults([]); // hide dropdown
    console.log("Selected city:", city);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("Searching weather for:", query);
  };

  return (
    <section className="flex flex-col items-center text-center space-y-6 py-6">
      {/* Heading */}
      <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl">
        <h1 className="block sm:hidden text-7xl font-bold leading-tight mx-auto max-[498px]:text-5xl">
          How’s the
          <br />
          sky looking <br />
          today?
        </h1>
        <h1 className="hidden sm:block text-3xl md:text-5xl font-bold leading-tight">
          How’s the sky looking today?
        </h1>
      </div>

      {/* Search bar */}
      <div className="flex flex-col w-full max-w-xl space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-2 relative">
        <div className="relative flex-1">
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
            onChange={(e) => handleInput(e.target.value)}
            className="pl-10 bg-[var(--background-card)] focus:ring-1 h-10"
          />

          {/* Dropdown results */}
          {results.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-[var(--background-card)] rounded-lg shadow-lg border border-[var(--muted)]/15 overflow-hidden max-h-60 overflow-y-auto px-2 py-2">
              {results.slice(0, 4).map((city) => (
                <li
                  key={city.id}
                  className={`px-2 py-2 text-left cursor-pointer  rounded-lg ${
                    selectedCity?.id === city.id
                      ? "bg-[#2f2f49] shadow-[0_8px_25px_hsl(240,6%,90%/0.6)] border border-[var(--muted)]/15 backdrop-blur-xl  "
                      : "bg-[var(--background-card)] shadow-xl"
                  }`}
                  onClick={() => handleSelect(city)}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
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
