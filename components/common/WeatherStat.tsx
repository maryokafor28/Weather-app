"use client";

import { StatCard } from "../widgets/WeatherstatCard";
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

export default function WeatherStats({ weather }: { weather: WeatherData }) {
  const { unit } = useUnit();

  // 🔹 Temperature
  const feelsLike =
    unit === "metric"
      ? Math.round(weather.apparent_temperature)
      : Math.round((weather.apparent_temperature * 9) / 5 + 32);

  // 🔹 Wind Speed
  const windSpeed =
    unit === "metric"
      ? Math.round(weather.wind_speed_10m)
      : Math.round(weather.wind_speed_10m / 1.609); // km/h → mph

  // 🔹 Precipitation
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
