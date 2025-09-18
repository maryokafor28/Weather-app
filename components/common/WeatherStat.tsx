import { StatCard } from "../widgets/WeatherstatCard";
type WeatherData = {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
  weathercode: number;
  time: string;
};

export default function WeatherStats({ weather }: { weather: WeatherData }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mx-auto mt-6">
      <StatCard
        label="Feels Like"
        value={Math.round(weather.apparent_temperature)}
        unit="°C"
      />
      <StatCard
        label="Humidity"
        value={weather.relative_humidity_2m}
        unit="%"
      />
      <StatCard label="Wind" value={weather.wind_speed_10m} unit="km/h" />
      <StatCard label="Precipitation" value={weather.precipitation} unit="mm" />
    </div>
  );
}
