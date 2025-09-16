"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroCardProps = {
  location: string;
  date: string;
  temperature: number;
  icon: React.ReactNode;
  backgroundImage?: string;
  className?: string;
};

export default function WeatherCard({
  location,
  date,
  temperature,
  icon,
  className,
}: HeroCardProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-xl overflow-hidden min-h-[350px] sm:min-h-[250px]",
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Mobile image */}
        <Image
          src="/images/bg-today-small.svg"
          alt="Weather background small"
          fill
          priority
          className="object-contain sm:hidden" // no cropping on mobile
          sizes="100vw"
        />

        {/* Desktop image */}
        <Image
          src="/images/bg-today-large.svg"
          alt="Weather background large"
          fill
          priority
          className="object-cover object-center hidden sm:block"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 h-full p-6 min-h-[200px]",
          // mobile = column + centered
          "flex flex-col items-center justify-center text-center space-y-4",
          // desktop = row with space between
          "sm:flex-row sm:justify-between sm:items-center sm:text-left sm:space-y-0"
        )}
      >
        {/* Location + Date */}
        <div className="mb-15 sm:mb-0">
          <h2 className="text-2xl font-semibold drop-shadow-sm">{location}</h2>
          <p className="text-sm drop-shadow-sm">{date}</p>
        </div>

        {/* Temperature + Icon */}
        <div className="flex flex-row items-center gap-10 sm:flex-row sm:items-center">
          <div className="h-16 w-16">{icon}</div>
          <p className="text-7xl font-bold drop-shadow-sm">{temperature}°</p>
        </div>
      </div>
    </div>
  );
}
