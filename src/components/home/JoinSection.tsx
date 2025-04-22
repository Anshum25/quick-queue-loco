
import { Link } from "react-router-dom";
import { UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JoinSection() {
  return (
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
  );
}
