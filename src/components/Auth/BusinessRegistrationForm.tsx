
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { BusinessCategory } from "@/lib/types";
import { categoryLabels } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

const businessSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  category: z.enum(["restaurant", "hospital", "salon", "bank", "government", "repair"] as const),
  address: z.string().min(5, "Please enter a valid address"),
  description: z.string().min(10, "Please provide a brief description of your business"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  // Category specific fields
  specialties: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  openingHours: z.string().optional(),
  license: z.string().optional(),
  insurance: z.boolean().optional(),
  facilities: z.array(z.string()).optional(),
});

interface BusinessRegistrationFormProps {
  userDetails: {
    name: string;
    email: string;
    password: string;
    userType?: "customer" | "business";
  };
}

const BusinessRegistrationForm = ({ userDetails }: BusinessRegistrationFormProps) => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory>("restaurant");
  
  const form = useForm<z.infer<typeof businessSchema>>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: "",
      category: "restaurant",
      address: "",
      description: "",
      phone: "",
      specialties: [],
      services: [],
      openingHours: "",
      insurance: false,
    },
  });

  const onSubmit = (values: z.infer<typeof businessSchema>) => {
    const registrationData = {
      ...userDetails,
      business: values,
    };
    
    toast({
      title: "Business Registration Attempted",
      description: "This is a demo. Business registration will be implemented with Supabase.",
    });
    console.log(registrationData);
  };

  const renderCategorySpecificFields = () => {
    switch (selectedCategory) {
      case "restaurant":
        return (
          <>
            <FormField
              control={form.control}
              name="specialties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Types</FormLabel>
                  <FormControl>
                    <Input placeholder="Italian, Chinese, Indian, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="openingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening Hours</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mon-Sat: 9AM-10PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "hospital":
        return (
          <>
            <FormField
              control={form.control}
              name="facilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Facilities</FormLabel>
                  <FormControl>
                    <Input placeholder="Emergency, ICU, X-Ray, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="license"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter medical license number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insurance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Accept Insurance</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </>
        );

      case "salon":
        return (
          <>
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Services Offered</FormLabel>
                  <FormControl>
                    <Input placeholder="Haircut, Coloring, Manicure, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="openingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening Hours</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mon-Sat: 9AM-7PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "bank":
        return (
          <>
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banking Services</FormLabel>
                  <FormControl>
                    <Input placeholder="Savings, Loans, Credit Cards, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="license"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banking License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter banking license number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-8 bg-card p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Business Details</h2>
          <p className="text-muted-foreground mt-2">Tell us about your business</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Business Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Category</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCategory(value as BusinessCategory);
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(Object.keys(categoryLabels) as BusinessCategory[]).map((category) => (
                        <SelectItem key={category} value={category}>
                          {categoryLabels[category]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Business Street, City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your business..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {renderCategorySpecificFields()}

            <Button type="submit" className="w-full">Complete Registration</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BusinessRegistrationForm;

