
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { getBusinessById, getQueueColor, categoryIcons } from "@/lib/data";
import { locations } from "@/lib/data";
import { QueueBookingModal } from "@/components/QueueBookingModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  Phone,
  Share2,
  Star,
  Users,
  ArrowLeft,
  CalendarCheck,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Service } from "@/lib/types";

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const business = getBusinessById(id || "");
  
  useEffect(() => {
    // Update page title
    if (business) {
      document.title = `${business.name} | Quick-Queue-Loco`;
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [business]);
  
  if (!business) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Business not found</h2>
            <p className="text-muted-foreground">
              The business you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const queueColor = getQueueColor(business.waitTime);
  
  const renderServicesByCategory = () => {
    if (!business.services || business.services.length === 0) {
      return <p className="text-muted-foreground">No services available</p>;
    }
    
    // Group services by category
    const servicesByCategory: Record<string, Service[]> = {};
    
    business.services.forEach(service => {
      const category = service.category || "General";
      if (!servicesByCategory[category]) {
        servicesByCategory[category] = [];
      }
      servicesByCategory[category].push(service);
    });
    
    return (
      <div className="space-y-6">
        {Object.entries(servicesByCategory).map(([category, services]) => (
          <div key={category}>
            <h3 className="text-lg font-medium mb-3">{category}</h3>
            <div className="space-y-3">
              {services.map(service => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Duration: {service.duration} mins
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{service.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />
      
      <main className="flex-1">
        <div className="relative h-52 md:h-64 lg:h-80 bg-gray-200 overflow-hidden">
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="container px-4 -mt-6 relative z-10">
          <div className="bg-background rounded-t-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-medium">
                    <span className="mr-1">{categoryIcons[business.category]}</span>
                    {business.category.charAt(0).toUpperCase() + business.category.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-medium">{business.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold">{business.name}</h1>
                
                <div className="flex items-start gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{business.address}</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button onClick={() => setIsBookingModalOpen(true)}>
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Book Queue Spot
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Current Queue Status</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Wait Time:</span>
                      </div>
                      <span className={`text-${queueColor} font-bold text-lg`}>
                        {business.waitTime} mins
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Queue Length:</span>
                        </div>
                        <span className="font-medium">{business.queueLength} people</span>
                      </div>
                      <Progress 
                        value={(business.queueLength / 30) * 100} 
                        className={`h-2 bg-muted`}
                        indicatorClassName={`bg-${queueColor}`}
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => setIsBookingModalOpen(true)}
                    >
                      Join Queue Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Business Hours</h3>
                  
                  <div className="space-y-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                      <div key={day} className="flex justify-between text-sm">
                        <span>{day}</span>
                        <span>9:00 AM - 8:00 PM</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm">
                      <span>Saturday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sunday</span>
                      <span className="text-destructive">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <Tabs defaultValue="services">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="services">Services & Pricing</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="services" className="mt-6">
                  {renderServicesByCategory()}
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">Reviews coming soon</h3>
                    <p className="text-muted-foreground mt-2">
                      Reviews for this business will be available soon
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-muted py-6 mt-12">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Quick-Queue-Loco. All rights reserved.
          </p>
        </div>
      </footer>
      
      <QueueBookingModal
        business={business}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default BusinessDetails;
