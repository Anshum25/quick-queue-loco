
import { useState } from "react";
import { Check, ChevronDown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Department } from "@/lib/types";

interface DepartmentSelectorProps {
  departments: Department[];
  selectedDepartment: Department | null;
  onDepartmentChange: (department: Department) => void;
  disabled?: boolean;
}

export function DepartmentSelector({ 
  departments = [],
  selectedDepartment, 
  onDepartmentChange,
  disabled = false
}: DepartmentSelectorProps) {
  const [open, setOpen] = useState(false);
  // Safely filter departments, ensuring we have a default empty array if departments is undefined
  const activeDepartments = Array.isArray(departments) 
    ? departments.filter(dept => dept.active)
    : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || activeDepartments.length === 0}
          className="w-full justify-between border-primary/20 bg-primary/5"
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary animate-pulse" />
            {selectedDepartment ? (
              <span>{selectedDepartment.name}</span>
            ) : (
              <span className="text-muted-foreground">Select department...</span>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search department..." />
          <CommandList>
            <CommandEmpty>No department found.</CommandEmpty>
            <CommandGroup>
              {activeDepartments.map((department) => (
                <CommandItem
                  key={department.id}
                  value={department.name}
                  onSelect={() => {
                    onDepartmentChange(department);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedDepartment?.id === department.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{department.name}</span>
                    <span className="text-xs text-muted-foreground">
                      Queue: {department.queueLength} | Wait: {department.waitTime} mins
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
