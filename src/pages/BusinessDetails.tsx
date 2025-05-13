
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { getBusinessById } from "@/lib/data";
import { locations } from "@/lib/data";
import { LocationInfo, Department } from "@/lib/types";
import { useState } from "react";
import { QueueBookingModal } from "@/components/QueueBookingModal";
import { getDepartmentsForHospital } from "@/lib/data-departments";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

// Import the newly created components
import { BusinessHeader } from "@/components/business/BusinessHeader";
import { BusinessMetrics } from "@/components/business/BusinessMetrics";
import { BusinessAbout } from "@/components/business/BusinessAbout";
import { BusinessLocation } from "@/components/business/BusinessLocation";
import { BusinessServices } from "@/components/business/BusinessServices";
import { BusinessDepartments } from "@/components/business/BusinessDepartments";
import { BusinessQueueStatus } from "@/components/business/BusinessQueueStatus";
import { BusinessOperatingHours } from "@/components/business/BusinessOperatingHours";

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

  // Sample coordinates based on the business address
  // In a real app, you would use geocoding to get these from the address
  const businessCoordinates = {
    latitude: 23.0225 + (Math.random() * 0.01 - 0.005),
    longitude: 72.5714 + (Math.random() * 0.01 - 0.005)
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
              <BusinessHeader 
                name={business.name} 
                imageUrl={business.imageUrl} 
              />
              
              <CardContent className="p-6">
                <BusinessMetrics 
                  address={business.address}
                  rating={business.rating}
                  waitTime={business.waitTime}
                  queueLength={business.queueLength}
                />

                <div className="space-y-6">
                  <BusinessAbout 
                    name={business.name} 
                    category={business.category}
                    city={selectedLocation?.city || ""}
                  />

                  <BusinessLocation 
                    name={business.name}
                    address={business.address}
                    coordinates={businessCoordinates}
                  />

                  {business.services && (
                    <BusinessServices services={business.services} />
                  )}

                  {business.category === "hospital" && departments && departments.length > 0 && (
                    <BusinessDepartments 
                      departments={departments}
                      selectedDepartment={selectedDepartment}
                      onDepartmentSelect={handleDepartmentSelect}
                    />
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
                <BusinessQueueStatus 
                  selectedDepartment={selectedDepartment}
                  departments={departments}
                  waitTime={business.waitTime}
                />
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
                <BusinessOperatingHours />
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
