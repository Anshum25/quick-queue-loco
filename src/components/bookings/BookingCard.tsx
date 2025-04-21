
import { QueueBooking } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BookingCardProps {
  booking: QueueBooking;
  businessDetails: {
    name: string;
    service: string;
    address: string;
    time: string;
  };
  isLoading: boolean;
  onCancel: (id: string) => void;
}

export function BookingCard({ booking, businessDetails, isLoading, onCancel }: BookingCardProps) {
  return (
    <Card key={booking.id} className="border-primary/20">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2">Active</Badge>
            <h3 className="text-lg font-bold">{businessDetails.name}</h3>
            <p className="text-muted-foreground">{businessDetails.service}</p>
          </div>
          <div className="bg-primary/10 px-4 py-2 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Your Position</p>
            <p className="text-2xl font-bold text-primary">{booking.position}</p>
          </div>
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
          onClick={() => onCancel(booking.id)}
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-2" />
          {isLoading ? "Cancelling..." : "Cancel Booking"}
        </Button>
      </CardFooter>
    </Card>
  );
}
