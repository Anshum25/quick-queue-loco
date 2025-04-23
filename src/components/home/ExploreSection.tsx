
import { BusinessCategory, Business, SubscriptionPlan } from "@/lib/types";
import { CategoryFilter } from "@/components/CategoryFilter";
import { BusinessList } from "@/components/BusinessList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Sparkles, QrCode, Bell } from "lucide-react";

interface ExploreSectionProps {
  selectedCategory: BusinessCategory | null;
  onCategoryChange: (category: BusinessCategory | null) => void;
  businesses: Business[];
}

export function ExploreSection({ selectedCategory, onCategoryChange, businesses }: ExploreSectionProps) {
  // Example subscription plans
  const userSubscriptionPlans = [
    {
      id: "basic",
      name: "Basic",
      price: 0,
      features: ["Join up to 5 queues per day", "Get basic notifications", "Standard queue position"],
      type: "user"
    },
    {
      id: "premium",
      name: "Premium",
      price: 9.99,
      features: ["Unlimited queue bookings", "Priority notifications", "VIP queue access", "Faster alerts"],
      type: "user"
    },
    {
      id: "family",
      name: "Family Plan",
      price: 19.99,
      features: ["Up to 5 family members", "All Premium features", "Family booking coordination", "Shared notifications"],
      type: "user"
    }
  ];
  
  // Featured sections to highlight premium features
  const premiumFeatures = [
    { 
      title: "QR Code Check-in", 
      icon: <QrCode className="h-6 w-6 text-primary" />,
      description: "Show QR to verify your arrival. Businesses can scan to mark your attendance automatically."
    },
    { 
      title: "Smart Queue Recommendations", 
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      description: "Get personalized suggestions based on your behavior and past activity."
    },
    { 
      title: "Priority Notifications", 
      icon: <Bell className="h-6 w-6 text-green-500" />,
      description: "Get faster alerts when your turn is approaching to maximize your time."
    },
    { 
      title: "Premium Business Listings", 
      icon: <Award className="h-6 w-6 text-purple-500" />,
      description: "Partner businesses are highlighted for better visibility and service."
    }
  ];

  return (
    <section id="explore" className="py-12">
      <div className="container px-4">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory 
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s near you` 
            : "All Services near you"}
        </h2>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        
        {/* Ad Section */}
        <div className="bg-muted/50 p-4 rounded-lg my-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1">
            <h3 className="font-medium">Looking for coffee while you wait?</h3>
            <p className="text-sm text-muted-foreground">Visit Quick Café just across from City Hospital - Show your queue number for 10% off!</p>
          </div>
          <Button size="sm" variant="secondary">Learn More</Button>
        </div>
        
        <BusinessList 
          businesses={businesses}
          selectedCategory={selectedCategory}
        />
        
        {/* Premium Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
            Premium Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="bg-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    {feature.icon}
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Subscription Plans */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
            <Tabs defaultValue="user" className="space-y-4">
              <TabsList>
                <TabsTrigger value="user">For Users</TabsTrigger>
                <TabsTrigger value="business">For Businesses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="user" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userSubscriptionPlans.map((plan, index) => (
                    <Card key={index} className={`${plan.id === 'premium' ? 'border-primary' : ''}`}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{plan.name}</CardTitle>
                          {plan.id === 'premium' && (
                            <Badge variant="default">Recommended</Badge>
                          )}
                        </div>
                        <div className="mt-2">
                          <span className="text-3xl font-bold">${plan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-4">Get Started</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="business" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">$29.99</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Queue management for one location
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Basic analytics
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Standard listing visibility
                        </li>
                      </ul>
                      <Button className="w-full mt-4">Get Started</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Premium</CardTitle>
                        <Badge variant="default">Popular</Badge>
                      </div>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">$79.99</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Up to 3 branch locations
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Enhanced visibility with "Priority" badge
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Advanced analytics and reporting
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          QR code check-in functionality
                        </li>
                      </ul>
                      <Button className="w-full mt-4">Get Started</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">$199.99</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Unlimited branch locations
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          "Skiply Partner" badge with top visibility
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Premium analytics with customer insights
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          Integration with existing systems
                        </li>
                      </ul>
                      <Button className="w-full mt-4">Contact Sales</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
