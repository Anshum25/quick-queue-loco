
import { useState } from "react";
import { Business, BusinessCategory } from "@/lib/types";
import { BusinessCard } from "@/components/BusinessCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface BusinessListProps {
  businesses: Business[];
  selectedCategory: BusinessCategory | null;
}

export function BusinessList({ businesses, selectedCategory }: BusinessListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("distance");

  // Filter businesses by search query
  const filteredBusinesses = businesses.filter((business) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      business.name.toLowerCase().includes(searchLower) ||
      business.address.toLowerCase().includes(searchLower)
    );
  });

  // Sort businesses based on selected option
  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    switch (sortOption) {
      case "distance":
        return a.distance - b.distance;
      case "waitTime":
        return a.waitTime - b.waitTime;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
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
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="waitTime">Wait Time</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sortedBusinesses.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No businesses found</h3>
          <p className="text-muted-foreground mt-1">
            Try changing your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </div>
  );
}
