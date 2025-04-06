
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Users } from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  availability: "high" | "medium" | "low" | "none";
  occupancy: number;
  maxCapacity: number;
}

interface VenueSpace {
  id: string;
  name: string;
  type: string;
  capacity: number;
  image: string;
  available: boolean;
}

// Mock data for time slots - in a real app this would be dynamic
const morningSlots: TimeSlot[] = [
  { id: "1", time: "8:00 AM", availability: "high", occupancy: 20, maxCapacity: 200 },
  { id: "2", time: "9:00 AM", availability: "high", occupancy: 45, maxCapacity: 200 },
  { id: "3", time: "10:00 AM", availability: "medium", occupancy: 115, maxCapacity: 200 },
  { id: "4", time: "11:00 AM", availability: "low", occupancy: 170, maxCapacity: 200 },
];

const afternoonSlots: TimeSlot[] = [
  { id: "5", time: "12:00 PM", availability: "low", occupancy: 180, maxCapacity: 200 },
  { id: "6", time: "1:00 PM", availability: "low", occupancy: 185, maxCapacity: 200 },
  { id: "7", time: "2:00 PM", availability: "medium", occupancy: 110, maxCapacity: 200 },
  { id: "8", time: "3:00 PM", availability: "medium", occupancy: 130, maxCapacity: 200 },
];

const eveningSlots: TimeSlot[] = [
  { id: "9", time: "4:00 PM", availability: "medium", occupancy: 100, maxCapacity: 200 },
  { id: "10", time: "5:00 PM", availability: "high", occupancy: 70, maxCapacity: 200 },
  { id: "11", time: "6:00 PM", availability: "high", occupancy: 50, maxCapacity: 200 },
  { id: "12", time: "7:00 PM", availability: "high", occupancy: 30, maxCapacity: 200 },
];

// Mock data for venue spaces - in a real app this would be dynamic
const venueSpaces: VenueSpace[] = [
  { 
    id: "main-hall", 
    name: "Main Hall", 
    type: "Large Venue", 
    capacity: 600,
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=300&h=200&q=80",
    available: true
  },
  { 
    id: "conference-room", 
    name: "Conference Room", 
    type: "Meeting Space", 
    capacity: 150,
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=300&h=200&q=80",
    available: false
  },
  { 
    id: "outdoor-terrace", 
    name: "Outdoor Terrace", 
    type: "Open Space", 
    capacity: 200,
    image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?auto=format&fit=crop&w=300&h=200&q=80",
    available: true
  },
  { 
    id: "exhibition-area", 
    name: "Exhibition Area", 
    type: "Display Space", 
    capacity: 450,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&h=200&q=80",
    available: true
  },
];

const getAvailabilityColor = (availability: TimeSlot["availability"]) => {
  switch (availability) {
    case "high":
      return "bg-green-100 text-green-800 border-green-200";
    case "medium":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "low":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "none":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function BookingSystem() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="venue-card">
        <CardHeader>
          <CardTitle>Book a Venue</CardTitle>
          <CardDescription>
            Select a date, time, and venue to make a booking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md p-3"
            />
            
            <Tabs defaultValue="morning" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="morning">Morning</TabsTrigger>
                <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
                <TabsTrigger value="evening">Evening</TabsTrigger>
              </TabsList>
              
              <TabsContent value="morning" className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {morningSlots.map(slot => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      className={`justify-start h-auto p-3 ${
                        selectedSlot === slot.id ? "ring-2 ring-venue-primary" : ""
                      }`}
                      onClick={() => setSelectedSlot(slot.id)}
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4" />
                          <span>{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="text-xs">{slot.occupancy}/{slot.maxCapacity}</span>
                        </div>
                        <Badge className={`mt-2 ${getAvailabilityColor(slot.availability)}`}>
                          {slot.availability === "high" ? "High Availability" : 
                           slot.availability === "medium" ? "Medium Availability" : 
                           slot.availability === "low" ? "Limited Availability" : "Fully Booked"}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="afternoon" className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {afternoonSlots.map(slot => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      className={`justify-start h-auto p-3 ${
                        selectedSlot === slot.id ? "ring-2 ring-venue-primary" : ""
                      }`}
                      onClick={() => setSelectedSlot(slot.id)}
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4" />
                          <span>{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="text-xs">{slot.occupancy}/{slot.maxCapacity}</span>
                        </div>
                        <Badge className={`mt-2 ${getAvailabilityColor(slot.availability)}`}>
                          {slot.availability === "high" ? "High Availability" : 
                           slot.availability === "medium" ? "Medium Availability" : 
                           slot.availability === "low" ? "Limited Availability" : "Fully Booked"}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="evening" className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {eveningSlots.map(slot => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      className={`justify-start h-auto p-3 ${
                        selectedSlot === slot.id ? "ring-2 ring-venue-primary" : ""
                      }`}
                      onClick={() => setSelectedSlot(slot.id)}
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4" />
                          <span>{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="text-xs">{slot.occupancy}/{slot.maxCapacity}</span>
                        </div>
                        <Badge className={`mt-2 ${getAvailabilityColor(slot.availability)}`}>
                          {slot.availability === "high" ? "High Availability" : 
                           slot.availability === "medium" ? "Medium Availability" : 
                           slot.availability === "low" ? "Limited Availability" : "Fully Booked"}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
      <Card className="venue-card">
        <CardHeader>
          <CardTitle>Available Venues</CardTitle>
          <CardDescription>
            {date ? `Selected date: ${format(date, "PPP")}` : "Choose a date to see available venues"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venueSpaces.map(space => (
              <Button
                key={space.id}
                variant="outline"
                className={`h-auto p-0 overflow-hidden ${
                  !space.available ? "opacity-50 cursor-not-allowed" : ""
                } ${selectedVenue === space.id ? "ring-2 ring-venue-primary" : ""}`}
                disabled={!space.available}
                onClick={() => space.available && setSelectedVenue(space.id)}
              >
                <div className="w-full">
                  <div className="w-full h-32 bg-gray-200 relative">
                    <img 
                      src={space.image} 
                      alt={space.name}
                      className="w-full h-full object-cover"
                    />
                    {!space.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Unavailable</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-left">
                    <h4 className="font-semibold">{space.name}</h4>
                    <p className="text-sm text-gray-600">{space.type}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Capacity: {space.capacity}</span>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
              className="w-full bg-venue-primary hover:bg-venue-secondary"
              disabled={!selectedSlot || !selectedVenue || !date}
            >
              Complete Booking
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
