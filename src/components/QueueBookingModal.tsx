
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface QueueBookingModalProps {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
  selectedDepartment?: Department | null;
}

// Define the schema for the booking questionnaire
const bookingQuestionnaireSchema = z.object({
  urgencyLevel: z.enum(["low", "medium", "high"], {
    required_error: "Please select urgency level",
  }),
  specialRequirements: z.string().optional(),
  preferredContactMethod: z.enum(["phone", "email", "sms"], {
    required_error: "Please select contact method",
  }),
  contactInfo: z.string().min(3, "Contact information is required"),
});

type BookingQuestionnaireValues = z.infer<typeof bookingQuestionnaireSchema>;

export function QueueBookingModal({
  business,
  isOpen,
  onClose,
  selectedDepartment: initialSelectedDepartment = null,
}: QueueBookingModalProps) {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(initialSelectedDepartment);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<"selection" | "questionnaire" | "confirmation">("selection");
  
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
  
  // Initialize the form
  const form = useForm<BookingQuestionnaireValues>({
    resolver: zodResolver(bookingQuestionnaireSchema),
    defaultValues: {
      urgencyLevel: "medium",
      specialRequirements: "",
      preferredContactMethod: "phone",
      contactInfo: "",
    },
  });

  const handleProceedToQuestionnaire = () => {
    // Only proceed if required selections are made
    if ((hasDepartments && !selectedDepartment) || 
        (business.services && business.services.length > 0 && !selectedService)) {
      toast({
        title: "Required selection missing",
        description: hasDepartments ? "Please select a department" : "Please select a service",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep("questionnaire");
  };

  const handleProceedToConfirmation = () => {
    setCurrentStep("confirmation");
  };

  const handleSubmit = (values?: BookingQuestionnaireValues) => {
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
      
      if (values) {
        bookingDescription += `. Priority: ${values.urgencyLevel}. We'll contact you via ${values.preferredContactMethod}.`;
      } else {
        bookingDescription += `. We'll notify you when your turn is approaching.`;
      }
      
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
    setSelectedDepartment(initialSelectedDepartment);
    setSelectedService("");
    setCurrentStep("selection");
    form.reset();
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

        {currentStep === "selection" && (
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
        )}

        {currentStep === "questionnaire" && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleProceedToConfirmation)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="urgencyLevel"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>How urgent is your visit?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="urgency-low" />
                          <Label htmlFor="urgency-low">Not urgent - routine visit</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="urgency-medium" />
                          <Label htmlFor="urgency-medium">Somewhat urgent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="urgency-high" />
                          <Label htmlFor="urgency-high">Very urgent</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any special requirements or notes?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="E.g., wheelchair access, language preferences, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This helps us prepare for your visit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredContactMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred contact method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contact method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact information</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={field.value === "email" ? "Email address" : "Phone number"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      We'll use this to notify you about your queue status.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        )}

        {currentStep === "confirmation" && (
          <div className="space-y-4 py-4">
            <div className="bg-muted/30 p-4 rounded-md space-y-3">
              <h3 className="font-medium text-lg">Booking Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Business:</span>
                  <span className="col-span-2 font-medium">{business.name}</span>
                </div>
                
                {selectedDepartment && (
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="col-span-2 font-medium">{selectedDepartment.name}</span>
                  </div>
                )}
                
                {service && (
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="col-span-2 font-medium">{service.name} (₹{service.price})</span>
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Wait Time:</span>
                  <span className="col-span-2 font-medium">{currentWaitTime} mins (approx)</span>
                </div>
                
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Queue Position:</span>
                  <span className="col-span-2 font-medium">#{currentQueueLength + 1}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Urgency:</span>
                  <span className="col-span-2 font-medium capitalize">{form.getValues().urgencyLevel}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground">Contact Via:</span>
                  <span className="col-span-2 font-medium capitalize">{form.getValues().preferredContactMethod}</span>
                </div>
                
                {form.getValues().specialRequirements && (
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-muted-foreground">Notes:</span>
                    <span className="col-span-2 italic">{form.getValues().specialRequirements}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
              <p className="text-sm text-amber-800">
                By confirming this booking, you agree to arrive on time for your appointment. 
                Missing your slot may result in being moved to the end of the queue.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {currentStep === "selection" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleProceedToQuestionnaire}
                disabled={isSubmitting || (hasDepartments && !selectedDepartment)}
                className="w-full"
              >
                Continue
              </Button>
            </>
          )}

          {currentStep === "questionnaire" && (
            <>
              <Button variant="outline" onClick={() => setCurrentStep("selection")}>
                Back
              </Button>
              <Button 
                onClick={form.handleSubmit(handleProceedToConfirmation)}
                disabled={isSubmitting}
                className="w-full"
              >
                Review Booking
              </Button>
            </>
          )}

          {currentStep === "confirmation" && (
            <>
              <Button variant="outline" onClick={() => setCurrentStep("questionnaire")}>
                Back
              </Button>
              <Button 
                onClick={() => handleSubmit(form.getValues())}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
