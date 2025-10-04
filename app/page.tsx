import { Suspense } from "react";
import DashboardContent from "./dashboardcontent"; // import the real content

export default function Dashboard() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardContent />
    </Suspense>
  );
}
