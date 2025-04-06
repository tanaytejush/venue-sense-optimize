
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Eye, Users } from "lucide-react";

type CapacityLevel = "low" | "moderate" | "high" | "critical";

interface VenueCapacity {
  id: string;
  name: string;
  currentOccupancy: number;
  maxCapacity: number;
  level: CapacityLevel;
}

const getStatusColor = (level: CapacityLevel) => {
  switch (level) {
    case "low":
      return "bg-venue-success";
    case "moderate":
      return "bg-venue-primary";
    case "high":
      return "bg-venue-warning";
    case "critical":
      return "bg-venue-danger";
    default:
      return "bg-venue-success";
  }
};

const getStatusText = (level: CapacityLevel) => {
  switch (level) {
    case "low":
      return "Available";
    case "moderate":
      return "Filling Up";
    case "high":
      return "Near Capacity";
    case "critical":
      return "Full";
    default:
      return "Available";
  }
};

export function CapacityOverview() {
  // In a real application, this would fetch from an API
  const [venues, setVenues] = useState<VenueCapacity[]>([
    {
      id: "main-hall",
      name: "Main Hall",
      currentOccupancy: 420,
      maxCapacity: 600,
      level: "moderate"
    },
    {
      id: "conference-room",
      name: "Conference Room",
      currentOccupancy: 145,
      maxCapacity: 150,
      level: "critical"
    },
    {
      id: "outdoor-terrace",
      name: "Outdoor Terrace",
      currentOccupancy: 73,
      maxCapacity: 200,
      level: "low"
    },
    {
      id: "exhibition-area",
      name: "Exhibition Area",
      currentOccupancy: 380,
      maxCapacity: 450,
      level: "high"
    }
  ]);

  const [totalCapacity, setTotalCapacity] = useState({
    current: 0,
    max: 0,
    percentage: 0,
    level: "low" as CapacityLevel
  });

  useEffect(() => {
    // Calculate total capacity
    const current = venues.reduce((acc, venue) => acc + venue.currentOccupancy, 0);
    const max = venues.reduce((acc, venue) => acc + venue.maxCapacity, 0);
    const percentage = Math.round((current / max) * 100);
    
    let level: CapacityLevel = "low";
    if (percentage >= 90) level = "critical";
    else if (percentage >= 75) level = "high";
    else if (percentage >= 50) level = "moderate";
    
    setTotalCapacity({ current, max, percentage, level });
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setVenues(prev => 
        prev.map(venue => {
          // Randomly adjust occupancy up or down
          const delta = Math.floor(Math.random() * 6) - 2; // -2 to +3
          let newOccupancy = venue.currentOccupancy + delta;
          
          // Ensure within bounds
          if (newOccupancy < 0) newOccupancy = 0;
          if (newOccupancy > venue.maxCapacity) newOccupancy = venue.maxCapacity;
          
          // Determine new level
          let level: CapacityLevel = "low";
          const percentage = (newOccupancy / venue.maxCapacity) * 100;
          
          if (percentage >= 90) level = "critical";
          else if (percentage >= 75) level = "high";
          else if (percentage >= 50) level = "moderate";
          
          return {
            ...venue,
            currentOccupancy: newOccupancy,
            level
          };
        })
      );
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [venues]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <Card className="venue-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl font-bold">
              Total Venue Capacity
            </CardTitle>
            <Eye className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-venue-primary" />
                  <span className="text-lg font-medium">
                    {totalCapacity.current} / {totalCapacity.max} people
                  </span>
                </div>
                <Badge 
                  className={`${getStatusColor(totalCapacity.level)} text-white`}
                >
                  {getStatusText(totalCapacity.level)}
                </Badge>
              </div>
              <Progress 
                value={totalCapacity.percentage} 
                className="h-3"
                indicatorClassName={getStatusColor(totalCapacity.level)}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Current occupancy is at {totalCapacity.percentage}% of maximum capacity
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {venues.map(venue => (
          <Card key={venue.id} className="venue-card">
            <CardHeader className="pb-2">
              <CardTitle>{venue.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {venue.currentOccupancy} / {venue.maxCapacity}
                  </span>
                  <Badge 
                    className={`${getStatusColor(venue.level)} text-white`}
                  >
                    {getStatusText(venue.level)}
                  </Badge>
                </div>
                <Progress 
                  value={(venue.currentOccupancy / venue.maxCapacity) * 100} 
                  className="h-2"
                  indicatorClassName={getStatusColor(venue.level)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
