
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
import { Business, Service, Department } from "@/lib/types";
import { Clock, Users, Building2 } from "lucide-react";
import { DepartmentSelector } from "./DepartmentSelector";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getDepartmentsForHospital } from "@/lib/data-departments";

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
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get departments if this is a hospital
  const departments = business.category === "hospital" 
    ? getDepartmentsForHospital(business.id)
    : [];

  // Find selected service details
  const service = business.services?.find(s => s.id === selectedService);
  
  // Determine if this business has departments (hospital-like)
  const hasDepartments = departments.length > 0;
  
  // Get the current queue status (either from department or business)
  const currentQueueLength = selectedDepartment ? selectedDepartment.queueLength : business.queueLength;
  const currentWaitTime = selectedDepartment ? selectedDepartment.waitTime : business.waitTime;
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      
      let bookingDescription = `You're in line at ${business.name}`;
      if (selectedDepartment) {
        bookingDescription += ` (${selectedDepartment.name} department)`;
      }
      if (service) {
        bookingDescription += ` for ${service.name}`;
      }
      bookingDescription += `. We'll notify you when your turn is approaching.`;
      
      // Show success toast
      toast({
        title: "Queue spot booked!",
        description: bookingDescription,
        duration: 5000,
      });
    }, 1500);
  };

  // Reset selected department when modal closes
  const handleClose = () => {
    setSelectedDepartment(null);
    setSelectedService("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Queue Spot</DialogTitle>
          <DialogDescription>
            Join the queue remotely for {business.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {hasDepartments && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Department</label>
              <DepartmentSelector
                departments={departments}
                selectedDepartment={selectedDepartment}
                onDepartmentChange={setSelectedDepartment}
              />
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col p-3 border rounded-md">
              <span className="text-sm text-muted-foreground mb-1">Current Queue</span>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-lg font-medium">{currentQueueLength} people</span>
              </div>
            </div>
            <div className="flex flex-col p-3 border rounded-md">
              <span className="text-sm text-muted-foreground mb-1">Estimated Wait</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-lg font-medium">{currentWaitTime} mins</span>
              </div>
            </div>
          </div>

          {/* Queue visualization */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Queue Status</span>
              <Badge variant={currentQueueLength > 15 ? "destructive" : "outline"}>
                {currentQueueLength > 15 ? "Busy" : "Available"}
              </Badge>
            </div>
            <Progress
              value={(currentQueueLength / 30) * 100}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              {currentQueueLength > 0 
                ? `You will be number ${currentQueueLength + 1} in line` 
                : "No one ahead of you! Join now for immediate service."}
            </p>
          </div>

          {business.services && business.services.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Service</label>
              <Select 
                value={selectedService} 
                onValueChange={setSelectedService}
                disabled={hasDepartments && !selectedDepartment}
              >
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
              {hasDepartments && !selectedDepartment && (
                <p className="text-xs text-amber-500">Please select a department first</p>
              )}
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

          {/* People ahead counter */}
          {currentQueueLength > 0 && (
            <div className="flex items-center justify-between bg-muted p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>People ahead of you</span>
              </div>
              <span className="font-bold text-lg">{currentQueueLength}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || (hasDepartments && !selectedDepartment)}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
