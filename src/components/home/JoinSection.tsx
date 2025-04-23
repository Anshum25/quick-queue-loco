
import { Link } from "react-router-dom";
import { UserPlus, LogIn, QrCode, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JoinSection() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Join Quick-Queue-Loco Today</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Skip the wait and manage your time better with our QR code check-in system, smart recommendations, and premium features
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
          <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
            <QrCode className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold mb-1">QR Check-in</h3>
            <p className="text-sm text-muted-foreground">
              Show your QR code when you arrive to verify your presence instantly
            </p>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
            <Clock className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Smart Recommendations</h3>
            <p className="text-sm text-muted-foreground">
              "Usually free in the morning—book now for 10 AM!" based on your habits
            </p>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center text-center">
            <div className="bg-amber-500/20 p-2 rounded-full mb-2">
              <Award className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="font-semibold mb-1">Premium Access</h3>
            <p className="text-sm text-muted-foreground">
              Get VIP treatment with priority queues and premium features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
