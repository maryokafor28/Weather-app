"use client";

import { CardContent } from "@/components/ui/card";
import WeatherIcon from "@/components/widgets/WeatherIcon"; // reuse the icon mapping
import { useUnit } from "@/context/UnitContext"; // ✅ import unit context

type ForecastDay = {
  day: string;
  weathercode: number; // use weathercode, not "icon"
  minTemp: number;
  maxTemp: number;
};

type DailyForecastProps = {
  forecast: ForecastDay[];
};

export default function DailyForecast({ forecast }: DailyForecastProps) {
  const { unit } = useUnit();
  const convertTemp = (tempC: number) =>
    unit === "metric" ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);

  return (
    <section className="w-full mx-auto">
      <div className="text-muted-foreground text-sm py-2">Daily forecast</div>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-4 sm:gap-2">
        {forecast.map((item, i) => (
          <CardContent
            key={i}
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
