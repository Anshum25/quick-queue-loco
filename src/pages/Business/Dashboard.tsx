
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Business, Department, Service } from "@/lib/types";
import { Clock, Users, Store, Settings, Trash } from "lucide-react";
import { BusinessLayout } from "@/components/BusinessLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock function to get a business - in a real app, this would fetch from your backend
const getBusinessForOwner = (): Business => {
  return {
    id: "1",
    name: "Polo Hospital",
    category: "hospital",
    address: "123 Healthcare Ave, Ahmedabad",
    waitTime: 45,
    queueLength: 12,
    distance: 1.2,
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    rating: 4.2,
    departments: [
      {
        id: "dept-1",
        name: "General Medicine",
        waitTime: 35,
        queueLength: 8,
        description: "General consultations and primary care",
        active: true
      },
      {
        id: "dept-2",
        name: "Cardiology",
        waitTime: 45,
        queueLength: 4,
        description: "Heart-related diagnoses and treatments",
        active: true
      }
    ],
    services: [
      { id: "h1", name: "General Checkup", price: 500, duration: 30 },
      { id: "h2", name: "Dental Consultation", price: 800, duration: 60, category: "Dental" }
    ]
  };
};

// Schema for adding/editing a department
const departmentSchema = z.object({
  name: z.string().min(2, { message: "Department name is required" }),
  description: z.string().optional(),
  active: z.boolean().default(true),
  waitTime: z.number().int().min(0, { message: "Wait time must be a positive number" }),
});

