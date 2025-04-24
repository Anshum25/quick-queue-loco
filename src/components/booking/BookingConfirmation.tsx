
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Business, Department, Service } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface BookingConfirmationProps {
  business: Business;
  selectedDepartment: Department | null;
  service: Service | undefined;
  currentWaitTime: number;
  currentQueueLength: number;
  form: UseFormReturn<{
    urgencyLevel: "low" | "medium" | "high";
    specialRequirements: string;
    preferredContactMethod: "phone" | "email" | "sms";
    contactInfo: string;
  }>;
  isSubmitting: boolean;
  onSubmit: (businessName: string, values: any) => void;
}

export function BookingConfirmation({
  business,
  selectedDepartment,
  service,
  currentWaitTime,
  currentQueueLength,
  form,
  isSubmitting,
  onSubmit,
}: BookingConfirmationProps) {
  const formValues = form.getValues();
  
  const getUrgencyLabel = () => {
    switch(formValues.urgencyLevel) {
      case "low": return "Low - Not urgent";
      case "medium": return "Medium - Standard";
      case "high": return "High - Urgent";
      default: return "Medium";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-primary/10">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">{business.name}</h3>
            {selectedDepartment && (
              <p className="text-sm text-muted-foreground">
                Department: {selectedDepartment.name}
              </p>
            )}
            {service && (
              <p className="text-sm">
                Service: <span className="font-medium">{service.name}</span> - ₹{service.price}
              </p>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Queue: {currentQueueLength}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Wait: ~{currentWaitTime} mins</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Your Information</h4>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div className="text-muted-foreground">Urgency:</div>
              <div>{getUrgencyLabel()}</div>

              <div className="text-muted-foreground">Contact via:</div>
              <div className="capitalize">{formValues.preferredContactMethod}</div>

              <div className="text-muted-foreground">Contact info:</div>
              <div>{formValues.contactInfo}</div>

              {formValues.specialRequirements && (
                <>
                  <div className="text-muted-foreground col-span-2 mt-1">Special requirements:</div>
                  <div className="col-span-2 bg-muted/50 p-2 rounded text-xs">
                    {formValues.specialRequirements}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={() => onSubmit(business.name, formValues)}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Confirm Booking"
        )}
      </Button>
    </div>
  );
}
