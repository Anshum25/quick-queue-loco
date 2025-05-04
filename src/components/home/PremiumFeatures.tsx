
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Sparkles, QrCode, Bell } from "lucide-react";

export function PremiumFeatures() {
  // Premium features data
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
    </div>
  );
}
