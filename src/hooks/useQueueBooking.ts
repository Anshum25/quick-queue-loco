
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { QueueBooking } from "@/lib/types";

export type BookingStep = "selection" | "questionnaire" | "confirmation" | "success";

export interface BookingData {
  id: string;
  qrCodeUrl: string;
  position: number;
  estimatedTime: number;
  appointmentDate?: Date;
  appointmentTime?: string;
}

export function useQueueBooking() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("selection");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [appointmentTime, setAppointmentTime] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const generateBookingId = (): string => {
    const prefix = Math.random().toString(36).substring(2, 5).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = (businessName: string, values?: any) => {
    setIsSubmitting(true);
    
    // Generate a unique booking ID
    const bookingId = generateBookingId();
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Create booking data with QR code URL
      setBookingData({
        id: bookingId,
        qrCodeUrl: `https://api.quickqueueapp.com/qr/${bookingId}`,
        position: 1,
        estimatedTime: 30,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime
      });
      
      setCurrentStep("success");
      
      toast({
        title: "Queue spot booked!",
        description: `You're in line at ${businessName}`,
        duration: 5000,
      });
    }, 1500);
  };

  return {
    currentStep,
    setCurrentStep,
    isSubmitting,
    setIsSubmitting,
    bookingData,
    handleSubmit,
    appointmentDate,
    setAppointmentDate,
    appointmentTime,
    setAppointmentTime
  };
}
