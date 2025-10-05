// src/lib/getWeatherAnimation.ts

export function getWeatherAnimation(
  code: number
):
  | "sunny"
  | "rain"
  | "snow"
  | "storm"
  | "fog"
  | "cloudy"
  | "overcast"
  | "drizzle" {
  if (code === 0) return "sunny";
  if (code >= 1 && code <= 3) return "cloudy";
  if (code === 2 || code === 3) return "overcast";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 95) return "storm";
  return "cloudy";
}
