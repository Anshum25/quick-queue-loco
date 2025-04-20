import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, User, LogIn, UserPlus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LocationInfo } from "@/lib/types";
import { LocationSelector } from "@/components/LocationSelector";
import { MobileNav } from "@/components/MobileNav";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  selectedLocation: LocationInfo | null;
  onLocationChange: (location: LocationInfo) => void;
}

export function Navbar({ selectedLocation, onLocationChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="border-b sticky top-0 z-30 bg-background">
      <div className="container flex h-16 items-center px-4 sm:justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>Quick-Queue-Loco</SheetTitle>
                <SheetDescription>Skip the wait, live your life</SheetDescription>
              </SheetHeader>
              <MobileNav onClose={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/20 h-9 w-9 rounded-md flex items-center justify-center">
              <span className="text-lg font-bold text-primary">Q</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">Quick-Queue-Loco</span>
          </Link>
        </div>
        
        <div className="flex-1 flex justify-end md:justify-center">
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="text-sm font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent">Home</Link>
            <Link to="/bookings" className="text-sm font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent">My Bookings</Link>
            <Link to="/notifications" className="text-sm font-medium transition-colors px-3 py-2 rounded-md hover:bg-accent">Notifications</Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <LocationSelector 
            selectedLocation={selectedLocation} 
            onLocationChange={onLocationChange} 
          />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">2</Badge>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Store className="h-5 w-5" />
                <span className="sr-only">Business Portal</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Business Portal</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/business/login">Business Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/business/register">Register Business</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/business/dashboard">Business Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/customer/login">
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/customer/register">
                <UserPlus className="h-5 w-5" />
                <span className="sr-only">Register</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
