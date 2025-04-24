
import { Badge } from "@/components/ui/badge";
import { BookingStep } from "@/hooks/useQueueBooking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookingStepsProps {
  currentStep: BookingStep;
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      {['selection', 'questionnaire', 'confirmation', 'success'].map((step, index) => (
        <div key={step} className="flex items-center">
          <Badge 
            variant={currentStep === step ? "default" : "outline"}
            className="capitalize"
          >
            {step}
          </Badge>
          {index < 3 && (
            <div className="h-[2px] w-8 bg-muted mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}
