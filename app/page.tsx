import Topbar from "@/components/common/Topbar";
import Search from "@/components/common/SearchInput";
import WeatherPage from "@/components/common/Weather";
import WeatherStats from "@/components/common/WeatherStat";
import ForecastPage from "@/components/common/Forecast";
import HourlyForecast from "@/components/common/HourlyForecast";

export default function Dashboard() {
  return (
    <div className="min-h-screen px-6 py-6">
      {/* Topbar */}
      <Topbar />

      {/* Search bar */}
      <Search />

      {/* Main content */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col lg:flex-row lg:space-x-4 lg:pl-12">
        {/* Left column */}
        <div className="flex-1 space-y-2 w-full lg:max-w-3xl">
          <WeatherPage />
          <WeatherStats />
          <ForecastPage />
        </div>

        {/* Right column */}
        <div>
          <HourlyForecast />
        </div>
      </div>
    </div>
  );
}
