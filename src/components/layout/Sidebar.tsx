
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  ChartBar, 
  Clock, 
  Eye, 
  Heatmap, 
  Layers, 
  MapPin, 
  Octagon, 
  Queue, 
  Search, 
  Users 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Menu items with their icons and URLs
const items = [
  { title: "Dashboard", url: "/", icon: Eye },
  { title: "Bookings", url: "/bookings", icon: Calendar },
  { title: "Heatmaps", url: "/heatmaps", icon: Heatmap },
  { title: "Analytics", url: "/analytics", icon: ChartBar },
  { title: "Queue Management", url: "/queue", icon: Queue },
  { title: "Peak Hours", url: "/peak-hours", icon: Clock },
  { title: "Venue Map", url: "/venue-map", icon: MapPin },
  { title: "Space Planning", url: "/space-planning", icon: Layers },
  { title: "Crowd Management", url: "/crowd", icon: Users },
  { title: "Emergency Controls", url: "/emergency", icon: Octagon },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <div className="flex items-center justify-center">
          <h1 className="text-lg font-bold text-white">VenueSense</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.url)}
                    className={location.pathname === item.url ? "bg-sidebar-accent text-white" : ""}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-xs text-gray-400 p-4 text-center">
          <p>VenueSense Optimize v1.0</p>
          <p>© 2025 All Rights Reserved</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function Calendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
