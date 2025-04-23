
export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  address: string;
  waitTime: number; // in minutes
  queueLength: number;
  distance: number; // in kilometers
  imageUrl: string;
  rating: number;
  services?: Service[];
  departments?: Department[];
  isPremium?: boolean; // Premium listing status
  premiumBadge?: string; // Badge type for premium businesses
}

export type BusinessCategory = 
  | "restaurant" 
  | "hospital" 
  | "salon" 
  | "government" 
  | "repair" 
  | "bank";

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  category?: string;
}

export interface Department {
  id: string;
  name: string;
  waitTime: number; // in minutes
  queueLength: number;
  description?: string;
  active: boolean;
}

export interface QueueBooking {
  id: string;
  businessId: string;
  serviceId?: string;
  departmentId?: string;
  estimatedTime: number;
  position: number;
  status: "pending" | "active" | "completed" | "cancelled";
  qrCodeUrl?: string; // URL for QR code check-in
  attended?: boolean; // Whether user has checked in
}

export interface LocationInfo {
  city: string;
  state?: string;
  country?: string;
}

export const categoryLabels: Record<BusinessCategory, string> = {
  restaurant: "Restaurants",
  hospital: "Hospitals",
  salon: "Salons",
  government: "Government Offices",
  repair: "Repair Shops",
  bank: "Banks"
};

export const categoryIcons: Record<BusinessCategory, string> = {
  restaurant: "🍔",
  hospital: "🏥",
  salon: "💇",
  government: "🏛️",
  repair: "🔧",
  bank: "🏦"
};

export const getQueueColor = (waitTime: number): string => {
  if (waitTime <= 20) return "queue-short";
  if (waitTime <= 45) return "queue-medium";
  return "queue-long";
};

// Subscription plans for users and businesses
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  type: "user" | "business";
}

