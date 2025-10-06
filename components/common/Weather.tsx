"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HeroCard from "@/components/widgets/WeatherCard";
import WeatherStats from "@/components/common/WeatherStat";
import DailyForecast from "@/components/widgets/DailyForecastCard";
import WeatherIcon from "@/components/widgets/WeatherIcon";
import { useUnit } from "@/context/UnitContext";
import ErrorState from "@/components/common/ErrorState";
import { useGeolocation } from "@/hooks/geoLocation";

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
  const router = useRouter();

  // Get geolocation data
  const geolocation = useGeolocation();

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
        setError(true);
        onError?.();
        setLoading(false);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  };

  // Auto-populate search params with geolocation if no params exist
  useEffect(() => {
    if (
      !lat &&
      !lon &&
      geolocation.lat &&
      geolocation.lon &&
      !geolocation.loading
    ) {
      const params = new URLSearchParams();
      params.set("lat", geolocation.lat);
      params.set("lon", geolocation.lon);
      if (geolocation.city) params.set("name", geolocation.city);
      if (geolocation.country) params.set("country", geolocation.country);

      router.replace(`?${params.toString()}`);
    }
  }, [lat, lon, geolocation, router]);

  useEffect(() => {
    if (lat && lon) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const hasLocationData = lat && lon;

  // Show loading state while geolocation is loading
  if (!hasLocationData && geolocation.loading) {
    return (
      <div className="flex flex-col items-center w-full">
        <HeroCard
          skeleton={true}
          location="-"
          date="-"
          temperature={0}
          icon={
            <div className="w-16 h-16 rounded-full bg-[var(--muted)]/20 animate-pulse" />
          }
          weatherCode={800}
        />
        <div className="flex-1 space-y-2 w-full lg:max-w-3xl">
          <WeatherStats loading={true} />
        </div>
      </div>
    );
  }

  // Show geolocation error if it failed
  if (!hasLocationData && geolocation.error) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  if (!hasLocationData) {
    return null;
  }

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
        weatherCode={loading || !weather ? 800 : weather.weathercode}
      />
      <div className="flex-1 space-y-2 w-full lg:max-w-3xl">
        <WeatherStats weather={weather ?? undefined} loading={loading} />
      </div>
      <div className="w-full lg:max-w-4xl mt-6">
        <DailyForecast forecast={forecast ?? []} loading={loading} />
      </div>
    </div>
  );
}
