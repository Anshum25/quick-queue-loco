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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      content: [
        "Join virtual queues from anywhere",
        "Receive real-time updates",
        "Get notified when your turn approaches",
        "View estimated wait times"
      ]
    },
    {
      title: "For Businesses",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      content: [
        "Manage queues efficiently",
        "Track customer flow",
        "Reduce wait times",
        "Improve customer satisfaction"
      ]
    },
    {
      title: "How It Works",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      content: [
        "Choose your service provider",
        "Join the virtual queue",
        "Get real-time updates",
        "Arrive just in time"
      ]
    }
  ];

  const howItWorksSteps = [
    {
      title: "Select Service",
      description: "Browse and choose from our wide range of service providers in your area",
      icon: "1",
      color: "bg-primary"
    },
    {
      title: "Join Queue",
      description: "Join the virtual queue with a single click and receive your position",
      icon: "2",
      color: "bg-secondary"
    },
    {
      title: "Get Updates",
      description: "Receive real-time updates about your position and estimated wait time",
      icon: "3",
      color: "bg-primary"
    },
    {
      title: "Arrive on Time",
      description: "Show up just before your turn, saving valuable time",
      icon: "4",
      color: "bg-secondary"
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

        <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
              Why Choose Quick-Queue-Loco?
            </h2>
            <Carousel className="max-w-5xl mx-auto" opts={{
              align: "start",
              loop: true,
              duration: 30,
              skipSnaps: false,
              dragFree: true,
              watchDrag: false
            }}>
              <CarouselContent>
                {informationSlides.map((slide, index) => (
                  <CarouselItem key={index} className="md:basis-1/1">
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                      <div className="relative overflow-hidden rounded-lg group animate-scale-in">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 transition-opacity duration-300 group-hover:opacity-0" />
                      </div>
                      <div className="space-y-6 animate-fade-in">
                        <h3 className="text-2xl font-semibold">{slide.title}</h3>
                        <ul className="space-y-4">
                          {slide.content.map((item, itemIndex) => (
                            <li 
                              key={itemIndex} 
                              className="flex items-center text-muted-foreground animate-slide-in-right"
                              style={{ animationDelay: `${itemIndex * 0.1}s` }}
                            >
                              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-light" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-4 animate-fade-in">How It Works</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto animate-fade-in">
              Join thousands of satisfied customers who save time every day with our virtual queue system
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative p-6 rounded-lg bg-card border animate-scale-in hover-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute -top-4 -left-4 w-8 h-8 ${step.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
