
import { useState } from "react";
import { Search, MapPin, Star, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type SortOption = "distance" | "waitTime" | "rating";
export type FilterOptions = {
  maxDistance: number;
  minRating: number;
  maxWaitTime: number;
};

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  onResetFilters: () => void;
}

export function SearchFilters({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  filterOptions,
  setFilterOptions,
  onResetFilters
}: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDistanceChange = (value: number[]) => {
    setFilterOptions({ ...filterOptions, maxDistance: value[0] });
  };

  const handleRatingChange = (value: number[]) => {
    setFilterOptions({ ...filterOptions, minRating: value[0] });
  };

  const handleWaitTimeChange = (value: number[]) => {
    setFilterOptions({ ...filterOptions, maxWaitTime: value[0] });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search businesses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="waitTime">Wait Time</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="sm"
          className="md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Distance Filter */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Max Distance
              </Label>
              <span className="text-sm">{filterOptions.maxDistance} km</span>
            </div>
            <Slider
              value={[filterOptions.maxDistance]}
              min={1}
              max={10}
              step={1}
              onValueChange={handleDistanceChange}
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                Min Rating
              </Label>
              <span className="text-sm">{filterOptions.minRating.toFixed(1)}</span>
            </div>
            <Slider
              value={[filterOptions.minRating]}
              min={1}
              max={5}
              step={0.5}
              onValueChange={handleRatingChange}
            />
          </div>

          {/* Wait Time Filter */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Max Wait Time
              </Label>
              <span className="text-sm">{filterOptions.maxWaitTime} mins</span>
            </div>
            <Slider
              value={[filterOptions.maxWaitTime]}
              min={10}
              max={120}
              step={10}
              onValueChange={handleWaitTimeChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onResetFilters}
          >
            Reset Filters
          </Button>
        </div>

        <Separator />
      </div>
    </div>
  );
}
