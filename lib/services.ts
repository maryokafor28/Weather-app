export type WeatherData = {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
  weathercode: number;
  time: string;
};

export type ForecastDayRaw = {
  day: string;
  weathercode: number;
  minTemp: number;
  maxTemp: number;
};

export type HourlyForecastItem = {
  time: string;
  temperature: number;
  weathercode: number;
};

export type WeatherFull = {
  current: WeatherData;
  forecast: ForecastDayRaw[];
  hourly: { time: string; temperature: number; weathercode: number }[]; // ✅ added

  hourlyByDay: Record<string, HourlyForecastItem[]>; // e.g. { "Monday": [...], "Tuesday": [...] }
};

export async function getWeather(
  lat: string,
  lon: string,
  timezone = "auto",
  forecastDays = 7
): Promise<WeatherFull> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
    lat
  )}&longitude=${encodeURIComponent(
    lon
  )}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&forecast_days=${forecastDays}&timezone=${encodeURIComponent(
    timezone
  )}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  const data = await res.json();

  // --- current ---
  const current = data.current as WeatherData;

  // --- daily forecast ---
  const daily = data.daily ?? {};
  const times: string[] = daily.time ?? [];
  const forecast: ForecastDayRaw[] = times.map((date, i) => ({
    day: new Date(date).toLocaleDateString("en-US", { weekday: "long" }), // e.g. "Monday"
    weathercode: daily.weathercode?.[i] ?? 0,
    minTemp: Math.round(daily.temperature_2m_min?.[i] ?? 0),
    maxTemp: Math.round(daily.temperature_2m_max?.[i] ?? 0),
  }));

  // --- hourly forecast grouped by day ---
  const hourly = data.hourly ?? {};
  const hourlyTimes: string[] = hourly.time ?? [];
  const hourlyItems: HourlyForecastItem[] = hourlyTimes.map(
    (iso: string, i: number) => ({
      time: iso,
      temperature: Math.round(hourly.temperature_2m?.[i] ?? 0),
      weathercode: hourly.weathercode?.[i] ?? 0,
    })
  );

  // group into days
  const hourlyByDay: Record<string, HourlyForecastItem[]> = {};
  hourlyItems.forEach((it) => {
    const dayKey = new Date(it.time).toLocaleDateString("en-US", {
      weekday: "long",
    });
    if (!hourlyByDay[dayKey]) hourlyByDay[dayKey] = [];
    hourlyByDay[dayKey].push(it);
  });

  return { current, forecast, hourlyByDay, hourly };
}
