
import { QueueBooking } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { BookingCard } from "./BookingCard";
import { PastBookingCard } from "./PastBookingCard";

interface BookingsListProps {
  activeBookings: QueueBooking[];
  pastBookings: QueueBooking[];
  isLoading: boolean;
  onCancelBooking: (id: string) => void;
  businessData: Record<string, {
    name: string;
    service: string;
    address: string;
    time: string;
  }>;
  type: "active" | "past";
}

export function BookingsList({ 
  activeBookings, 
  pastBookings, 
  isLoading, 
  onCancelBooking, 
  businessData, 
  type 
}: BookingsListProps) {
  const bookings = type === "active" ? activeBookings : pastBookings;
  const getBusinessDetails = (businessId: string) => {
    return businessData[businessId] || {
      name: "Unknown Business",
      service: "Unknown Service",
      address: "Unknown Address",
      time: "Unknown Time",
    };
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-medium">No {type} bookings</h3>
        <p className="text-muted-foreground mt-2 mb-4">
          {type === "active" 
            ? "You don't have any active bookings in the queue at the moment."
            : "You don't have any past queue bookings."}
        </p>
        {type === "active" && (
          <Button asChild>
            <a href="/">Find a service</a>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        type === "active" ? (
          <BookingCard
            key={booking.id}
            booking={booking}
            businessDetails={getBusinessDetails(booking.businessId)}
            isLoading={isLoading}
            onCancel={onCancelBooking}
          />
        ) : (
          <PastBookingCard
            key={booking.id}
            booking={booking}
            businessDetails={getBusinessDetails(booking.businessId)}
          />
        )
      ))}
    </div>
  );
}
