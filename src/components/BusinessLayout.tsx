
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Users, 
  Clock, 
  Settings, 
  Store, 
  LogIn 
} from "lucide-react";

interface BusinessLayoutProps {
  children: ReactNode;
}

export function BusinessLayout({ children }: BusinessLayoutProps) {
  // For demo purposes, using a flag to simulate authentication
  // In a real app, this would be handled by your auth system
  const isAuthenticated = true;
  
  // Sidebar navigation items
  const navItems = [
    { icon: Building2, label: "Dashboard", href: "/business/dashboard" },
    { icon: Users, label: "Customers", href: "/business/customers" },
    { icon: Clock, label: "Queue Management", href: "/business/queue" },
    { icon: Settings, label: "Settings", href: "/business/settings" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Store className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-2xl font-bold">Business Portal</h1>
          <p className="text-muted-foreground max-w-md">
            Please sign in to access your business dashboard.
          </p>
          <Button asChild>
            <Link to="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r">
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/20 h-8 w-8 rounded-md flex items-center justify-center">
              <span className="text-lg font-bold text-primary">Q</span>
            </div>
            <span className="font-bold">Business Portal</span>
          </Link>
        </div>
        <Separator />
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Button 
                  variant="ghost" 
                  asChild 
                  className="w-full justify-start"
                >
                  <Link to={item.href}>
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/">
              View Customer App
            </Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden border-b">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary/20 h-8 w-8 rounded-md flex items-center justify-center">
                <span className="text-lg font-bold text-primary">Q</span>
              </div>
              <span className="font-bold">Business Portal</span>
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
