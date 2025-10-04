"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Topbar from "@/components/common/Topbar";
import Search from "@/components/common/SearchInput";
import WeatherPage from "@/components/common/Weather";
import HourlyForecast from "@/components/common/HourlyForecast";
import ErrorState from "@/components/common/ErrorState";

import { type ForecastDayRaw, type HourlyForecastItem } from "@/lib/services";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const [hourlyData, setHourlyData] = useState<{
    hourlyByDay: Record<string, HourlyForecastItem[]> | null;
    forecast: ForecastDayRaw[] | null;
  }>({ hourlyByDay: null, forecast: null });

  const [hasError, setHasError] = useState(false);

  // ✅ Check if user has searched (has lat/lon params)
  const hasSearched = !!(lat && lon);

  // ✅ Determine if data is still loading (only when user has searched)
  const isLoading =
    hasSearched && (!hourlyData.hourlyByDay || !hourlyData.forecast);

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Topbar always visible */}
      <Topbar />

      {hasError ? (
        // ✅ Only show error page (with Topbar already above)
        <ErrorState onRetry={() => setHasError(false)} />
      ) : (
        <>
          {/* Search bar */}
          <Search />

          {/* Only show weather content if user has searched */}
          {hasSearched && (
            <div className="max-w-7xl mx-auto mt-8 flex flex-col lg:flex-row lg:space-x-4 lg:pl-12">
              {/* Left column */}
              <div className="flex-1 space-y-2 w-full lg:max-w-3xl">
                <Suspense fallback={<p>Loading weather...</p>}>
                  <WeatherPage
                    onData={setHourlyData}
                    onError={() => setHasError(true)}
                  />
                </Suspense>
              </div>

              {/* Right column */}
              <div className="w-full lg:max-w-sm">
                <HourlyForecast
                  hourlyByDay={hourlyData.hourlyByDay ?? {}}
                  forecastDays={hourlyData.forecast?.map((f) => f.day) ?? []}
                  loading={isLoading}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
