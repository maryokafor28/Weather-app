"use client";

import { StatCard } from "../widgets/WeatherstatCard";
import { Card, CardContent } from "@/components/ui/card";
import { useUnit } from "@/context/UnitContext";

type WeatherData = {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
  weathercode: number;
  time: string;
};

type WeatherStatsProps = {
  weather?: WeatherData;
  loading?: boolean;
};

export default function WeatherStats({ weather, loading }: WeatherStatsProps) {
  const { unit } = useUnit();

  if (loading) {
    // Skeleton layout with actual labels and dash values
    const skeletonData = [
      { label: "Feels Like", unit: unit === "metric" ? "°C" : "°F" },
      { label: "Humidity", unit: "%" },
      { label: "Wind", unit: unit === "metric" ? "km/h" : "mph" },
      { label: "Precipitation", unit: unit === "metric" ? "mm" : "in" },
    ];

    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mx-auto mt-6">
        {skeletonData.map((item, i) => (
          <Card
            key={`skeleton-${i}`}
            className="bg-[var(--background-card)] rounded-xl w-full h-28 sm:h-32 border border-[var(--muted)]/15 backdrop-blur-md shadow-[0_8px_30px_hsl(240,6%,70%/0.3)]"
          >
            <CardContent className="p-3 flex flex-col items-start justify-center space-y-2 h-full">
              {/* Actual label */}
              <p className="text-sm text-muted leading-relaxed">{item.label}</p>

              {/* Dash value with unit */}
              <p className="text-3xl font-semibold text-muted leading-relaxed">
                —
                <span className="text-base font-normal ml-1 leading-none">
                  {item.unit}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!weather) return null;

  // Temperature
  const feelsLike =
    unit === "metric"
      ? Math.round(weather.apparent_temperature)
      : Math.round((weather.apparent_temperature * 9) / 5 + 32);

  // Wind Speed
  const windSpeed =
    unit === "metric"
      ? Math.round(weather.wind_speed_10m)
      : Math.round(weather.wind_speed_10m / 1.609); // km/h → mph

  // Precipitation
  const precipitation =
    unit === "metric"
      ? Math.round(weather.precipitation)
      : Math.round((weather.precipitation / 25.4) * 100) / 100; // mm → in

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mx-auto mt-6">
      <StatCard
        label="Feels Like"
        value={feelsLike}
        unit={unit === "metric" ? "°C" : "°F"}
      />
      <StatCard
        label="Humidity"
        value={weather.relative_humidity_2m}
        unit="%"
      />
      <StatCard
        label="Wind"
        value={windSpeed}
        unit={unit === "metric" ? "km/h" : "mph"}
      />
      <StatCard
        label="Precipitation"
        value={precipitation}
        unit={unit === "metric" ? "mm" : "in"}
      />
    </div>
  );
}
