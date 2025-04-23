
import * as z from "zod";

export const businessRegisterSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  category: z.string(),
  address: z.string().min(5, "Please enter your business address"),
  description: z.string().optional(),
  phone: z.string().min(10, "Please enter a valid phone number"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type BusinessRegisterFormValues = z.infer<typeof businessRegisterSchema>;
