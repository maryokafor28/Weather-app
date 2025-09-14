import DailyForecast from "@/components/widgets/ForecastCard";

const sampleForecast = [
  { day: "Tue", icon: "/images/icon-rain.webp", minTemp: 16, maxTemp: 22 },
  { day: "Wed", icon: "/images/icon-drizzle.webp", minTemp: 15, maxTemp: 20 },
  { day: "Thu", icon: "/images/icon-sunny.webp", minTemp: 19, maxTemp: 26 },
  {
    day: "Fri",
    icon: "/images/icon-partly-cloudy.webp",
    minTemp: 14,
    maxTemp: 21,
  },
  { day: "Sat", icon: "/images/icon-storm.webp", minTemp: 17, maxTemp: 23 },
  { day: "Sun", icon: "/images/icon-snow.webp", minTemp: 20, maxTemp: 28 },
  { day: "Mon", icon: "/images/icon-fog.webp", minTemp: 18, maxTemp: 25 },
];

export default function ForecastPage() {
  return <DailyForecast forecast={sampleForecast} />;
}
