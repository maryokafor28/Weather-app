"use client";

import { CardContent } from "@/components/ui/card";
import WeatherIcon from "@/components/widgets/WeatherIcon";
import { useUnit } from "@/context/UnitContext";

type ForecastDay = {
  day: string;
  weathercode: number;
  minTemp: number;
  maxTemp: number;
};

type DailyForecastProps = {
  forecast?: ForecastDay[];
  loading?: boolean;
};

export default function DailyForecast({
  forecast = [],
  loading,
}: DailyForecastProps) {
  const { unit } = useUnit();
  const convertTemp = (tempC: number) =>
    unit === "metric" ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);

  return (
    <section className="w-full mx-auto">
      {/* Header stays visible */}
      <div className="text-muted-foreground text-sm py-2">Daily forecast</div>

      <div className="grid grid-cols-3 md:grid-cols-7 gap-4 sm:gap-2">
        {loading
          ? // Skeleton placeholders (7 cards)
            [...Array(7)].map((_, i) => (
              <CardContent
                key={`skeleton-${i}`}
                className="
                  bg-[var(--background-card)]
                  border border-[var(--muted)]/15
                  backdrop-blur-md
                  shadow-[0_8px_30px_hsl(240,6%,90%/0.3)]
                  rounded-xl
                  flex flex-col items-center justify-between
                  w-full h-[180px] md:h-[140px]
                  p-4
                "
              >
                {/* Day label placeholder */}
                <div className="w-12 h-3 bg-[var(--muted)]/20 rounded animate-pulse" />

                {/* Icon placeholder */}
                <div className="w-10 h-10 bg-[var(--muted)]/20 rounded-full animate-pulse" />

                {/* Temps placeholders */}
                <div className="flex justify-between gap-6 w-full mt-3">
                  <div className="w-8 h-3 bg-[var(--muted)]/20 rounded animate-pulse" />
                  <div className="w-8 h-3 bg-[var(--muted)]/20 rounded animate-pulse" />
                </div>
              </CardContent>
            ))
          : // Real data
            forecast.map((item, i) => (
              <CardContent
                key={`forecast-${i}`}
                className="
                  bg-[var(--background-card)]
                  border border-[var(--muted)]/15
                  backdrop-blur-md
                  shadow-[0_8px_30px_hsl(240,6%,90%/0.3)]
                  rounded-xl
                  flex flex-col items-center justify-between
                  w-full h-[180px] md:h-[140px]
                  p-4
                "
              >
                {/* Day */}
                <p className="text-sm font-medium">{item.day}</p>

                {/* Weather Icon */}
                <WeatherIcon
                  code={item.weathercode}
                  size={36}
                  alt={`${item.day} forecast`}
                />

                {/* Temps */}
                <div className="flex justify-between gap-8 text-xs">
                  <span>{convertTemp(item.minTemp)}°</span>
                  <span className="font-semibold">
                    {convertTemp(item.maxTemp)}°
                  </span>
                </div>
              </CardContent>
            ))}
      </div>
    </section>
  );
}
