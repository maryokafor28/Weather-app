import { StatCard } from "../widgets/WeatherstatCard";

export default function WeatherStats() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mx-auto mt-6">
      <StatCard label="Feels Like" value={21} unit="°C" />
      <StatCard label="Humidity" value={65} unit="%" />
      <StatCard label="Wind" value={12} unit="km/h" />
      <StatCard label="Precipitation" value={0.8} unit="mm" />
    </div>
  );
}
