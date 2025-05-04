
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSteps } from "./booking/BookingSteps";
import { ServiceSelectionStep } from "./booking/ServiceSelectionStep";
import { QRCodeDisplay } from "./QRCodeDisplay";
import { useQueueBooking } from "@/hooks/useQueueBooking";
import { BookingQuestionnaire } from "./booking/BookingQuestionnaire";
import { BookingConfirmation, QuestionnaireFormValues } from "./booking/BookingConfirmation";
import { ConfirmationStep } from "./booking/ConfirmationStep";

// Define the schema for the booking questionnaire
const bookingQuestionnaireSchema = z.object({
  urgencyLevel: z.enum(["low", "medium", "high"], {
    required_error: "Please select urgency level"
  }),
  specialRequirements: z.string().optional(),
  preferredContactMethod: z.enum(["phone", "email", "sms"], {
    required_error: "Please select contact method"
  }),
  contactInfo: z.string().min(3, "Contact information is required")
});

export function QueueBookingModal({ business, isOpen, onClose, selectedDepartment: initialSelectedDepartment = null }) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(initialSelectedDepartment);
  const { currentStep, setCurrentStep, isSubmitting, bookingData, handleSubmit } = useQueueBooking();

  const form = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(bookingQuestionnaireSchema),
    defaultValues: {
      urgencyLevel: "medium",
      specialRequirements: "",
      preferredContactMethod: "phone",
      contactInfo: ""
    }
  });

  // Get departments if this is a hospital
  const departments = business.departments || [];
  
  // Determine if this business has departments
  const hasDepartments = departments.length > 0;
  
  // Get the current queue status (either from department or business)
  const currentQueueLength = selectedDepartment ? selectedDepartment.queueLength : business.queueLength;
  const currentWaitTime = selectedDepartment ? selectedDepartment.waitTime : business.waitTime;

  const handleProceedToQuestionnaire = () => {
    if ((hasDepartments && !selectedDepartment) || (business.services && business.services.length > 0 && !selectedService)) {
      return;
    }
    setCurrentStep("questionnaire");
  };

  const handleProceedToConfirmation = () => {
    setCurrentStep("confirmation");
  };

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
        
        <BookingSteps currentStep={currentStep} />
        
        {currentStep === "selection" && (
          <ServiceSelectionStep
            business={business}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            currentQueueLength={currentQueueLength}
            currentWaitTime={currentWaitTime}
            onProceed={handleProceedToQuestionnaire}
            hasDepartments={hasDepartments}
          />
        )}

        {currentStep === "questionnaire" && (
          <BookingQuestionnaire
            form={form}
            onSubmit={handleProceedToConfirmation}
          />
        )}

        {currentStep === "confirmation" && (
          <ConfirmationStep
            business={business}
            selectedDepartment={selectedDepartment}
            currentWaitTime={currentWaitTime}
            currentQueueLength={currentQueueLength}
            form={form}
            isSubmitting={isSubmitting}
            onBack={() => setCurrentStep("questionnaire")}
            onSubmit={handleSubmit}
          />
        )}

        {currentStep === "success" && bookingData && (
          <div className="space-y-4 py-4 flex flex-col items-center">
            <QRCodeDisplay
              qrData={bookingData.qrCodeUrl}
              bookingId={bookingData.id}
              businessName={business.name}
            />
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
              <Button
                variant="outline"
                onClick={() => setCurrentStep("selection")}
              >
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

          {/* No footer buttons here as they are part of the ConfirmationStep component now */}

          {currentStep === "success" && (
            <Button
              onClick={handleClose}
              className="w-full"
            >
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
