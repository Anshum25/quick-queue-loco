
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { locations } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, CalendarCheck, Clock, CheckCheck } from "lucide-react";

const Notifications = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  
  // Dummy notifications data
  const notifications = [
    {
      id: "n1",
      title: "Your turn is approaching",
      message: "You're next in line at Polo Hospital. Please arrive in the next 10 minutes.",
      time: "Just now",
      isNew: true,
      type: "alert",
    },
    {
      id: "n2",
      title: "Queue position updated",
      message: "Your position at Polo Hospital has changed from 5 to 2.",
      time: "30 minutes ago",
      isNew: true,
      type: "update",
    },
    {
      id: "n3",
      title: "Booking confirmed",
      message: "Your spot in the queue at Polo Hospital has been confirmed.",
      time: "2 hours ago",
      isNew: false,
      type: "confirmation",
    },
    {
      id: "n4",
      title: "Service completed",
      message: "Thank you for visiting Style Studio Salon. We hope you enjoyed our service!",
      time: "Yesterday",
      isNew: false,
      type: "completion",
    },
    {
      id: "n5",
      title: "New businesses nearby",
      message: "5 new businesses in Ahmedabad have joined Quick-Queue-Loco.",
      time: "3 days ago",
      isNew: false,
      type: "info",
    },
  ];
  
  const getIconForType = (type: string) => {
    switch (type) {
      case "alert":
        return <Bell className="h-5 w-5 text-destructive" />;
      case "update":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "confirmation":
        return <CalendarCheck className="h-5 w-5 text-primary" />;
      case "completion":
        return <CheckCheck className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const newNotifications = notifications.filter(n => n.isNew);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />
      
      <main className="flex-1 container px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="outline" size="sm">Mark all as read</Button>
        </div>
        
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No notifications</h3>
            <p className="text-muted-foreground mt-2">
              You don't have any notifications at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {newNotifications.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium">New</h2>
                {newNotifications.map((notification) => (
                  <Card key={notification.id} className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    <CardContent className="p-4 pl-5">
                      <div className="flex gap-4">
                        <div className="mt-1">
                          {getIconForType(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{notification.title}</h3>
                            <Badge variant="outline" className="text-xs font-normal">
                              {notification.time}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Separator />
              </div>
            )}
            
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Earlier</h2>
              {notifications
                .filter((n) => !n.isNew)
                .map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="mt-1">
                          {getIconForType(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-muted py-6 mt-6">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Quick-Queue-Loco. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Notifications;
