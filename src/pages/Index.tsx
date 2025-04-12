
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { BusinessList } from "@/components/BusinessList";
import { getBusinessesByCategory } from "@/lib/data";
import { BusinessCategory, LocationInfo } from "@/lib/types";
import { locations } from "@/lib/data";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(locations[0]);
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  const businesses = getBusinessesByCategory(selectedCategory);

  const handleCategorySelect = (category: BusinessCategory) => {
    setSelectedCategory(category);
    
    // Scroll to the businesses section
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Update page title
    document.title = "Quick-Queue-Loco | Skip the Wait";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        selectedLocation={selectedLocation} 
        onLocationChange={setSelectedLocation} 
      />
      
      <main className="flex-1">
        <HeroSection onCategorySelect={handleCategorySelect} />
        
        <section id="explore" className="py-12">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s near you` 
                : "All Services near you"}
            </h2>
            
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <BusinessList 
              businesses={businesses}
              selectedCategory={selectedCategory}
            />
          </div>
        </section>
      </main>
      
      <footer className="bg-muted py-6">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Quick-Queue-Loco. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
