
import { CapacityOverview } from "@/components/dashboard/CapacityOverview";
import { BookingSystem } from "@/components/dashboard/BookingSystem";
import { VenueHeatmap } from "@/components/dashboard/VenueHeatmap";
import { CapacityControls } from "@/components/dashboard/CapacityControls";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      
      <main className="flex-1 p-6 space-y-8">
        <CapacityOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VenueHeatmap />
          <AnalyticsOverview />
        </div>
        
        <BookingSystem />
        
        <CapacityControls />
      </main>
    </div>
  );
}
