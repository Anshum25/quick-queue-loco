
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

export interface QueueBooking {
  id: string;
  businessId: string;
  serviceId?: string;
  estimatedTime: number;
  position: number;
  status: "pending" | "active" | "completed" | "cancelled";
}

export interface LocationInfo {
  city: string;
  state?: string;
  country?: string;
}
