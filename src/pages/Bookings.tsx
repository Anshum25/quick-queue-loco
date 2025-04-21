import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { locations } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, X, RefreshCw, Sun, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QueueBooking } from "@/lib/types";
import { useTheme } from "next-themes";

const Bookings = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { theme, setTheme } = useTheme();
  
  const [activeBookings, setActiveBookings] = useState<QueueBooking[]>([
    {
      id: "b1",
      businessId: "biz1",
      serviceId: "s1",
      estimatedTime: 25,
      position: 5,
      status: "active",
    },
  ]);
  
  const [pastBookings, setPastBookings] = useState<QueueBooking[]>([
    {
      id: "b2",
      businessId: "biz2",
      serviceId: "s2",
      estimatedTime: 0,
      position: 0,
      status: "completed",
    },
    {
      id: "b3",
      businessId: "biz3",
      serviceId: "s3",
      estimatedTime: 0,
      position: 0,
      status: "completed",
    },
  ]);

  const businessData = {
    "biz1": {
      name: "Polo Hospital",
      service: "General Checkup",
      address: "123 Healthcare Ave, Ahmedabad",
      time: "Today, 3:30 PM",
    },
    "biz2": {
      name: "Style Studio Salon",
      service: "Men's Haircut",
      address: "78 Beauty Road, Ahmedabad",
      time: "Yesterday, 2:00 PM",
    },
    "biz3": {
      name: "State Bank of India",
      service: "Cash Deposit/Withdrawal",
      address: "45 Financial Street, Ahmedabad",
      time: "Apr 10, 11:30 AM",
    },
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBookings(current => 
        current.map(booking => {
          const newPosition = Math.max(1, booking.position - (Math.random() > 0.7 ? 1 : 0));
          const newTime = Math.max(5, booking.estimatedTime - (Math.random() > 0.7 ? 5 : 0));
          
          if (newPosition <= 3 && booking.position > 3) {
            toast({
              title: "Your turn is approaching!",
              description: `You are now position ${newPosition} in the queue.`,
            });
          }
          
          if (newTime <= 10 && booking.estimatedTime > 10) {
            toast({
              title: "Almost there!",
              description: `Estimated wait time is now ${newTime} minutes.`,
            });
          }
          
          return {
            ...booking,
            position: newPosition,
            estimatedTime: newTime,
          };
        })
      );
      
      setLastUpdated(new Date());
    }, 30000);
    
    return () => clearInterval(interval);
  }, [toast]);
  
  const handleCancelBooking = (id: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const bookingToCancel = activeBookings.find(b => b.id === id);
      
      if (bookingToCancel) {
        setPastBookings(prev => [
          {
            ...bookingToCancel,
            status: "cancelled",
          },
          ...prev
        ]);
        
        setActiveBookings(prev => prev.filter(b => b.id !== id));
        
        toast({
          title: "Booking cancelled",
          description: "Your queue booking has been successfully cancelled.",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  const refreshBookings = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
      
      toast({
        title: "Bookings refreshed",
        description: "Your booking information is now up to date.",
      });
    }, 1000);
  };
  
  const formatLastUpdated = () => {
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "just now";
    if (diffMins === 1) return "1 minute ago";
    return `${diffMins} minutes ago`;
  };

  const getBusinessDetails = (businessId: string) => {
    return businessData[businessId as keyof typeof businessData] || {
      name: "Unknown Business",
      service: "Unknown Service",
      address: "Unknown Address",
      time: "Unknown Time",
    };
  };
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />
      
      <main className="flex-1 container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold dark:text-white">My Queue Bookings</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshBookings} 
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          Last updated: {formatLastUpdated()}
        </div>
        
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active">
              Active Bookings
              {activeBookings.length > 0 && (
                <Badge className="ml-2">{activeBookings.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Bookings
              {pastBookings.length > 0 && (
                <Badge variant="outline" className="ml-2">{pastBookings.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeBookings.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium">No active bookings</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  You don't have any active bookings in the queue at the moment.
                </p>
                <Button asChild>
                  <a href="/">Find a service</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeBookings.map((booking) => {
                  const business = getBusinessDetails(booking.businessId);
                  return (
                    <Card key={booking.id} className="border-primary/20">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className="mb-2">Active</Badge>
                            <h3 className="text-lg font-bold">{business.name}</h3>
                            <p className="text-muted-foreground">{business.service}</p>
                          </div>
                          <div className="bg-primary/10 px-4 py-2 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Your Position</p>
                            <p className="text-2xl font-bold text-primary">{booking.position}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span className="text-sm">{business.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{business.time}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Estimated Wait Time:</span>
                            <span className="font-bold">{booking.estimatedTime} minutes</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            You'll receive a notification when your turn is approaching.
                          </p>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-5 pt-0">
                        <Button 
                          variant="outline" 
                          className="w-full text-destructive hover:text-destructive"
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={isLoading}
                        >
                          <X className="h-4 w-4 mr-2" />
                          {isLoading ? "Cancelling..." : "Cancel Booking"}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastBookings.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium">No past bookings</h3>
                <p className="text-muted-foreground mt-2">
                  You don't have any past queue bookings.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastBookings.map((booking) => {
                  const business = getBusinessDetails(booking.businessId);
                  return (
                    <Card key={booking.id} className="border-muted">
                      <CardContent className="p-5">
                        <div>
                          <Badge variant={booking.status === "cancelled" ? "destructive" : "outline"} className="mb-2">
                            {booking.status === "cancelled" ? "Cancelled" : "Completed"}
                          </Badge>
                          <h3 className="text-lg font-bold">{business.name}</h3>
                          <p className="text-muted-foreground">{business.service}</p>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span className="text-sm">{business.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{business.time}</span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-5 pt-0 justify-end">
                        {booking.status !== "cancelled" && (
                          <Button variant="outline" size="sm">Book Again</Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-muted py-6 dark:bg-gray-800">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            © 2025 Quick-Queue-Loco. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Bookings;
