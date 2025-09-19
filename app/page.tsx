"use client";
import { Suspense, useState } from "react";
import Topbar from "@/components/common/Topbar";
import Search from "@/components/common/SearchInput";
import WeatherPage from "@/components/common/Weather";
import HourlyForecast from "@/components/common/HourlyForecast";

import { type ForecastDayRaw, type HourlyForecastItem } from "@/lib/services";

export default function Dashboard() {
  const [hourlyData, setHourlyData] = useState<{
    hourlyByDay: Record<string, HourlyForecastItem[]> | null;
    forecast: ForecastDayRaw[] | null;
  }>({ hourlyByDay: null, forecast: null });

  return (
    <div className="min-h-screen px-6 py-6">
      {/* Topbar */}
      <Topbar />

      {/* Search bar */}
      <Search />

      {/* Main layout */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col lg:flex-row lg:space-x-4 lg:pl-12">
        {/* Left column */}
        <div className="flex-1 space-y-2 w-full lg:max-w-3xl">
          <Suspense fallback={<p className="text-white">Loading weather...</p>}>
            <WeatherPage onData={setHourlyData} />
          </Suspense>
        </div>

        {/* Right column */}
        <div className="w-full lg:max-w-sm">
          {hourlyData.hourlyByDay && hourlyData.forecast && (
            <HourlyForecast
              hourlyByDay={hourlyData.hourlyByDay}
              forecastDays={hourlyData.forecast.map((f) => f.day)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
