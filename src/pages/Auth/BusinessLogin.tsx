
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Store } from "lucide-react";

const businessLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const BusinessLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof businessLoginSchema>>({
    resolver: zodResolver(businessLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof businessLoginSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // In a real app, this would validate credentials against your API
      if (values.email.includes("business")) {
        // Success - redirect to business dashboard
        toast({
          title: "Login successful",
          description: "Welcome to your business dashboard",
        });
        navigate("/business/dashboard");
      } else {
        // Show error
        toast({
          title: "Login failed",
          description: "Invalid email or password. Try using an email with 'business' in it for this demo.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <Store className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-3xl font-bold tracking-tight mt-4">Business Login</h2>
          <p className="text-muted-foreground mt-2">Sign in to manage your business</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="business@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have a business account? </span>
          <Link to="/business/register" className="text-primary hover:underline">
            Register here
          </Link>
        </div>
        
        <div className="text-center text-sm pt-4 border-t">
          <Link to="/login" className="text-muted-foreground hover:text-foreground">
            Looking for customer login?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessLogin;
