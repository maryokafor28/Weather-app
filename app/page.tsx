import Topbar from "@/components/common/Topbar";
export default function Home() {
  return (
    <div className="min-h-screen px-6 py-6">
      {/* Topbar */}
      <Topbar />

      {/* Search bar */}
      <Search />

      {/* Main content */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col lg:flex-row lg:space-x-4 pl-12">
        {/* Left column */}
        <div className="flex-1 space-y-2 max-w-3xl">
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
