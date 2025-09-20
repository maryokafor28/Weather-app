"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import HourlyRow from "@/components/widgets/HourlyRow";
import WeatherIcon from "@/components/widgets/WeatherIcon";
import { useUnit } from "@/context/UnitContext";

type HourlyForecastProps = {
  hourlyByDay?: Record<
    string,
    { time: string; temperature: number; weathercode: number }[]
  >;
  forecastDays?: string[];
  loading?: boolean;
};

export default function HourlyForecast({
  hourlyByDay = {},
  forecastDays = [],
  loading,
}: HourlyForecastProps) {
  const [selectedDay, setSelectedDay] = useState<string>(forecastDays[0] ?? "");
  const { unit } = useUnit();

  const convertTemp = (tempC: number) =>
    unit === "metric" ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);

  const hourlyData =
    !loading && selectedDay ? hourlyByDay[selectedDay] ?? [] : [];

  return (
    <Card className="w-full md:w-[340px] h-full flex flex-col bg-[var(--background-card)] mt-8 md:mt-0">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold whitespace-nowrap">
          Hourly Forecast
        </CardTitle>

        <Select
          value={loading ? "-" : selectedDay}
          onValueChange={setSelectedDay}
          disabled={loading}
        >
          <SelectTrigger className="w-[140px] bg-[#3c3a5e] rounded-md px-4 py-2 shadow-md cursor-pointer hover:opacity-90">
            <SelectValue placeholder="-" />
          </SelectTrigger>
          {!loading && (
            <SelectContent
              align="end"
              sideOffset={8}
              className="w-55 bg-[var(--background-card)] border border-[var(--muted)]/15 backdrop-blur-md shadow-[0_8px_30px_hsl(240,6%,70%/0.3)] space-y-1"
            >
              {forecastDays.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      </CardHeader>

      {/* Content */}
      <CardContent className="relative max-h-[400px] overflow-y-auto no-scrollbar">
        {loading ? (
          // Skeletons for rows
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between animate-pulse"
              >
                {/* Time placeholder */}
                <div className="w-10 h-3 bg-[var(--muted)]/20 rounded" />
                {/* Icon placeholder */}
                <div className="w-6 h-6 bg-[var(--muted)]/20 rounded-full" />
                {/* Temp placeholder */}
                <div className="w-12 h-3 bg-[var(--muted)]/20 rounded" />
              </div>
            ))}
          </div>
        ) : hourlyData.length === 0 ? (
          <p className="text-center text-muted-foreground">No data available</p>
        ) : (
          hourlyData.map((item, i) => {
            const time = new Date(item.time).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            });

            return (
              <HourlyRow
                key={i}
                icon={<WeatherIcon code={item.weathercode} size={24} />}
                time={time}
                temperature={convertTemp(item.temperature)}
              />
            );
          })
        )}

        {/* Bottom gradient fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--background-card)] to-transparent" />
      </CardContent>
    </Card>
  );
}
