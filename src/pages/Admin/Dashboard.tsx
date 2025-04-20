
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Store, User, Users, MapPin, Settings } from "lucide-react";
import { BusinessCategory, categoryLabels } from "@/lib/types";

// Admin dashboard to manage the entire platform
const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 h-9 w-9 rounded-md flex items-center justify-center">
              <span className="text-lg font-bold text-primary">Q</span>
            </div>
            <span className="font-bold text-xl">Admin Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">Logout</Button>
          </div>
        </div>
      </header>
      
      <div className="container px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <User className="h-5 w-5 text-primary mr-2" />
                <span className="text-3xl font-bold">1,254</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">+38 in the last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Businesses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Store className="h-5 w-5 text-primary mr-2" />
                <span className="text-3xl font-bold">89</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">+12 in the last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                <span className="text-3xl font-bold">4,598</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">+842 in the last 30 days</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="businesses">
          <TabsList className="mb-6">
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="businesses">
            <Card>
              <CardHeader>
                <CardTitle>Manage Businesses</CardTitle>
                <CardDescription>View and manage all registered businesses</CardDescription>
                <div className="mt-4">
                  <Input 
                    placeholder="Search businesses..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBusinesses.map(business => (
                    <div key={business.id} className="p-4 border rounded-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{business.name}</h3>
                            <Badge variant={business.status === "active" ? "default" : "secondary"}>
                              {business.status}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {business.location}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Category: {categoryLabels[business.category as BusinessCategory]}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button 
                            variant={business.status === "active" ? "destructive" : "default"} 
                            size="sm"
                          >
                            {business.status === "active" ? "Suspend" : "Activate"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>View and manage all registered users</CardDescription>
                <div className="mt-4">
                  <Input placeholder="Search users..." />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map(user => (
                    <div key={user.id} className="p-4 border rounded-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{user.name}</h3>
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>
                              {user.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {user.email}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Joined: {user.joinDate}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Details</Button>
                          <Button 
                            variant={user.status === "active" ? "destructive" : "default"} 
                            size="sm"
                          >
                            {user.status === "active" ? "Suspend" : "Activate"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="locations">
            <Card>
              <CardHeader>
                <CardTitle>Manage Locations</CardTitle>
                <CardDescription>Add and manage supported locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input placeholder="Add new location (city)" />
                  </div>
                  <Button>Add Location</Button>
                </div>
                <div className="space-y-4">
                  {mockLocations.map(location => (
                    <div key={location.id} className="p-4 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold">{location.city}</h3>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {location.state}, {location.country}
                          </div>
                        </div>
                        <div className="text-sm">
                          {location.businessCount} businesses
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>View system analytics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Bookings by Category</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <div key={key} className="p-4 border rounded-md">
                          <div className="flex justify-between items-center">
                            <div>{label}</div>
                            <div className="font-bold">{Math.floor(Math.random() * 1000)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Top Locations</h3>
                    <div className="space-y-2">
                      {mockLocations.slice(0, 5).map(location => (
                        <div key={location.id} className="flex justify-between items-center p-2 border-b">
                          <div>{location.city}</div>
                          <div className="font-medium">{location.businessCount} businesses</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Mock data
const mockBusinesses = [
  { id: "1", name: "Polo Hospital", status: "active", location: "Ahmedabad, Gujarat", category: "hospital" },
  { id: "2", name: "State Bank of India", status: "active", location: "Mumbai, Maharashtra", category: "bank" },
  { id: "3", name: "Style Studio", status: "pending", location: "Delhi, Delhi", category: "salon" },
  { id: "4", name: "Passport Office", status: "active", location: "Bangalore, Karnataka", category: "government" },
  { id: "5", name: "Tasty Bites", status: "suspended", location: "Hyderabad, Telangana", category: "restaurant" },
];

const mockUsers = [
  { id: "1", name: "Raj Patel", status: "active", email: "raj@example.com", joinDate: "Apr 10, 2023" },
  { id: "2", name: "Priya Sharma", status: "active", email: "priya@example.com", joinDate: "Jan 15, 2024" },
  { id: "3", name: "Amit Singh", status: "inactive", email: "amit@example.com", joinDate: "Mar 22, 2024" },
  { id: "4", name: "Neha Gupta", status: "active", email: "neha@example.com", joinDate: "Feb 5, 2024" },
];

const mockLocations = [
  { id: "1", city: "Ahmedabad", state: "Gujarat", country: "India", businessCount: 25 },
  { id: "2", city: "Mumbai", state: "Maharashtra", country: "India", businessCount: 42 },
  { id: "3", city: "Delhi", state: "Delhi", country: "India", businessCount: 38 },
  { id: "4", city: "Bangalore", state: "Karnataka", country: "India", businessCount: 31 },
  { id: "5", city: "Hyderabad", state: "Telangana", country: "India", businessCount: 19 },
];

export default AdminDashboard;
