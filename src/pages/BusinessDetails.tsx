
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { getBusinessById } from "@/lib/data";
import { locations } from "@/lib/data";
import { LocationInfo, Department } from "@/lib/types";
import { useState } from "react";
import { QueueBookingModal } from "@/components/QueueBookingModal";
import { LiveQueueStatus } from "@/components/LiveQueueStatus";
import { DepartmentSelector } from "@/components/DepartmentSelector";
import { getDepartmentsForHospital } from "@/lib/data-departments";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Users, Star, ArrowLeft } from "lucide-react";

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const business = getBusinessById(id || "");
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(locations[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  
  // Get departments if this is a hospital
  const departments = business?.category === "hospital" 
    ? getDepartmentsForHospital(business.id)
    : [];

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-xl font-semibold mb-2">Business Not Found</h2>
          <p className="text-muted-foreground mb-4">The business you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </Card>
      </div>
    );
  }

  const handleBookQueue = () => {
    setIsBookingModalOpen(true);
  };

  const handleDepartmentSelect = (department: Department) => {
    setSelectedDepartment(department);
  };

  // Determine wait time color
  const getWaitTimeColor = () => {
    if (business.waitTime <= 15) return "text-green-500";
    if (business.waitTime <= 30) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />

      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" asChild className="mb-6">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Business Details Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-none shadow-md">
              <div className="h-48 md:h-64 overflow-hidden relative">
                <img 
                  src={business.imageUrl} 
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{business.name}</h1>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{business.address}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{business.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className={`font-medium ${getWaitTimeColor()}`}>
                        {business.waitTime} min wait
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">{business.queueLength} in queue</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">About {business.name}</h2>
                    <p className="text-muted-foreground">
                      {business.category === "hospital" 
                        ? `${business.name} is a leading healthcare facility offering comprehensive medical services with a focus on patient care and comfort.` 
                        : `${business.name} is a top-rated ${business.category} providing exceptional service to customers in ${selectedLocation?.city}.`
                      }
                    </p>
                  </div>

                  {business.services && business.services.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Services</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {business.services.map(service => (
                          <div 
                            key={service.id}
                            className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{service.name}</h3>
                              <span className="font-medium">
                                {service.price > 0 ? `₹${service.price}` : 'Free'}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Duration: {service.duration} mins
                              {service.category && ` • ${service.category}`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {business.category === "hospital" && departments && departments.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Departments</h2>
                      <DepartmentSelector
                        departments={departments}
                        selectedDepartment={selectedDepartment}
                        onDepartmentChange={handleDepartmentSelect}
                      />
                    </div>
                  )}

                  <Button 
                    size="lg" 
                    onClick={handleBookQueue}
                    className="w-full md:w-auto"
                  >
                    Book Queue Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Queue Status Section */}
          <div className="space-y-6">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Queue Status</h2>
                {selectedDepartment ? (
                  <LiveQueueStatus department={selectedDepartment} />
                ) : (
                  departments && departments.length > 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-2">Select a department to see queue status</p>
                      <p className="text-sm">Current overall wait time: <span className={getWaitTimeColor()}>{business.waitTime} minutes</span></p>
                    </div>
                  ) : (
                    <LiveQueueStatus 
                      department={{
                        id: "main",
                        name: business.name,
                        waitTime: business.waitTime,
                        queueLength: business.queueLength,
                        active: true
                      }} 
                    />
                  )
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <QueueBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        business={business}
        selectedDepartment={selectedDepartment}
      />
    </div>
  );
};

export default BusinessDetails;
