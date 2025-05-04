
import { Button } from "@/components/ui/button";

export function AdBanner() {
  return (
    <div className="bg-muted/50 p-4 rounded-lg my-6 flex items-center justify-between flex-wrap gap-4">
      <div className="flex-1">
        <h3 className="font-medium">Looking for coffee while you wait?</h3>
        <p className="text-sm text-muted-foreground">Visit Quick Café just across from City Hospital - Show your queue number for 10% off!</p>
      </div>
      <Button size="sm" variant="secondary">Learn More</Button>
    </div>
  );
}
