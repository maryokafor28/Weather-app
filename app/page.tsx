"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Topbar from "@/components/common/Topbar";
import Search from "@/components/common/SearchInput";
import WeatherPage from "@/components/common/Weather";
import HourlyForecast from "@/components/common/HourlyForecast";
import ErrorState from "@/components/common/ErrorState";

import { type ForecastDayRaw, type HourlyForecastItem } from "@/lib/services";

function DashboardContent({
  setHourlyData,
  setHasError,
  hourlyData,
  hasError,
}: {
  setHourlyData: React.Dispatch<
    React.SetStateAction<{
      hourlyByDay: Record<string, HourlyForecastItem[]> | null;
      forecast: ForecastDayRaw[] | null;
    }>
  >;
  setHasError: (v: boolean) => void;
  hourlyData: {
    hourlyByDay: Record<string, HourlyForecastItem[]> | null;
    forecast: ForecastDayRaw[] | null;
  };
  hasError: boolean;
}) {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  // ✅ Check if user has searched
  const hasSearched = !!(lat && lon);

  // ✅ Determine if data is still loading
  const isLoading =
    hasSearched && (!hourlyData.hourlyByDay || !hourlyData.forecast);

  if (hasError) {
    return <ErrorState onRetry={() => setHasError(false)} />;
  }

  return (
    <>
      <Search />

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
  );
}

export default function Dashboard() {
  const [hourlyData, setHourlyData] = useState<{
    hourlyByDay: Record<string, HourlyForecastItem[]> | null;
    forecast: ForecastDayRaw[] | null;
  }>({ hourlyByDay: null, forecast: null });

  const [hasError, setHasError] = useState(false);

  return (
    <div className="min-h-screen px-6 py-6">
      <Topbar />

      {/* ✅ Wrap the component that uses useSearchParams */}
      <Suspense fallback={<p>Loading search...</p>}>
        <DashboardContent
          setHourlyData={setHourlyData}
          setHasError={setHasError}
          hourlyData={hourlyData}
          hasError={hasError}
        />
      </Suspense>
    </div>
  );
}
