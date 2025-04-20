
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
    return <div>Business not found</div>;
  }

  const handleBookQueue = () => {
    setIsBookingModalOpen(true);
  };

  const handleDepartmentSelect = (department: Department) => {
    setSelectedDepartment(department);
  };

  return (
    <div>
      <Navbar
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />

      <div className="container mx-auto mt-8 px-4">
        <div className="mb-4">
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-2xl font-bold">{business.name}</h1>
            <p className="text-gray-600">{business.address}</p>
            <p className="mt-2">Wait Time: {business.waitTime} minutes</p>
            <p>Rating: {business.rating}</p>
            <p className="mt-4">{business.category === "hospital" ? "Hospital services" : business.name}</p>

            {business.category === "hospital" && departments.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-medium mb-2">Departments</h2>
                <DepartmentSelector
                  departments={departments}
                  selectedDepartment={selectedDepartment}
                  onDepartmentChange={handleDepartmentSelect}
                />
              </div>
            )}

            <Button className="mt-4" onClick={handleBookQueue}>
              Book Queue
            </Button>
          </div>

          <div>
            {selectedDepartment ? (
              <LiveQueueStatus department={selectedDepartment} />
            ) : (
              <div className="border rounded-md p-4">
                <p>Select a department to see queue status</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <QueueBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        business={business}
      />
    </div>
  );
};

export default BusinessDetails;
