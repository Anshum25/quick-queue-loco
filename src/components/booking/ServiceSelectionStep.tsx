
import { Business, Department, Service } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users, Clock } from "lucide-react";
import { DepartmentSelector } from "@/components/DepartmentSelector";
import { DateTimePicker } from "./DateTimePicker";

interface ServiceSelectionStepProps {
  business: Business;
  selectedService: string;
  setSelectedService: (value: string) => void;
  selectedDepartment: Department | null;
  setSelectedDepartment: (department: Department | null) => void;
  currentQueueLength: number;
  currentWaitTime: number;
  onProceed: () => void;
  hasDepartments: boolean;
  appointmentDate: Date | undefined;
  setAppointmentDate: (date: Date | undefined) => void;
  appointmentTime: string | undefined;
  setAppointmentTime: (time: string | undefined) => void;
}

export function ServiceSelectionStep({
  business,
  selectedService,
  setSelectedService,
  selectedDepartment,
  setSelectedDepartment,
  currentQueueLength,
  currentWaitTime,
  onProceed,
  hasDepartments,
  appointmentDate,
  setAppointmentDate,
  appointmentTime,
  setAppointmentTime
}: ServiceSelectionStepProps) {
  const service = business.services?.find(s => s.id === selectedService);

  return (
    <div className="space-y-4">
      {hasDepartments && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Department</label>
          <DepartmentSelector
            departments={business.departments || []}
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
          </div>
        </div>
      )}

      <DateTimePicker
        date={appointmentDate}
        setDate={setAppointmentDate}
        time={appointmentTime}
        setTime={setAppointmentTime}
      />

      <Button 
        onClick={onProceed}
        disabled={(hasDepartments && !selectedDepartment) || !appointmentDate || !appointmentTime}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
}
