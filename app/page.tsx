import Topbar from "@/components/common/Topbar";
import Search from "@/components/common/SearchInput";
import WeatherPage from "@/components/common/Weather";
export default function Dashboard() {
  return (
    <div>
      <Topbar />
      <Search />
      <WeatherPage />

      {/* rest of your page content */}
    </div>
  );
}
