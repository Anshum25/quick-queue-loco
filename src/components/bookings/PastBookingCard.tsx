
import { QueueBooking } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

interface PastBookingCardProps {
  booking: QueueBooking;
  businessDetails: {
    name: string;
    service: string;
    address: string;
    time: string;
  };
}

export function PastBookingCard({ booking, businessDetails }: PastBookingCardProps) {
  return (
    <Card className="border-muted">
      <CardContent className="p-5">
        <div>
          <Badge variant={booking.status === "cancelled" ? "destructive" : "outline"} className="mb-2">
            {booking.status === "cancelled" ? "Cancelled" : "Completed"}
          </Badge>
          <h3 className="text-lg font-bold">{businessDetails.name}</h3>
          <p className="text-muted-foreground">{businessDetails.service}</p>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <span className="text-sm">{businessDetails.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{businessDetails.time}</span>
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
}
