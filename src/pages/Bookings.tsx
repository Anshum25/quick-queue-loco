
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { locations } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Bookings = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const { toast } = useToast();
  
  // Dummy bookings data
  const activeBookings = [
    {
      id: "b1",
      businessName: "Polo Hospital",
      serviceName: "General Checkup",
      address: "123 Healthcare Ave, Ahmedabad",
      time: "Today, 3:30 PM",
      position: 5,
      estimatedWait: 25,
    },
  ];
  
  const pastBookings = [
    {
      id: "b2",
      businessName: "Style Studio Salon",
      serviceName: "Men's Haircut",
      address: "78 Beauty Road, Ahmedabad",
      time: "Yesterday, 2:00 PM",
      completed: true,
    },
    {
      id: "b3",
      businessName: "State Bank of India",
      serviceName: "Cash Deposit/Withdrawal",
      address: "45 Financial Street, Ahmedabad",
      time: "Apr 10, 11:30 AM",
      completed: true,
    },
  ];
  
  const handleCancelBooking = (id: string) => {
    // In a real app, this would call an API
    toast({
      title: "Booking cancelled",
      description: "Your queue booking has been successfully cancelled.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />
      
      <main className="flex-1 container px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Queue Bookings</h1>
        
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
                {activeBookings.map((booking) => (
                  <Card key={booking.id} className="border-primary/20">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className="mb-2">Active</Badge>
                          <h3 className="text-lg font-bold">{booking.businessName}</h3>
                          <p className="text-muted-foreground">{booking.serviceName}</p>
                        </div>
                        <div className="bg-primary/10 px-4 py-2 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">Your Position</p>
                          <p className="text-2xl font-bold text-primary">{booking.position}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <span className="text-sm">{booking.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Estimated Wait Time:</span>
                          <span className="font-bold">{booking.estimatedWait} minutes</span>
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
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel Booking
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
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
                {pastBookings.map((booking) => (
                  <Card key={booking.id} className="border-muted">
                    <CardContent className="p-5">
                      <div>
                        <Badge variant="outline" className="mb-2">Completed</Badge>
                        <h3 className="text-lg font-bold">{booking.businessName}</h3>
                        <p className="text-muted-foreground">{booking.serviceName}</p>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <span className="text-sm">{booking.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-5 pt-0 justify-end">
                      <Button variant="outline" size="sm">Book Again</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-muted py-6">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Quick-Queue-Loco. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Bookings;
