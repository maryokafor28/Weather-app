"use client";
import { Suspense, useState } from "react";
import Topbar from "@/components/common/Topbar";
import Search from "@/components/common/SearchInput";
import WeatherPage from "@/components/common/Weather";
import HourlyForecast from "@/components/common/HourlyForecast";
import ErrorState from "@/components/common/ErrorState"; // ✅ your error page component

import { type ForecastDayRaw, type HourlyForecastItem } from "@/lib/services";

export default function Dashboard() {
  const [hourlyData, setHourlyData] = useState<{
    hourlyByDay: Record<string, HourlyForecastItem[]> | null;
    forecast: ForecastDayRaw[] | null;
  }>({ hourlyByDay: null, forecast: null });

  const [hasError, setHasError] = useState(false);

  // ✅ Determine if data is still loading
  const isLoading = !hourlyData.hourlyByDay || !hourlyData.forecast;

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

          {/* Main layout */}
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
        </>
      )}
    </div>
  );
}
