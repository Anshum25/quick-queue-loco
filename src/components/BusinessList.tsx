
import { useState } from "react";
import { Business, BusinessCategory } from "@/lib/types";
import { BusinessCard } from "@/components/BusinessCard";
import { SearchFilters, FilterOptions, SortOption } from "@/components/SearchFilters";

interface BusinessListProps {
  businesses: Business[];
  selectedCategory: BusinessCategory | null;
}

export function BusinessList({ businesses, selectedCategory }: BusinessListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("distance");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    maxDistance: 5,
    minRating: 3,
    maxWaitTime: 60
  });

  // Reset filters to default
  const handleResetFilters = () => {
    setFilterOptions({
      maxDistance: 5,
      minRating: 3,
      maxWaitTime: 60
    });
  };

  // Filter businesses based on search query and filter options
  const filteredBusinesses = businesses.filter((business) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      business.name.toLowerCase().includes(searchLower) ||
      business.address.toLowerCase().includes(searchLower) ||
      business.category.toLowerCase().includes(searchLower);
    
    // Filter by distance, rating and wait time
    const matchesDistance = business.distance <= filterOptions.maxDistance;
    const matchesRating = business.rating >= filterOptions.minRating;
    const matchesWaitTime = business.waitTime <= filterOptions.maxWaitTime;

    return matchesSearch && matchesDistance && matchesRating && matchesWaitTime;
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
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        onResetFilters={handleResetFilters}
      />

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
