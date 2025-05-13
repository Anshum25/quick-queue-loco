
import { Department } from "@/lib/types";
import { DepartmentSelector } from "@/components/DepartmentSelector";

type BusinessDepartmentsProps = {
  departments: Department[];
  selectedDepartment: Department | null;
  onDepartmentSelect: (department: Department) => void;
};

export const BusinessDepartments = ({ 
  departments, 
  selectedDepartment, 
  onDepartmentSelect 
}: BusinessDepartmentsProps) => {
  if (!departments || departments.length === 0) return null;
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Departments</h2>
      <DepartmentSelector
        departments={departments}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={onDepartmentSelect}
      />
    </div>
  );
};