// Schema for adding/editing a service
const serviceSchema = z.object({
  name: z.string().min(2, { message: "Service name is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  duration: z.number().int().min(1, { message: "Duration must be a positive number" }),
  category: z.string().optional(),
});

// Working hours schema
const workingHoursSchema = z.object({
  monday: z.object({
    isOpen: z.boolean().default(true),
    openTime: z.string().default("09:00"),
    closeTime: z.string().default("17:00"),
  }),
  tuesday: z.object({
    isOpen: z.boolean().default(true),
    openTime: z.string().default("09:00"),
    closeTime: z.string().default("17:00"),
  }),
  wednesday: z.object({
    isOpen: z.boolean().default(true),
    openTime: z.string().default("09:00"),
    closeTime: z.string().default("17:00"),
  }),
  thursday: z.object({
    isOpen: z.boolean().default(true),
    openTime: z.string().default("09:00"),
    closeTime: z.string().default("17:00"),
  }),
  friday: z.object({
    isOpen: z.boolean().default(true),
    openTime: z.string().default("09:00"),
    closeTime: z.string().default("17:00"),
  }),
  saturday: z.object({
    isOpen: z.boolean().default(true),
    openTime: z.string().default("09:00"),
    closeTime: z.string().default("14:00"),
  }),
  sunday: z.object({
    isOpen: z.boolean().default(false),
    openTime: z.string().default("09:00"),
    closeTime: z.string().default("17:00"),
  }),
});

const BusinessDashboard = () => {
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);

  // Load business data
  useEffect(() => {
    // In a real app, this would be an API call
    const loadedBusiness = getBusinessForOwner();
    setBusiness(loadedBusiness);
  }, []);

  // Form for departments
  const departmentForm = useForm<z.infer<typeof departmentSchema>>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      description: "",
      active: true,
      waitTime: 15,
    },
  });

  // Form for services
  const serviceForm = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      price: 0,
      duration: 30,
      category: "",
    },
  });

  // Form for working hours
  const workingHoursForm = useForm<z.infer<typeof workingHoursSchema>>({
    resolver: zodResolver(workingHoursSchema),
    defaultValues: {
      monday: { isOpen: true, openTime: "09:00", closeTime: "17:00" },
      tuesday: { isOpen: true, openTime: "09:00", closeTime: "17:00" },
      wednesday: { isOpen: true, openTime: "09:00", closeTime: "17:00" },
      thursday: { isOpen: true, openTime: "09:00", closeTime: "17:00" },
      friday: { isOpen: true, openTime: "09:00", closeTime: "17:00" },
      saturday: { isOpen: true, openTime: "09:00", closeTime: "14:00" },
      sunday: { isOpen: false, openTime: "09:00", closeTime: "17:00" },
    },
  });

  const handleAddDepartment = (data: z.infer<typeof departmentSchema>) => {
    if (!business) return;

    // Create a new department
    const newDepartment: Department = {
      id: `dept-${Date.now()}`,
      name: data.name,
      description: data.description,
      waitTime: data.waitTime,
      queueLength: 0,
      active: data.active,
    };

    // Add to business
    const updatedBusiness = {
      ...business,
      departments: [...(business.departments || []), newDepartment],
    };

    setBusiness(updatedBusiness);
    setIsAddingDepartment(false);
    departmentForm.reset();

    toast({
      title: "Department Added",
      description: `${data.name} has been added successfully.`,
    });
  };

  const handleAddService = (data: z.infer<typeof serviceSchema>) => {
    if (!business) return;

    // Create a new service
    const newService: Service = {
      id: `service-${Date.now()}`,
      name: data.name,
      price: data.price,
      duration: data.duration,
      category: data.category,
    };

    // Add to business
    const updatedBusiness = {
      ...business,
      services: [...(business.services || []), newService],
    };

    setBusiness(updatedBusiness);
    setIsAddingService(false);
    serviceForm.reset();

    toast({
      title: "Service Added",
      description: `${data.name} has been added successfully.`,
    });
  };

  const handleSaveWorkingHours = (data: z.infer<typeof workingHoursSchema>) => {
    // In a real app, you would save this to your API
    console.log("Working hours updated:", data);
    
    toast({
      title: "Working Hours Updated",
      description: "Your business hours have been updated successfully.",
    });
  };

  const handleDeleteDepartment = (departmentId: string) => {
    if (!business || !business.departments) return;

    const updatedDepartments = business.departments.filter(
      (dept) => dept.id !== departmentId
    );

    const updatedBusiness = {
      ...business,
      departments: updatedDepartments,
    };

    setBusiness(updatedBusiness);

    toast({
      title: "Department Deleted",
      description: "The department has been removed successfully.",
    });
  };

  const handleDeleteService = (serviceId: string) => {
    if (!business || !business.services) return;

    const updatedServices = business.services.filter(
      (service) => service.id !== serviceId
    );

    const updatedBusiness = {
      ...business,
      services: updatedServices,
    };

    setBusiness(updatedBusiness);

    toast({
      title: "Service Deleted",
      description: "The service has been removed successfully.",
    });
  };

  if (!business) {
    return (
      <BusinessLayout>
        <div className="flex items-center justify-center h-96">
          <p>Loading business information...</p>
        </div>
      </BusinessLayout>
    );
  }

  return (
    <BusinessLayout>
      <div className="container px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <p className="text-muted-foreground">{business.address}</p>
          </div>
          <Button variant="outline" asChild>
            <Link to={`/business/preview/${business.id}`}>
              Preview Public Page
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="queue">
          <TabsList className="mb-6">
            <TabsTrigger value="queue">Queue Management</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="hours">Working Hours</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="queue">
            <Card>
              <CardHeader>
                <CardTitle>Current Queue Status</CardTitle>
                <CardDescription>
                  View and manage customers currently in your queue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Total in Queue</span>
                    </div>
                    <p className="text-3xl font-bold mt-2">{business.queueLength}</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Average Wait Time</span>
                    </div>
                    <p className="text-3xl font-bold mt-2">{business.waitTime} mins</p>
                  </div>
                </div>

                {business.departments && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Queue by Department</h3>
                    <div className="space-y-4">
                      {business.departments.map((dept) => (
                        <div key={dept.id} className="border p-4 rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{dept.name}</h4>
                              <p className="text-sm text-muted-foreground">{dept.description}</p>
                            </div>
                            <div className="flex gap-4 text-center">
                              <div>
                                <p className="text-sm text-muted-foreground">Queue</p>
                                <p className="font-bold">{dept.queueLength}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Wait</p>
                                <p className="font-bold">{dept.waitTime} mins</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline">Refresh Data</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <div className="grid gap-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Manage Departments</h3>
                <Button onClick={() => setIsAddingDepartment(true)}>
                  Add Department
                </Button>
              </div>

              {isAddingDepartment && (
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Department</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...departmentForm}>
                      <form onSubmit={departmentForm.handleSubmit(handleAddDepartment)} className="space-y-4">
                        <FormField
                          control={departmentForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Cardiology" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={departmentForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Brief description of this department" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={departmentForm.control}
                          name="waitTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Wait Time (minutes)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={0}
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={departmentForm.control}
                          name="active"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2 space-y-0">
                              <FormControl>
                                <Switch 
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Active</FormLabel>
                              <FormDescription>
                                Inactive departments won't be visible to customers
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddingDepartment(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Save Department</Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {business.departments?.map(department => (
                  <Card key={department.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{department.name}</CardTitle>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteDepartment(department.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <CardDescription>{department.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Wait Time</p>
                          <p className="font-medium">{department.waitTime} minutes</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p className="font-medium">{department.active ? "Active" : "Inactive"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {(!business.departments || business.departments.length === 0) && (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-lg font-medium">No departments yet</h3>
                    <p className="text-muted-foreground mt-2 mb-4">
                      Add departments to organize your services and queues
                    </p>
                    <Button onClick={() => setIsAddingDepartment(true)}>
                      Add Your First Department
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid gap-6">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Manage Services</h3>
                <Button onClick={() => setIsAddingService(true)}>
                  Add Service
                </Button>
              </div>

              {isAddingService && (
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...serviceForm}>
                      <form onSubmit={serviceForm.handleSubmit(handleAddService)} className="space-y-4">
                        <FormField
                          control={serviceForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. General Checkup" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={serviceForm.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (₹)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={0}
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={serviceForm.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration (minutes)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min={1}
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={serviceForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Pediatrics" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddingService(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Save Service</Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {business.services?.map(service => (
                  <Card key={service.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{service.name}</CardTitle>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <CardDescription>{service.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="font-medium">₹{service.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="font-medium">{service.duration} minutes</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {(!business.services || business.services.length === 0) && (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-lg font-medium">No services yet</h3>
                    <p className="text-muted-foreground mt-2 mb-4">
                      Add services that customers can book
                    </p>
                    <Button onClick={() => setIsAddingService(true)}>
                      Add Your First Service
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle>Working Hours</CardTitle>
                <CardDescription>
                  Set your business hours and manage when you're open
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...workingHoursForm}>
                  <form onSubmit={workingHoursForm.handleSubmit(handleSaveWorkingHours)} className="space-y-4">
                    {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                      <div key={day} className="grid grid-cols-[120px_1fr] gap-4 items-center">
                        <div className="font-medium capitalize">{day}</div>
                        <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                          <FormField
                            control={workingHoursForm.control}
                            name={`${day}.isOpen` as any}
                            render={({ field }) => (
                              <FormItem className="flex items-center space-y-0">
                                <FormControl>
                                  <Switch 
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="ml-2">{field.value ? "Open" : "Closed"}</FormLabel>
                              </FormItem>
                            )}
                          />
                          
                          {workingHoursForm.watch(`${day}.isOpen` as any) && (
                            <div className="flex items-center gap-2">
                              <FormField
                                control={workingHoursForm.control}
                                name={`${day}.openTime` as any}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input type="time" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <span>to</span>
                              <FormField
                                control={workingHoursForm.control}
                                name={`${day}.closeTime` as any}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input type="time" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end mt-6">
                      <Button type="submit">Save Working Hours</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
                <CardDescription>
                  Manage your business profile and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Business Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input id="business-name" defaultValue={business.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-category">Category</Label>
                        <Input id="business-category" defaultValue={business.category} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="business-address">Address</Label>
                        <Input id="business-address" defaultValue={business.address} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Queue Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="max-capacity">Maximum Queue Capacity</Label>
                        <Input id="max-capacity" type="number" defaultValue={30} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="booking-interval">Booking Interval (minutes)</Label>
                        <Input id="booking-interval" type="number" defaultValue={15} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BusinessLayout>
  );
};

export default BusinessDashboard;
