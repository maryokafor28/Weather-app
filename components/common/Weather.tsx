"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeroCard from "@/components/widgets/WeatherCard";
import WeatherStats from "@/components/common/WeatherStat";
import DailyForecast from "@/components/widgets/DailyForecastCard";
import WeatherIcon from "@/components/widgets/WeatherIcon";
import { useUnit } from "@/context/UnitContext";
import ErrorState from "@/components/common/ErrorState";

import {
  getWeather,
  type WeatherData,
  type ForecastDayRaw,
  type HourlyForecastItem,
} from "@/lib/services";

type WeatherPageProps = {
  onData?: (data: {
    hourlyByDay: Record<string, HourlyForecastItem[]> | null;
    forecast: ForecastDayRaw[] | null;
  }) => void;
  onError?: () => void;
};

export default function WeatherPage({ onData, onError }: WeatherPageProps) {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const name = searchParams.get("name");
  const country = searchParams.get("country");

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDayRaw[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { unit } = useUnit();

  const convertTemp = (tempC: number) =>
    unit === "metric" ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);

  const fetchWeather = () => {
    if (!lat || !lon) return;

    let mounted = true;
    setLoading(true);
    setError(false);

    getWeather(lat, lon)
      .then(({ current, forecast, hourlyByDay }) => {
        if (!mounted) return;
        setWeather(current);
        setForecast(forecast);
        onData?.({ hourlyByDay, forecast });
      })
      .catch((err) => {
        console.error("getWeather error:", err);
        if (!mounted) return;
        setError(true); // show error screen
        onError?.(); // notify Dashboard
        setLoading(false); // 🔹 stop skeleton immediately
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  };

  useEffect(() => {
    // Only fetch if we have valid lat/lon
    if (lat && lon) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  // 🔹 If no search params and no auto-location feature, don't render anything
  // This allows for future auto-location detection while preventing empty renders from search
  const hasLocationData = lat && lon;

  if (!hasLocationData) {
    return null;
  }
  // 🔹 If error, show the error state instead of cards
  if (error) {
    return <ErrorState onRetry={fetchWeather} />;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <HeroCard
        skeleton={loading}
        location={loading ? "-" : `${name}, ${country}`}
        date={
          loading || !weather
            ? "-"
            : new Date(weather.time).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })
        }
        temperature={
          loading || !weather ? 0 : convertTemp(weather.temperature_2m)
        }
        icon={
          loading || !weather ? (
            <div className="w-16 h-16 rounded-full bg-[var(--muted)]/20 animate-pulse" />
          ) : (
            <WeatherIcon
              code={weather.weathercode}
              size={64}
              alt="Current weather"
            />
          )
        }
      />
      {/* weather stats */}
      <div className="flex-1 space-y-2 w-full lg:max-w-3xl">
        <WeatherStats weather={weather ?? undefined} loading={loading} />
      </div>
      {/* dailyforecast */}
      <div className="w-full lg:max-w-4xl mt-6">
        <DailyForecast forecast={forecast ?? []} loading={loading} />
      </div>
    </div>
  );
}
