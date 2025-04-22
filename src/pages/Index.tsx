
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { BusinessCategory, LocationInfo } from "@/lib/types";
import { getBusinessesByCategory } from "@/lib/data";
import { locations } from "@/lib/data";
import { JoinSection } from "@/components/home/JoinSection";
import { CarouselSection } from "@/components/home/CarouselSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ExploreSection } from "@/components/home/ExploreSection";

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
        <JoinSection />
        <ExploreSection 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          businesses={businesses}
        />
        <CarouselSection slides={informationSlides} />
        <HowItWorksSection steps={howItWorksSteps} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
