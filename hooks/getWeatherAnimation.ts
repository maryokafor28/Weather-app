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
  | "drizzle"
  | "overcast" {
  if (code === 0) return "sunny";

  if (code === 1 || code === 2) return "cloudy";

  if (code === 3) return "overcast";

  if (code === 45 || code === 48) return "fog";

  if (code >= 51 && code <= 57) return "drizzle";

  if (code >= 61 && code <= 67) return "rain";

  if (code >= 71 && code <= 77) return "snow";

  if (code >= 80 && code <= 82) return "rain";

  if (code >= 95 && code <= 99) return "storm";

  return "cloudy";
}
