
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heatmap, Users, AArrowUp, AArrowDown } from "lucide-react";

// Define density levels
type DensityLevel = 0 | 1 | 2 | 3 | 4;

// Define our grid data structure
interface GridData {
  [key: string]: {
    gridData: DensityLevel[][];
    timestamp: string;
  };
}

// Helper function to get color based on density level
const getDensityColor = (level: DensityLevel): string => {
  switch (level) {
    case 0: return "bg-gray-100"; // Empty
    case 1: return "bg-green-200"; // Low
    case 2: return "bg-blue-200"; // Medium
    case 3: return "bg-amber-200"; // High
    case 4: return "bg-red-200"; // Very High
    default: return "bg-gray-100";
  }
};

// Helper function to get text based on density level
const getDensityText = (level: DensityLevel): string => {
  switch (level) {
    case 0: return "Empty";
    case 1: return "Low";
    case 2: return "Medium";
    case 3: return "High";
    case 4: return "Very High";
    default: return "Unknown";
  }
};

// Mock data for the heatmap - in a real app this would come from sensors
const mockHeatmapData: GridData = {
  "main-hall": {
    gridData: [
      [0, 1, 1, 2, 2, 3, 2, 1, 0, 0],
      [1, 2, 2, 3, 3, 3, 2, 2, 1, 0],
      [1, 2, 3, 4, 4, 3, 3, 2, 1, 0],
      [1, 2, 3, 4, 4, 4, 3, 2, 1, 0],
      [1, 2, 3, 3, 3, 3, 2, 1, 1, 0],
      [0, 1, 2, 2, 2, 2, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    timestamp: "10:30 AM"
  },
  "conference-room": {
    gridData: [
      [1, 2, 3, 3, 4, 3, 3, 2, 1, 0],
      [1, 2, 3, 4, 4, 4, 3, 2, 1, 0],
      [1, 2, 3, 4, 4, 4, 3, 2, 1, 0],
      [1, 2, 3, 4, 4, 4, 3, 2, 1, 0],
      [1, 2, 3, 3, 3, 3, 3, 2, 1, 0],
      [0, 1, 2, 2, 2, 2, 2, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    timestamp: "10:30 AM"
  },
  "outdoor-terrace": {
    gridData: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 2, 1, 1, 0, 0, 0],
      [0, 1, 1, 2, 2, 2, 1, 1, 0, 0],
      [0, 1, 2, 2, 2, 2, 2, 1, 0, 0],
      [0, 1, 1, 2, 2, 2, 1, 1, 0, 0],
      [0, 0, 1, 1, 2, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    timestamp: "10:30 AM"
  },
  "exhibition-area": {
    gridData: [
      [2, 2, 2, 3, 3, 3, 2, 2, 1, 1],
      [2, 3, 3, 4, 4, 3, 3, 2, 1, 1],
      [2, 3, 4, 4, 4, 4, 3, 2, 1, 1],
      [2, 3, 3, 4, 4, 3, 3, 2, 1, 1],
      [2, 2, 3, 3, 3, 3, 2, 2, 1, 0],
      [1, 2, 2, 2, 2, 2, 2, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    timestamp: "10:30 AM"
  }
};

export function VenueHeatmap() {
  const [selectedVenue, setSelectedVenue] = useState("main-hall");
  const [gridData, setGridData] = useState<DensityLevel[][]>([]);
  const [hotspots, setHotspots] = useState<{row: number, col: number, level: DensityLevel}[]>([]);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // Set the initial grid data
    const venueData = mockHeatmapData[selectedVenue];
    setGridData(venueData.gridData);
    setTimestamp(venueData.timestamp);
    
    // Find hotspots (areas with high density)
    const newHotspots: {row: number, col: number, level: DensityLevel}[] = [];
    
    venueData.gridData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell >= 3) { // High or Very High density
          newHotspots.push({
            row: rowIndex,
            col: colIndex,
            level: cell
          });
        }
      });
    });
    
    setHotspots(newHotspots);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      // In a real app, this would fetch new data from an API
      // For the demo, we'll just slightly modify the existing data
      
      setGridData(prevGrid => {
        const newGrid = [...prevGrid].map(row => [...row]);
        
        // Randomly update a few cells
        for (let i = 0; i < 5; i++) {
          const row = Math.floor(Math.random() * newGrid.length);
          const col = Math.floor(Math.random() * (newGrid[0]?.length || 0));
          
          if (newGrid[row] && newGrid[row][col] !== undefined) {
            // Randomly adjust up or down by 1 level, but stay within bounds
            const delta = Math.random() > 0.5 ? 1 : -1;
            let newValue = newGrid[row][col] + delta;
            if (newValue < 0) newValue = 0;
            if (newValue > 4) newValue = 4;
            newGrid[row][col] = newValue as DensityLevel;
          }
        }
        
        return newGrid;
      });
      
      // Update timestamp
      const now = new Date();
      setTimestamp(now.toLocaleTimeString());
      
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, [selectedVenue]);

  return (
    <Card className="venue-card">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Heatmap className="h-5 w-5" />
              Venue Heatmap
            </CardTitle>
            <CardDescription>
              Real-time crowd density visualization
            </CardDescription>
          </div>
          <Select value={selectedVenue} onValueChange={setSelectedVenue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select venue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main-hall">Main Hall</SelectItem>
              <SelectItem value="conference-room">Conference Room</SelectItem>
              <SelectItem value="outdoor-terrace">Outdoor Terrace</SelectItem>
              <SelectItem value="exhibition-area">Exhibition Area</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {timestamp}
          </div>
        </div>
        
        <Tabs defaultValue="heatmap">
          <TabsList className="mb-4">
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
          </TabsList>
          
          <TabsContent value="heatmap">
            <div className="heat-grid rounded-lg overflow-hidden border">
              {gridData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`} 
                      className={`heat-cell ${getDensityColor(cell)}`}
                      title={`Row ${rowIndex+1}, Column ${colIndex+1}: ${getDensityText(cell)} Density`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">Density Levels:</div>
              <div className="flex space-x-3">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className="flex items-center space-x-1">
                    <div className={`w-4 h-4 rounded ${getDensityColor(level as DensityLevel)}`}></div>
                    <span className="text-xs">{getDensityText(level as DensityLevel)}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hotspots">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-venue-primary" />
                  <span className="font-medium">Crowd Hotspots</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {hotspots.length} areas identified
                </div>
              </div>
              
              {hotspots.length > 0 ? (
                <div className="space-y-2">
                  {hotspots.map((spot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${getDensityColor(spot.level)}`}></div>
                        <span>
                          Area {index + 1} (Row {spot.row + 1}, Column {spot.col + 1})
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {spot.level === 4 ? (
                          <>
                            <AArrowUp className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-500">Critical</span>
                          </>
                        ) : (
                          <>
                            <AArrowDown className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-amber-500">High</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No hotspots detected in this venue area
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
