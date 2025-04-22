
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(locations[0]);
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  const businesses = getBusinessesByCategory(selectedCategory);

  const handleCategorySelect = (category: BusinessCategory) => {
    setSelectedCategory(category);
    
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.title = "Quick-Queue-Loco | Skip the Wait";
  }, []);

  const informationSlides = [
    {
      title: "For Customers",
      content: [
        "Join virtual queues from anywhere",
        "Receive real-time updates",
        "Get notified when your turn approaches",
        "View estimated wait times"
      ]
    },
    {
      title: "For Businesses",
      content: [
        "Manage queues efficiently",
        "Track customer flow",
        "Reduce wait times",
        "Improve customer satisfaction"
      ]
    },
    {
      title: "How It Works",
      content: [
        "Choose your service provider",
        "Join the virtual queue",
        "Get real-time updates",
        "Arrive just in time"
      ]
    }
  ];

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

        <section className="py-12 bg-secondary/10">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Quick-Queue-Loco?</h2>
            <Carousel className="max-w-3xl mx-auto">
              <CarouselContent>
                {informationSlides.map((slide, index) => (
                  <CarouselItem key={index} className="md:basis-1/1">
                    <div className="p-6 bg-card rounded-lg shadow-sm space-y-4">
                      <h3 className="text-2xl font-semibold text-center">{slide.title}</h3>
                      <ul className="space-y-2">
                        {slide.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-muted-foreground">
                            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
