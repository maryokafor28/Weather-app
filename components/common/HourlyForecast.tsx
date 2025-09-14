"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import HourlyRow from "@/components/widgets/HourlyRow";

// mock data for now (replace with API later)
const hourlyData = [
  { time: "3 PM", temperature: 18 },
  { time: "4 PM", temperature: 20 },
  { time: "5 PM", temperature: 22 },
  { time: "6 PM", temperature: 23 },
  { time: "7 PM", temperature: 24 },
  { time: "8 PM", temperature: 24 },
  { time: "9 PM", temperature: 24 },
  { time: "10 PM", temperature: 24 },
];

export default function HourlyForecast() {
  return (
    <Card className="w-[280px] h-full flex flex-col bg-[var(--background-card)]">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">
          Hourly Forecast
        </CardTitle>

        {/* Day selector */}
        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Tuesday" className=" bg-[#2f2f49] " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="tomorrow">Tomorrow</SelectItem>
            <SelectItem value="next">Next Day</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      {/* Scrollable content */}
      <CardContent className="overflow-y-auto">
        {hourlyData.map((item, i) => (
          <HourlyRow
            key={i}
            icon={<span>☀️</span>} // replace with your Next Image or SVG icon
            time={item.time}
            temperature={item.temperature}
          />
        ))}

        {/* TODO: replace hourlyData with API response */}
      </CardContent>
    </Card>
  );
}
