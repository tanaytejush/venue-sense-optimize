
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Search, Users, Clock } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-5">
            <h1 className="text-xl font-semibold">VenueSense Dashboard</h1>
            <Badge className="bg-venue-primary hover:bg-venue-secondary">Live</Badge>
          </div>
          
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="relative w-full max-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-white pl-8 dark:bg-gray-950"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-4 md:flex">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>1,342 visitors today</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Peak time: 2:00 - 4:00 PM</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="relative h-8 w-8"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback>VS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
