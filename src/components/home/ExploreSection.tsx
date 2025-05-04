
import { BusinessCategory, Business } from "@/lib/types";
import { CategoryFilter } from "@/components/CategoryFilter";
import { BusinessList } from "@/components/BusinessList";
import { PremiumFeatures } from "./PremiumFeatures";
import { SubscriptionPlans } from "./SubscriptionPlans";
import { AdBanner } from "./AdBanner";

interface ExploreSectionProps {
  selectedCategory: BusinessCategory | null;
  onCategoryChange: (category: BusinessCategory | null) => void;
  businesses: Business[];
}

export function ExploreSection({ 
  selectedCategory, 
  onCategoryChange, 
  businesses 
}: ExploreSectionProps) {
  return (
    <section id="explore" className="py-12">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory 
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s near you` 
            : "All Services near you"}
        </h2>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        
        <AdBanner />
        
        <BusinessList 
          businesses={businesses}
          selectedCategory={selectedCategory}
        />
        
        <PremiumFeatures />
        
        <SubscriptionPlans />
      </div>
    </section>
  );
}
