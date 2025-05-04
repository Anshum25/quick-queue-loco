
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SubscriptionPlans() {
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

  return (
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
  );
}
