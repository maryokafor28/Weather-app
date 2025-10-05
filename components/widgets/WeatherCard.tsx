"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import AnimatedWeatherBackground from "@/components/widgets/AnimatedWeatherBg";

type HeroCardProps = {
  location: string;
  date: string;
  temperature: number;
  icon: React.ReactNode;
  weatherCode: number;
  backgroundImage?: string;
  className?: string;
  skeleton?: boolean;
};

export default function WeatherCard({
  location,
  date,
  temperature,
  icon,
  weatherCode,
  className,
  skeleton,
}: HeroCardProps) {
  return (
    <div
      className={cn(
        // taller height on mobile, shorter on sm+ screens
        "relative w-full rounded-2xl overflow-hidden shadow-lg min-h-[72vh] sm:min-h-[250px]",
        className
      )}
    >
      {/* Background - solid color for loading, image for loaded */}
      {skeleton ? (
        // Loading state: solid background color
        <div className="absolute inset-0 bg-[var(--background-card)]" />
      ) : (
        // Loaded state: background images
        // Loaded state: animated weather background
        <AnimatedWeatherBackground weatherCode={weatherCode} />
      )}

      {/* Content */}
      <div
        className={cn(
          "relative z-10 h-full p-6 min-h-[200px]",
          skeleton
            ? "flex flex-col items-center justify-center text-center"
            : "flex flex-col items-center justify-center text-center space-y-4 sm:flex-row sm:justify-between sm:items-center sm:text-left sm:space-y-0"
        )}
      >
        {skeleton ? (
          // Loading state - centered spinner and text
          <>
            <div className="flex flex-col items-center space-y-4">
              {/* Loading spinner */}
              <div className="w-[40px] h-[20px] overflow-hidden">
                <Image
                  src="/images/icon-loading.svg"
                  alt="Loading"
                  width={40}
                  height={40}
                  className="animate-spin"
                />
              </div>
              {/* Loading text */}
              <div className="text-foreground text-lg font-medium">
                Loading...
              </div>
            </div>
          </>
        ) : (
          // Full content state
          <>
            {/* Location + Date */}
            <div className="mb-20 sm:mb-0">
              <h2 className="text-4xl font-semibold drop-shadow-sm leading-loose text-white">
                {location}
              </h2>
              <p className="text-md drop-shadow-sm text-white">{date}</p>
            </div>

            {/* Temperature + Icon */}
            <div className="flex flex-row items-center gap-10 sm:flex-row sm:items-center">
              <div className="h-16 w-16">{icon}</div>
              <p className="text-7xl font-bold drop-shadow-sm text-white">
                {temperature}°
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
