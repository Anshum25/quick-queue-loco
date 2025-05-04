
import { UseFormReturn } from "react-hook-form";
import { Business } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Calendar, User, Phone } from "lucide-react";
import { format } from "date-fns";

// Type for booking questionnaire form
export type QuestionnaireFormValues = {
  urgencyLevel: "high" | "low" | "medium";
  specialRequirements: string;
  preferredContactMethod: "email" | "phone" | "sms";
  contactInfo: string;
};

interface BookingConfirmationProps {
  business: Business;
  selectedDepartment: any;
  service: any;
  currentWaitTime: number;
  currentQueueLength: number;
  form: UseFormReturn<QuestionnaireFormValues>;
  isSubmitting: boolean;
  onSubmit: (businessName: string, formValues: any) => void;
  appointmentDate?: Date;
  appointmentTime?: string;
}

export function BookingConfirmation({
  business,
  selectedDepartment,
  service,
  currentWaitTime,
  currentQueueLength,
  form,
  appointmentDate,
  appointmentTime
}: BookingConfirmationProps) {
  const formValues = form.getValues();
  const serviceName = service ? service.name : (selectedDepartment ? selectedDepartment.name : "General Queue");
  const urgencyLabels = {
    low: "Low Priority",
    medium: "Standard Priority",
    high: "High Priority"
  };
  
  const contactMethodLabels = {
    phone: "Phone call",
    sms: "SMS",
    email: "Email"
  };

  return (
    <div className="space-y-4 py-4">
      <h3 className="text-lg font-medium">Booking Summary</h3>
      
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Business</span>
            <span className="font-medium">{business.name}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium">{serviceName}</span>
          </div>
          
          {service && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">₹{service.price}</span>
            </div>
          )}

          <Separator />
          
          {appointmentDate && (
            <div className="flex gap-3 items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm">Appointment Date</div>
                <div className="font-medium">{format(appointmentDate, "PPP")}</div>
              </div>
            </div>
          )}
          
          {appointmentTime && (
            <div className="flex gap-3 items-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm">Appointment Time</div>
                <div className="font-medium">{appointmentTime}</div>
              </div>
            </div>
          )}

          <div className="flex gap-3 items-center">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm">Estimated Wait Time</div>
              <div className="font-medium">{currentWaitTime} minutes</div>
            </div>
          </div>
          
          <div className="flex gap-3 items-center">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm">Queue Position</div>
              <div className="font-medium">{currentQueueLength + 1}</div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm">Location</div>
              <div className="font-medium">{business.address}</div>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Urgency Level</div>
              <div className="font-medium">{urgencyLabels[formValues.urgencyLevel]}</div>
            </div>
            
            {formValues.specialRequirements && (
              <div>
                <div className="text-sm text-muted-foreground">Special Requirements</div>
                <div>{formValues.specialRequirements}</div>
              </div>
            )}
            
            <div className="flex gap-3 items-center">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm">Contact Preference</div>
                <div className="font-medium">
                  {contactMethodLabels[formValues.preferredContactMethod]} ({formValues.contactInfo})
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
