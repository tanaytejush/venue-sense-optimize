
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { ChartBar, Clock, Users } from "lucide-react";

// Mock data for venue analytics
const hourlyData = [
  { time: "8 AM", visitors: 120, capacity: 600, occupancyRate: 20 },
  { time: "9 AM", visitors: 210, capacity: 600, occupancyRate: 35 },
  { time: "10 AM", visitors: 325, capacity: 600, occupancyRate: 54 },
  { time: "11 AM", visitors: 420, capacity: 600, occupancyRate: 70 },
  { time: "12 PM", visitors: 510, capacity: 600, occupancyRate: 85 },
  { time: "1 PM", visitors: 490, capacity: 600, occupancyRate: 82 },
  { time: "2 PM", visitors: 525, capacity: 600, occupancyRate: 88 },
  { time: "3 PM", visitors: 480, capacity: 600, occupancyRate: 80 },
  { time: "4 PM", visitors: 390, capacity: 600, occupancyRate: 65 },
  { time: "5 PM", visitors: 340, capacity: 600, occupancyRate: 57 },
  { time: "6 PM", visitors: 280, capacity: 600, occupancyRate: 47 },
  { time: "7 PM", visitors: 180, capacity: 600, occupancyRate: 30 },
];

const weeklyData = [
  { day: "Mon", visitors: 2800, avgOccupancy: 62 },
  { day: "Tue", visitors: 2350, avgOccupancy: 52 },
  { day: "Wed", visitors: 3100, avgOccupancy: 68 },
  { day: "Thu", visitors: 2900, avgOccupancy: 65 },
  { day: "Fri", visitors: 3800, avgOccupancy: 83 },
  { day: "Sat", visitors: 4200, avgOccupancy: 92 },
  { day: "Sun", visitors: 3600, avgOccupancy: 78 },
];

const monthlyData = [
  { month: "Jan", visitors: 56000, avgOccupancy: 58 },
  { month: "Feb", visitors: 62000, avgOccupancy: 65 },
  { month: "Mar", visitors: 72000, avgOccupancy: 75 },
  { month: "Apr", visitors: 68000, avgOccupancy: 70 },
  { month: "May", visitors: 78000, avgOccupancy: 82 },
  { month: "Jun", visitors: 84000, avgOccupancy: 88 },
];

const peakHoursData = [
  { hour: "8 AM", crowdLevel: 25 },
  { hour: "9 AM", crowdLevel: 38 },
  { hour: "10 AM", crowdLevel: 56 },
  { hour: "11 AM", crowdLevel: 70 },
  { hour: "12 PM", crowdLevel: 85 },
  { hour: "1 PM", crowdLevel: 82 },
  { hour: "2 PM", crowdLevel: 90 },
  { hour: "3 PM", crowdLevel: 88 },
  { hour: "4 PM", crowdLevel: 65 },
  { hour: "5 PM", crowdLevel: 48 },
  { hour: "6 PM", crowdLevel: 32 },
  { hour: "7 PM", crowdLevel: 20 },
];

export function AnalyticsOverview() {
  return (
    <Card className="venue-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartBar className="h-5 w-5 text-venue-primary" />
          Venue Analytics
        </CardTitle>
        <CardDescription>
          Track occupancy trends and visitor patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="space-y-4">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="peak">Peak Hours</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={hourlyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} visitors`, "Visitors"]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    name="Visitors"
                    stroke="#0EA5E9"
                    fill="#0EA5E9"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-venue-primary" />
                    Total Visitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4,270</div>
                  <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-venue-warning" />
                    Peak Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2:00 PM</div>
                  <p className="text-xs text-muted-foreground">88% capacity at peak</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <ChartBar className="h-4 w-4 text-venue-success" />
                    Avg. Occupancy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">62%</div>
                  <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" stroke="#0EA5E9" />
                  <YAxis yAxisId="right" orientation="right" stroke="#F97316" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="visitors"
                    name="Total Visitors"
                    fill="#0EA5E9"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="avgOccupancy"
                    name="Avg. Occupancy (%)"
                    fill="#F97316"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#0EA5E9" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="visitors"
                    name="Total Visitors"
                    stroke="#0EA5E9"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgOccupancy"
                    name="Avg. Occupancy (%)"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="peak">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={peakHoursData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="hour" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, "Crowd Level"]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="crowdLevel"
                    name="Crowd Level (%)"
                    fill="#0891B2"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-venue-primary flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recommended Booking Times
              </h4>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <div className="bg-white p-2 rounded border border-blue-100 text-sm">
                  <span className="font-medium">Morning: </span>8:00 AM - 10:00 AM
                </div>
                <div className="bg-white p-2 rounded border border-blue-100 text-sm">
                  <span className="font-medium">Afternoon: </span>4:00 PM - 5:00 PM
                </div>
                <div className="bg-white p-2 rounded border border-blue-100 text-sm">
                  <span className="font-medium">Evening: </span>6:00 PM - 7:00 PM
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
