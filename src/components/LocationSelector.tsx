
import { useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
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
import { locations } from "@/lib/data";
import { LocationInfo } from "@/lib/types";

interface LocationSelectorProps {
  selectedLocation: LocationInfo | null;
  onLocationChange: (location: LocationInfo) => void;
}

export function LocationSelector({ 
  selectedLocation, 
  onLocationChange 
}: LocationSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-between border-primary/20 bg-primary/5"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary animate-pulse" />
            {selectedLocation ? (
              <span>{selectedLocation.city}</span>
            ) : (
              <span className="text-muted-foreground">Select location...</span>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.city}
                  value={location.city}
                  onSelect={() => {
                    onLocationChange(location);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLocation?.city === location.city
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {location.city}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
