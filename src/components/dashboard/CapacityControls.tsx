
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Octagon, Bell, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CapacityControls() {
  const { toast } = useToast();
  const [maxCapacity, setMaxCapacity] = useState(600);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [socialDistancingActive, setSocialDistancingActive] = useState(false);
  const [venueAccessRestricted, setVenueAccessRestricted] = useState(false);
  
  const handleEmergencyToggle = () => {
    setEmergencyMode(!emergencyMode);
    if (!emergencyMode) {
      // Activating emergency mode
      setMaxCapacity(300); // 50% capacity in emergency
      setSocialDistancingActive(true);
      setVenueAccessRestricted(true);
      
      toast({
        title: "Emergency Mode Activated",
        description: "Venue capacity has been reduced to 50%",
        variant: "destructive",
      });
    } else {
      // Deactivating emergency mode
      setMaxCapacity(600); // Back to full capacity
      
      toast({
        title: "Emergency Mode Deactivated",
        description: "Venue capacity has been restored to normal",
      });
    }
  };
  
  const handleCapacityChange = (value: number[]) => {
    setMaxCapacity(value[0]);
    
    toast({
      title: "Capacity Updated",
      description: `Maximum capacity set to ${value[0]} people`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className={`venue-card ${emergencyMode ? 'border-red-500' : ''}`}>
        <CardHeader className={emergencyMode ? 'bg-red-50' : ''}>
          <CardTitle className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Octagon className={`h-5 w-5 ${emergencyMode ? 'text-red-500' : 'text-venue-primary'}`} />
              Emergency Controls
            </span>
            {emergencyMode && (
              <Badge className="bg-red-500">Active</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {emergencyMode && (
            <Alert variant="destructive" className="mb-4">
              <Octagon className="h-4 w-4" />
              <AlertTitle>Emergency Mode Active</AlertTitle>
              <AlertDescription>
                Venue capacity has been reduced and special protocols are in effect.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <div className="font-medium">Emergency Mode</div>
              <div className="text-sm text-muted-foreground">
                Activate for immediate capacity restrictions
              </div>
            </div>
            <Switch 
              checked={emergencyMode} 
              onCheckedChange={handleEmergencyToggle} 
              className={emergencyMode ? "bg-red-500" : ""} 
            />
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="font-medium">Maximum Capacity Control</div>
            <div className="flex items-center gap-2">
              <Slider 
                value={[maxCapacity]} 
                max={600} 
                step={10} 
                onValueChange={handleCapacityChange}
                className={emergencyMode ? "accent-red-500" : ""}
                disabled={emergencyMode}
              />
              <span className="min-w-[4rem] text-right">{maxCapacity}</span>
            </div>
          </div>
          
          <Separator />
          
          <Accordion type="single" collapsible>
            <AccordionItem value="emergency-protocols">
              <AccordionTrigger>Emergency Protocols</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Social Distancing</div>
                    <Switch 
                      checked={socialDistancingActive} 
                      onCheckedChange={setSocialDistancingActive}
                      disabled={emergencyMode}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Restrict Venue Access</div>
                    <Switch 
                      checked={venueAccessRestricted} 
                      onCheckedChange={setVenueAccessRestricted}
                      disabled={emergencyMode}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Button 
            className="w-full mt-2" 
            variant={emergencyMode ? "destructive" : "default"}
            onClick={() => {
              toast({
                title: "Emergency Alert Sent",
                description: "All staff have been notified of the current emergency status",
              });
            }}
          >
            <Bell className="h-4 w-4 mr-2" />
            {emergencyMode ? "Send Emergency Alert" : "Test Alert System"}
          </Button>
        </CardContent>
      </Card>
      
      <Card className="venue-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-venue-primary" />
            Queue Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-medium">Current Queue Status</div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-venue-primary" />
                  <span>People Waiting</span>
                </div>
                <Badge className="bg-amber-500">35</Badge>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-venue-primary" />
                  <span>Estimated Wait Time</span>
                </div>
                <Badge className="bg-venue-primary">25 min</Badge>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                className="h-auto py-4 px-2"
                onClick={() => {
                  toast({
                    title: "Queue Paused",
                    description: "No new visitors will be admitted until resumed",
                  });
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm">Pause Queue</span>
                </div>
              </Button>
              
              <Button 
                variant="outline"
                className="h-auto py-4 px-2"
                onClick={() => {
                  toast({
                    title: "Queue Reset",
                    description: "Queue has been cleared and reset",
                  });
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <Octagon className="h-5 w-5" />
                  <span className="text-sm">Reset Queue</span>
                </div>
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="text-sm font-medium">Quick Actions</div>
              <Button 
                className="w-full bg-venue-success hover:bg-green-700"
                onClick={() => {
                  toast({
                    title: "Queue Moving",
                    description: "Notified next 10 people in queue to enter",
                  });
                }}
              >
                <Bell className="h-4 w-4 mr-2" />
                Admit Next Group (10 people)
              </Button>
              
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Notifications Sent",
                    description: "Wait time update sent to all people in queue",
                  });
                }}
              >
                <Bell className="h-4 w-4 mr-2" />
                Send Queue Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
