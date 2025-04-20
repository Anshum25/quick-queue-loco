import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { getBusinessById } from "@/lib/data";
import { locations } from "@/lib/data";
import { LocationInfo } from "@/lib/types";
import { useState } from "react";
import { QueueBookingModal } from "@/components/QueueBookingModal";
import { LiveQueueStatus } from "@/components/LiveQueueStatus";
import { DepartmentSelector } from "@/components/DepartmentSelector";

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const business = getBusinessById(id || "");
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(locations[0]);
	const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  if (!business) {
    return <div>Business not found</div>;
  }

  const handleBookQueue = () => {
		setIsBookingModalOpen(true);
  };

  const handleDepartmentSelect = (department: string) => {
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
            <p className="mt-4">{business.description}</p>

            <DepartmentSelector
              departments={business.departments}
              onDepartmentSelect={handleDepartmentSelect}
            />

            <Button className="mt-4" onClick={handleBookQueue}>
              Book Queue
            </Button>
          </div>

          <div>
            <LiveQueueStatus businessId={business.id} />
          </div>
        </div>
      </div>

			<QueueBookingModal
				isOpen={isBookingModalOpen}
				onClose={() => setIsBookingModalOpen(false)}
				businessId={business.id}
        department={selectedDepartment}
			/>
    </div>
  );
};

export default BusinessDetails;
