
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

const businessSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  category: z.enum(["restaurant", "hospital", "salon", "bank", "government", "repair"] as const),
  address: z.string().min(5, "Please enter a valid address"),
  description: z.string().min(10, "Please provide a brief description of your business"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

interface BusinessRegistrationFormProps {
  userDetails: {
    name: string;
    email: string;
    password: string;
  };
}

const BusinessRegistrationForm = ({ userDetails }: BusinessRegistrationFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof businessSchema>>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: "",
      category: "restaurant",
      address: "",
      description: "",
      phone: "",
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            <Button type="submit" className="w-full">Complete Registration</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BusinessRegistrationForm;
