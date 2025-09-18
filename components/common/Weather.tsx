"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeroCard from "@/components/widgets/WeatherCard";
import WeatherStats from "@/components/common/WeatherStat";
import DailyForecast from "@/components/widgets/DailyForecastCard"; // expects items with weathercode
import WeatherIcon from "@/components/widgets/WeatherIcon"; // optional
import {
  getWeather,
  type WeatherData,
  type ForecastDayRaw,
} from "@/lib/services";

export default function WeatherPage() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const name = searchParams.get("name");
  const country = searchParams.get("country");

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDayRaw[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lon) return;

    let mounted = true;
    setLoading(true);

    getWeather(lat, lon)
      .then(({ current, forecast }) => {
        if (!mounted) return;
        setWeather(current);
        setForecast(forecast);
      })
      .catch((err) => {
        console.error("getWeather error:", err);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [lat, lon]);

  return (
    <main className="flex flex-col items-center w-full">
      {loading && <p className="text-muted-foreground">Loading weather…</p>}

      {weather && (
        <>
          <HeroCard
            location={`${name}, ${country}`}
            date={new Date(weather.time).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            temperature={Math.round(weather.temperature_2m)}
            // pass WeatherIcon or a <Image /> — HeroCard already accepted a React node in your code
            icon={
              <WeatherIcon
                code={weather.weathercode}
                size={64}
                alt="Current weather"
              />
            }
          />

          <div className="flex-1 space-y-2 w-full lg:max-w-3xl">
            <WeatherStats weather={weather} />
          </div>
        </>
      )}

      {/* pass the transformed forecast array directly to your DailyForecast component */}
      {forecast && (
        <div className="w-full lg:max-w-4xl mt-6">
          <DailyForecast forecast={forecast} />
        </div>
      )}
    </main>
  );
}
