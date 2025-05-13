
type BusinessOperatingHoursProps = {
  // Could add customizable hours in the future
};

export const BusinessOperatingHours = ({}: BusinessOperatingHoursProps) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-muted-foreground">Monday - Friday</span>
      <span>9:00 AM - 6:00 PM</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Saturday</span>
      <span>10:00 AM - 4:00 PM</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Sunday</span>
      <span>Closed</span>
    </div>
  </div>
);
