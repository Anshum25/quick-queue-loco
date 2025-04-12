
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryIcons, categoryLabels } from "@/lib/data";
import { BusinessCategory } from "@/lib/types";

interface HeroSectionProps {
  onCategorySelect: (category: BusinessCategory) => void;
}

export function HeroSection({ onCategorySelect }: HeroSectionProps) {
  const featuredCategories: BusinessCategory[] = [
    "restaurant",
    "hospital",
    "salon",
    "bank",
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-8 pb-12">
      <div className="container px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Skip the Wait,
            <span className="block text-primary">Live Your Life</span>
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Book your spot in line remotely and get notified when your turn is approaching.
            Save time at restaurants, hospitals, salons, and more.
          </p>
          
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="bg-background/60 backdrop-blur-sm flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border border-primary/20">
              <MapPin className="h-4 w-4 text-primary location-animation" />
              <span>Ahmedabad</span>
            </div>
            
            <Button asChild>
              <a href="#explore">Explore Services</a>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {featuredCategories.map((category) => (
            <div 
              key={category}
              className="bg-card rounded-lg p-4 text-center space-y-3 cursor-pointer hover:shadow-md transition-all"
              onClick={() => onCategorySelect(category)}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl" role="img" aria-label={category}>
                  {categoryIcons[category]}
                </span>
              </div>
              <h3 className="font-medium">{categoryLabels[category]}</h3>
              <p className="text-xs text-muted-foreground">
                {getTaglineForCategory(category)}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </div>
  );
}

function getTaglineForCategory(category: BusinessCategory): string {
  switch (category) {
    case "restaurant":
      return "Secure your table without waiting";
    case "hospital":
      return "Schedule checkups efficiently";
    case "salon":
      return "Book beauty treatments in advance";
    case "government":
      return "Handle paperwork without the wait";
    case "repair":
      return "Schedule repairs at your convenience";
    case "bank":
      return "Skip banking queues completely";
    default:
      return "Join the queue remotely";
  }
}
