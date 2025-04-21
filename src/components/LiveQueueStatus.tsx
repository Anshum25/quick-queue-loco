import { Department } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, AlertTriangle } from "lucide-react";

interface LiveQueueStatusProps {
  department: Department;
}

export function LiveQueueStatus({ department }: LiveQueueStatusProps) {
  if (!department) {
    return (
      <div className="border rounded-md p-4">
        <p>No department selected</p>
      </div>
    );
  }
  
  const queuePercentage = Math.min((department.queueLength / 25) * 100, 100);
  
  // Determine status color based on queue length
  const getStatusColor = () => {
    if (department.queueLength <= 5) return "text-green-500";
    if (department.queueLength <= 15) return "text-amber-500";
    return "text-red-500";
  };

  const getStatusBackground = () => {
    if (department.queueLength <= 5) return "bg-green-50 border-green-100";
    if (department.queueLength <= 15) return "bg-amber-50 border-amber-100";
    return "bg-red-50 border-red-100";
  };
  
  const StatusIcon = () => {
    if (department.queueLength > 15) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };
  
  return (
    <div className={`rounded-md p-4 space-y-4 transition-all duration-300 hover:shadow-md animate-fade-in dark:bg-gray-800 ${getStatusBackground()}`}>
      <div className="flex justify-between items-center">
        <h3 className="font-medium dark:text-white">{department.name}</h3>
        <div className="flex items-center gap-1">
          <StatusIcon />
          <span className={`${getStatusColor()} text-sm font-medium transition-colors duration-300`}>
            {department.queueLength <= 5 
              ? "Low Traffic" 
              : department.queueLength <= 15 
                ? "Moderate" 
                : "Busy"}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-700 rounded-md p-3 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium dark:text-gray-200">Queue Length</span>
          </div>
          <p className="text-2xl font-bold dark:text-white">{department.queueLength}</p>
          <p className="text-xs text-muted-foreground dark:text-gray-400">people waiting</p>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-md p-3 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium dark:text-gray-200">Wait Time</span>
          </div>
          <p className="text-2xl font-bold dark:text-white">{department.waitTime}</p>
          <p className="text-xs text-muted-foreground dark:text-gray-400">minutes approx.</p>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm dark:text-gray-200">Queue Status</span>
          <span className="text-xs text-muted-foreground dark:text-gray-400">{queuePercentage.toFixed(0)}% full</span>
        </div>
        <Progress value={queuePercentage} className="h-2" />
      </div>
      
      {department.queueLength > 15 && (
        <div className="text-xs text-muted-foreground dark:text-gray-400 text-center italic mt-2">
          Consider booking at a less busy time for shorter wait
        </div>
      )}
    </div>
  );
}
