import { Business, BusinessCategory, LocationInfo, categoryIcons, categoryLabels, getQueueColor } from "./types";

export const locations: LocationInfo[] = [
  { city: "Ahmedabad", state: "Gujarat", country: "India" },
  { city: "Delhi", state: "Delhi", country: "India" },
  { city: "Mumbai", state: "Maharashtra", country: "India" },
  { city: "Bangalore", state: "Karnataka", country: "India" },
  { city: "Hyderabad", state: "Telangana", country: "India" },
];

export const sampleBusinesses: Business[] = [
  {
    id: "1",
    name: "Polo Hospital",
    category: "hospital",
    address: "123 Healthcare Ave, Ahmedabad",
    waitTime: 45,
    queueLength: 12,
    distance: 1.2,
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    rating: 4.2,
    services: [
      { id: "h1", name: "General Checkup", price: 500, duration: 30 },
      { id: "h2", name: "Dental Consultation", price: 800, duration: 60, category: "Dental" },
      { id: "h3", name: "Pediatric Visit", price: 600, duration: 45, category: "Pediatrics" },
      { id: "h4", name: "Cardiology Consultation", price: 1200, duration: 60, category: "Cardiology" },
      { id: "h5", name: "Orthopedic Assessment", price: 1000, duration: 45, category: "Orthopedics" },
    ]
  },
  {
    id: "2",
    name: "State Bank of India",
    category: "bank",
    address: "45 Financial Street, Ahmedabad",
    waitTime: 30,
    queueLength: 8,
    distance: 0.8,
    imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop",
    rating: 3.8,
    services: [
      { id: "b1", name: "New Account Opening", price: 0, duration: 45 },
      { id: "b2", name: "Loan Consultation", price: 0, duration: 30 },
      { id: "b3", name: "Cash Deposit/Withdrawal", price: 0, duration: 15 },
    ]
  },
  {
    id: "3",
    name: "Style Studio Salon",
    category: "salon",
    address: "78 Beauty Road, Ahmedabad",
    waitTime: 15,
    queueLength: 3,
    distance: 2.1,
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop",
    rating: 4.5,
    services: [
      { id: "s1", name: "Men's Haircut", price: 300, duration: 30, category: "Male" },
      { id: "s2", name: "Women's Haircut", price: 600, duration: 60, category: "Female" },
      { id: "s3", name: "Hair Coloring", price: 1500, duration: 120, category: "Unisex" },
      { id: "s4", name: "Manicure", price: 400, duration: 45, category: "Unisex" },
    ]
  },
  {
    id: "4",
    name: "Passport Office",
    category: "government",
    address: "10 Gov Complex, Ahmedabad",
    waitTime: 90,
    queueLength: 25,
    distance: 3.5,
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=2342&auto=format&fit=crop",
    rating: 3.2,
    services: [
      { id: "g1", name: "New Passport Application", price: 1500, duration: 30 },
      { id: "g2", name: "Passport Renewal", price: 1000, duration: 20 },
      { id: "g3", name: "Address Change", price: 500, duration: 15 },
    ]
  },
  {
    id: "5",
    name: "Tasty Bites Restaurant",
    category: "restaurant",
    address: "56 Food Street, Ahmedabad",
    waitTime: 25,
    queueLength: 6,
    distance: 1.5,
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    services: [
      { id: "r1", name: "Table for 2", price: 0, duration: 60 },
      { id: "r2", name: "Table for 4", price: 0, duration: 90 },
      { id: "r3", name: "Private Dining", price: 1000, duration: 120 },
    ]
  },
  {
    id: "6",
    name: "Quick Fix Electronics",
    category: "repair",
    address: "89 Tech Lane, Ahmedabad",
    waitTime: 40,
    queueLength: 5,
    distance: 2.8,
    imageUrl: "https://images.unsplash.com/photo-1588863740684-af8b8c03bdf6?q=80&w=2070&auto=format&fit=crop",
    rating: 4.0,
    services: [
      { id: "f1", name: "Phone Screen Repair", price: 1500, duration: 60 },
      { id: "f2", name: "Laptop Diagnosis", price: 500, duration: 30 },
      { id: "f3", name: "TV Repair", price: 2000, duration: 120 },
    ]
  },
  {
    id: "7",
    name: "City General Hospital",
    category: "hospital",
    address: "200 Healthcare Blvd, Ahmedabad",
    waitTime: 60,
    queueLength: 15,
    distance: 4.0,
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop",
    rating: 4.3,
    services: [
      { id: "h6", name: "Emergency Care", price: 1000, duration: 20 },
      { id: "h7", name: "General Practitioner", price: 600, duration: 30 },
      { id: "h8", name: "Vaccination", price: 400, duration: 15 },
    ]
  },
  {
    id: "8",
    name: "Glamour Hair Salon",
    category: "salon",
    address: "110 Fashion Street, Ahmedabad",
    waitTime: 20,
    queueLength: 4,
    distance: 1.7,
    imageUrl: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop",
    rating: 4.6,
    services: [
      { id: "s5", name: "Bridal Makeup", price: 5000, duration: 180, category: "Female" },
      { id: "s6", name: "Hair Spa", price: 1200, duration: 90, category: "Unisex" },
      { id: "s7", name: "Beard Trim", price: 200, duration: 20, category: "Male" },
    ]
  },
];

// Re-export these from types.ts for backward compatibility
export { categoryLabels, categoryIcons, getQueueColor };

export const getBusinessesByCategory = (category?: BusinessCategory): Business[] => {
  if (!category) return sampleBusinesses;
  return sampleBusinesses.filter(business => business.category === category);
};

export const getBusinessById = (id: string): Business | undefined => {
  return sampleBusinesses.find(business => business.id === id);
};

export const searchBusinesses = (query: string): Business[] => {
  const lowerQuery = query.toLowerCase();
  return sampleBusinesses.filter(
    business => 
      business.name.toLowerCase().includes(lowerQuery) || 
      business.category.toLowerCase().includes(lowerQuery) ||
      business.address.toLowerCase().includes(lowerQuery)
  );
};
