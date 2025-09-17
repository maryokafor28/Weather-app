"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeroCard from "@/components/widgets/WeatherCard";
import Image from "next/image";

type WeatherData = {
  temperature: number;
  weathercode: number;
  time: string;
};

export default function WeatherPage() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const name = searchParams.get("name");
  const country = searchParams.get("country");

  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  // helper: map weathercode to icon
  const getWeatherIcon = (code: number) => {
    if (code === 0) return "/images/icon-sunny.webp";
    if (code >= 1 && code <= 3) return "/images/icon-partly-cloudy.webp";
    if (code === 45 || code === 48) return "/images/icon-fog.webp";
    if (code >= 51 && code <= 57) return "/images/icon-drizzle.webp";
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
      return "/images/icon-rain.webp";
    if ((code >= 71 && code <= 77) || code === 85 || code === 86)
      return "/images/icon-snow.webp";
    if (code >= 95) return "/images/icon-storm.webp";
    return "/images/icon-cloudy.webp"; // fallback
  };

  return (
    <main className="flex justify-center w-full">
      {weather ? (
        <HeroCard
          location={`${name}, ${country}`}
          date={new Date(weather.time).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          temperature={Math.round(weather.temperature)}
          icon={
            <Image
              src={getWeatherIcon(weather.weathercode)}
              alt="Weather Icon"
              width={64}
              height={64}
              className="h-16 w-16"
            />
          }
        />
      ) : (
        <p className="text-white">Loading weather...</p>
      )}
    </main>
  );
}
