import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { BusinessList } from "@/components/BusinessList";
import { getBusinessesByCategory } from "@/lib/data";
import { BusinessCategory, LocationInfo } from "@/lib/types";
import { locations } from "@/lib/data";
import { Footer } from "@/components/Footer";

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
        
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Join Quick-Queue-Loco Today</h2>
            <p className="text-muted-foreground">Skip the wait and manage your time better</p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/register">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">
                  <LogIn className="mr-2 h-5 w-5" />
                  Log In
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
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
      
      <Footer />
    </div>
  );
};

export default Index;
