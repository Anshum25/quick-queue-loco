
import { MapPin, Clock, Users, Star } from "lucide-react";

type BusinessMetricsProps = {
  address: string;
  rating: number;
  waitTime: number;
  queueLength: number;
};

export const BusinessMetrics = ({ 
  address, 
  rating, 
  waitTime, 
  queueLength 
}: BusinessMetricsProps) => {
  // Determine wait time color
  const getWaitTimeColor = () => {
    if (waitTime <= 15) return "text-green-500";
    if (waitTime <= 30) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>{address}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="font-medium">{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span className={`font-medium ${getWaitTimeColor()}`}>
            {waitTime} min wait
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span className="font-medium">{queueLength} in queue</span>
        </div>
      </div>
    </div>
  );
};
