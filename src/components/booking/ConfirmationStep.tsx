
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Business } from "@/lib/types";
import { BookingConfirmation } from "./BookingConfirmation";
import { QuestionnaireFormValues } from "./BookingConfirmation";

interface ConfirmationStepProps {
  business: Business;
  selectedDepartment: any;
  currentWaitTime: number;
  currentQueueLength: number;
  form: UseFormReturn<QuestionnaireFormValues>;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (businessName: string, formValues: QuestionnaireFormValues) => void;
  appointmentDate?: Date;
  appointmentTime?: string;
}

export function ConfirmationStep({
  business,
  selectedDepartment,
  currentWaitTime,
  currentQueueLength,
  form,
  isSubmitting,
  onBack,
  onSubmit,
  appointmentDate,
  appointmentTime
}: ConfirmationStepProps) {
  const handleSubmit = () => {
    onSubmit(business.name, form.getValues());
  };

  return (
    <>
      <BookingConfirmation
        business={business}
        selectedDepartment={selectedDepartment}
        service={business.services?.find(s => s.id === business.services?.[0]?.id)}
        currentWaitTime={currentWaitTime}
        currentQueueLength={currentQueueLength}
        form={form}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        appointmentDate={appointmentDate}
        appointmentTime={appointmentTime}
      />
      
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
        <Button
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Processing..." : "Confirm Booking"}
        </Button>
      </div>
    </>
  );
}
