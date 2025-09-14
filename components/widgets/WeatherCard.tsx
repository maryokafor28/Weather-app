"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroCardProps = {
  location: string;
  date: string;
  temperature: number;
  icon: React.ReactNode;
  backgroundImage: string;
  className?: string;
};

export default function WeatherCard({
  location,
  date,
  temperature,
  icon,
  //   backgroundImage, // Now using the prop instead of hardcoded path
  className,
}: HeroCardProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-2xl overflow-hidden shadow-lg min-h-[250px]", // Added min-height
        className
      )}
    >
      {/* Background image */}
      <Image
        // src={backgroundImage} // Using the prop now
        src="/images/bg-today-large.svg"
        alt="Weather background"
        fill
        priority
        className="object-cover object-center" // Added object-center for better positioning
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes for better performance
      />
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 z-[1]" /> */}

      {/* Content */}
      <div className="relative z-10 flex justify-between items-center p-6 h-full min-h-[200px]">
        {/* Location + Date */}
        <div className="flex-shrink-0">
          <h2 className="text-xl font-semibold drop-shadow-sm">{location}</h2>
          <p className="text-sm text-gray-200 drop-shadow-sm">{date}</p>
        </div>

        {/* Temperature + Icon */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="h-16 w-16 flex-shrink-0">{icon}</div>
          <p className="text-6xl font-bold drop-shadow-sm whitespace-nowrap">
            {temperature}°
          </p>
        </div>
      </div>
    </div>
  );
}
