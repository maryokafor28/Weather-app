"use client";

import { useEffect, useState } from "react";
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
import { getWeather, HourlyForecastItem, ForecastDayRaw } from "@/lib/services";

export default function HourlyForecast() {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [days, setDays] = useState<ForecastDayRaw[]>([]);
  const [hourly, setHourly] = useState<HourlyForecastItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { forecast, hourly } = await getWeather("52.52", "13.41"); // Berlin
        setDays(forecast);
        setHourly(hourly);

        // default: today
        if (forecast.length > 0) setSelectedDay(forecast[0].day);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    })();
  }, []);

  // Filter hourly by selected day
  const filteredHourly = hourly.filter((h) => {
    if (!selectedDay) return false;
    const day = new Date(h.time).toLocaleDateString("en-US", {
      weekday: "short",
    });
    return day === selectedDay;
  });

  return (
    <Card className="w-full md:w-[340px] h-full flex flex-col bg-[var(--background-card)] mt-8 md:mt-0">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold whitespace-nowrap">
          Hourly Forecast
        </CardTitle>

        {/* Day selector */}
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-[140px] bg-[#3c3a5e] rounded-md px-4 py-2 shadow-md cursor-pointer hover:opacity-90">
            <SelectValue placeholder="Select Day" />
          </SelectTrigger>
          <SelectContent
            align="end"
            sideOffset={8}
            className="w-55 bg-[var(--background-card)] border border-[var(--muted)]/15 backdrop-blur-md shadow-[0_8px_30px_hsl(240,6%,70%/0.3)] space-y-1"
          >
            {days.map((d) => (
              <SelectItem key={d.day} value={d.day}>
                {d.day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      {/* Scrollable content */}
      <CardContent className="relative max-h-[400px] overflow-y-auto no-scrollbar">
        {filteredHourly.map((item, i) => (
          <HourlyRow
            key={i}
            icon={<WeatherIcon code={item.weathercode} size={24} />}
            time={new Date(item.time).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            })}
            temperature={item.temperature}
          />
        ))}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--background-card)] to-transparent" />
      </CardContent>
    </Card>
  );
}
