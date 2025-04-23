
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, User } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AccountType = "customer" | "business";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("customer");
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (accountType === "business") {
        // Business login logic
        if (values.email.includes("business")) {
          toast({
            title: "Business login successful",
            description: "Welcome to your business dashboard",
          });
          navigate("/business/dashboard");
        } else {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Try using an email with 'business' in it for this demo.",
            variant: "destructive",
          });
        }
      } else {
        // Customer login logic
        toast({
          title: "Customer login successful",
          description: "Welcome back!",
        });
        navigate("/");
        console.log(values);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <Tabs 
          defaultValue="customer" 
          className="w-full" 
          onValueChange={(value) => setAccountType(value as AccountType)}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="customer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Customer</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span>Business</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
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
          </TabsContent>
          
          <TabsContent value="business">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Email</FormLabel>
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
                  {isLoading ? "Signing in..." : "Sign in to Business Account"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 text-center text-sm">
          <div>
            <span className="text-muted-foreground">Don't have an account? </span>
            {accountType === "customer" ? (
              <Link to="/customer/register" className="text-primary hover:underline">
                Register here
              </Link>
            ) : (
              <Link to="/business/register" className="text-primary hover:underline">
                Register business here
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
