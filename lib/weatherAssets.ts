// // lib/weatherAssets.ts
// import { Sun, CloudRain, Cloud, Snowflake, CloudLightning } from "lucide-react";

// export type WeatherCondition = "sunny" | "rainy" | "cloudy" | "snowy" | "storm";

// export function getWeatherAssets(condition: WeatherCondition) {
//   switch (condition) {
//     case "sunny":
//       return {
//         icon: <Sun className="h-16 w-16 text-yellow-400" />,
//         background: "/images/bg-sunny.png",
//       };
//     case "rainy":
//       return {
//         icon: <CloudRain className="h-16 w-16 text-blue-400" />,
//         background: "/images/bg-rainy.png",
//       };
//     case "snowy":
//       return {
//         icon: <Snowflake className="h-16 w-16 text-blue-200" />,
//         background: "/images/bg-snowy.png",
//       };
//     case "storm":
//       return {
//         icon: <CloudLightning className="h-16 w-16 text-yellow-500" />,
//         background: "/images/bg-storm.png",
//       };
//     default: // cloudy fallback
//       return {
//         icon: <Cloud className="h-16 w-16 text-gray-300" />,
//         background: "/images/bg-cloudy.png",
//       };
//   }
// }
