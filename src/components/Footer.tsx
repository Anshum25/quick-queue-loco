
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick-Queue-Loco</h3>
            <p className="text-sm text-muted-foreground">
              Skip the wait and manage your time better with our innovative queue management system.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-web" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About the Web
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Information
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/business/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Register Business
                </Link>
              </li>
              <li>
                <Link to="/customer/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Customer Sign Up
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                Email: support@quickqueueloco.com
              </li>
              <li className="text-sm text-muted-foreground">
                Phone: (555) 123-4567
              </li>
              <li className="text-sm text-muted-foreground">
                Hours: Mon-Fri 9am-5pm
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Quick-Queue-Loco. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
