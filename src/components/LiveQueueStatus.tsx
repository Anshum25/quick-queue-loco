
import { Department } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Users, Clock } from "lucide-react";

interface LiveQueueStatusProps {
  department: Department;
}

export function LiveQueueStatus({ department }: LiveQueueStatusProps) {
  const queuePercentage = Math.min((department.queueLength / 25) * 100, 100);
  
  // Determine status color based on queue length
  const getStatusColor = () => {
    if (department.queueLength <= 5) return "text-green-500";
    if (department.queueLength <= 15) return "text-amber-500";
    return "text-red-500";
  };
  
  return (
    <div className="border rounded-md p-4 space-y-3 transition-all duration-300 hover:shadow-md animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{department.name}</h3>
        <span className={`${getStatusColor()} text-sm font-medium transition-colors duration-300`}>
          {department.queueLength <= 5 
            ? "Low Traffic" 
            : department.queueLength <= 15 
              ? "Moderate" 
              : "Busy"}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1.5 hover:scale-105 transition-transform duration-200">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{department.queueLength} waiting</span>
        </div>
        <div className="flex items-center gap-1.5 hover:scale-105 transition-transform duration-200">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>~{department.waitTime} mins</span>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <Progress value={queuePercentage} className="h-2 transition-all duration-500" />
      </div>
    </div>
  );
}
