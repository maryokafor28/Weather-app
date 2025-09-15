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
import Image from "next/image";
// mock data for now (replace with API later)
const hourlyData = [
  { time: "3 PM", temperature: 18, icon: "/images/icon-overcast.webp" },
  { time: "4 PM", temperature: 20, icon: "/images/icon-partly-cloudy.webp" },
  { time: "5 PM", temperature: 22, icon: "/images/icon-sunny.webp" },
  { time: "6 PM", temperature: 23, icon: "/images/icon-partly-cloudy.webp" },
  { time: "7 PM", temperature: 24, icon: "/images/icon-snow.webp" },
  { time: "8 PM", temperature: 24, icon: "/images/icon-fog.webp" },
  { time: "9 PM", temperature: 24, icon: "/images/icon-partly-cloudy.webp" },
];

// days of the week
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function HourlyForecast() {
  const [selectedDay, setSelectedDay] = useState<string>("Tuesday");

  // helper for consistent styling
  const renderItem = (label: string, active: boolean) => (
    <SelectItem
      key={label}
      value={label}
      className={`flex items-center justify-between cursor-default rounded-md px-3 py-2 transition
        ${
          active
            ? "bg-white/10 shadow-xl"
            : "bg-[var(--background-card)] shadow-xl"
        }`}
    >
      <span className="text-md font-medium">{label}</span>
    </SelectItem>
  );

  return (
    <Card className="w-[360px] h-full flex flex-col bg-[var(--background-card)]">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold whitespace-nowrap">
          Hourly Forecast
        </CardTitle>

        {/* Day selector */}
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-[140px] bg-[#3c3a5e] text-white rounded-md px-4 py-2 shadow-md cursor-pointer hover:opacity-90">
            <SelectValue placeholder="Select Day" />
          </SelectTrigger>
          <SelectContent
            align="end"
            sideOffset={8}
            className="w-55 bg-[var(--background-card)] border border-[var(--muted)]/15 backdrop-blur-md shadow-[0_8px_30px_hsl(240,6%,70%/0.3)] space-y-1"
          >
            {days.map((day) => renderItem(day, selectedDay === day))}
          </SelectContent>
        </Select>
      </CardHeader>

      {/* Scrollable content */}
      <CardContent className="overflow-y-auto">
        {hourlyData.map((item, i) => (
          <HourlyRow
            key={i}
            icon={
              <Image
                src={item.icon}
                alt={`${item.time} icon`}
                width={24}
                height={24}
              />
            }
            time={item.time}
            temperature={item.temperature}
          />
        ))}
      </CardContent>
    </Card>
  );
}
