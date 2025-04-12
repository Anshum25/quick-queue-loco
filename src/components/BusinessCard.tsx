
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Business } from "@/lib/types";
import { categoryIcons, getQueueColor } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const queueColor = getQueueColor(business.waitTime);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="font-medium">
            <span className="mr-1">{categoryIcons[business.category]}</span>
            {business.category.charAt(0).toUpperCase() + business.category.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold truncate flex-1">{business.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">{business.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
          <span className="truncate">{business.address}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Wait Time:</span>
            </div>
            <span className={`text-${queueColor} font-medium`}>
              {business.waitTime} mins
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Queue:</span>
              </div>
              <span className="text-sm">{business.queueLength} people</span>
            </div>
            <Progress 
              value={(business.queueLength / 30) * 100} 
              className={`h-2 bg-muted ${queueColor ? `data-[value]:bg-${queueColor}` : ''}`}
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild className="w-full">
          <Link to={`/business/${business.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
