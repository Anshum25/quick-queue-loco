
import { Department } from "@/lib/types";
import { LiveQueueStatus } from "@/components/LiveQueueStatus";

type BusinessQueueStatusProps = {
  selectedDepartment: Department | null;
  departments: Department[];
  waitTime: number;
};

export const BusinessQueueStatus = ({ 
  selectedDepartment, 
  departments, 
  waitTime 
}: BusinessQueueStatusProps) => {
  // Determine wait time color
  const getWaitTimeColor = () => {
    if (waitTime <= 15) return "text-green-500";
    if (waitTime <= 30) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Queue Status</h2>
      {selectedDepartment ? (
        <LiveQueueStatus department={selectedDepartment} />
      ) : (
        departments && departments.length > 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-2">Select a department to see queue status</p>
            <p className="text-sm">Current overall wait time: <span className={getWaitTimeColor()}>{waitTime} minutes</span></p>
          </div>
        ) : (
          <LiveQueueStatus 
            department={{
              id: "main",
              name: "Main Queue",
              waitTime: waitTime,
              queueLength: departments ? departments.length : 0,
              active: true
            }} 
          />
        )
      )}
    </>
  );
};
