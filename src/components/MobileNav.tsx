
import { Link } from "react-router-dom";
import { 
  Bell, 
  BookOpenCheck, 
  Home,
  MapPin, 
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  onClose: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/bookings", label: "My Bookings", icon: BookOpenCheck },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/account", label: "Account", icon: User },
  ];

  return (
    <div className="flex flex-col gap-6 py-6 h-full">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="w-full justify-start"
            onClick={onClose}
            asChild
          >
            <Link to={item.href} className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h4 className="px-4 text-sm font-medium">Popular Locations</h4>
        <div className="space-y-1">
          {["Ahmedabad", "Delhi", "Mumbai", "Bangalore"].map((city) => (
            <Button
              key={city}
              variant="ghost"
              className="w-full justify-start"
              onClick={onClose}
              asChild
            >
              <Link to={`/?location=${city}`} className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                {city}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto space-y-4">
        <Separator />
        <div className="px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Quick-Queue-Loco</p>
          <p>Skip the wait, live your life</p>
        </div>
      </div>
    </div>
  );
}
