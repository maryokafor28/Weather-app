"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type WeatherData = {
  location: string;
  temp: number;
  wind: number;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found!");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        location: `${name}, ${country}`,
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <section className="flex flex-col items-center text-center space-y-6 py-6">
      {/* Search bar */}
      <div className="flex flex-col w-full max-w-xl space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-2">
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

      {/* Weather result */}
      {weather && (
        <div className="mt-6 p-4 rounded-lg bg-[var(--background-card)] shadow">
          <h2 className="font-semibold">{weather.location}</h2>
          <p>🌡️ Temperature: {weather.temp} °C</p>
          <p>💨 Wind: {weather.wind} km/h</p>
        </div>
      )}
    </section>
  );
}
