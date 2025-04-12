import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Business, Service } from "@/lib/types";
import { Clock, Users } from "lucide-react";

interface QueueBookingModalProps {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
}

export function QueueBookingModal({
  business,
  isOpen,
  onClose,
}: QueueBookingModalProps) {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = () => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      
      // Show success toast
      toast({
        title: "Queue spot booked!",
        description: `You're in line at ${business.name}. We'll notify you when your turn is approaching.`,
        duration: 5000,
      });
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      
      // Show success toast
      toast({
        title: "Queue spot booked!",
        description: `You're in line at ${business.name}. We'll notify you when your turn is approaching.`,
        duration: 5000,
      });
    }, 1500);
  };

  // Find selected service details
  const service = business.services?.find(s => s.id === selectedService);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Queue Spot</DialogTitle>
          <DialogDescription>
            Join the queue remotely for {business.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-3 border rounded-md">
              <span className="text-sm text-muted-foreground mb-1">Current Queue</span>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-lg font-medium">{business.queueLength} people</span>
              </div>
            </div>
            <div className="flex flex-col p-3 border rounded-md">
              <span className="text-sm text-muted-foreground mb-1">Estimated Wait</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-lg font-medium">{business.waitTime} mins</span>
              </div>
            </div>
          </div>

          {business.services && business.services.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Service</label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {business.services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - ₹{service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {service && (
            <div className="bg-muted/50 p-3 rounded-md space-y-2">
              <h4 className="font-medium">{service.name}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Price:</span>{" "}
                  <span className="font-medium">₹{service.price}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>{" "}
                  <span className="font-medium">{service.duration} mins</span>
                </div>
                {service.category && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Category:</span>{" "}
                    <span className="font-medium">{service.category}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
