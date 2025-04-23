
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessRegisterSchema, type BusinessRegisterFormValues } from "@/lib/schemas/businessRegister";

export const useBusinessRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<BusinessRegisterFormValues>({
    resolver: zodResolver(businessRegisterSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      password: "",
      confirmPassword: "",
      category: "",
      address: "",
      description: "",
      phone: "",
    },
  });

  const onSubmit = (values: BusinessRegisterFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Business registration:", values);
      toast({
        title: "Registration successful",
        description: "Your business account has been created. You can now log in.",
      });
      navigate("/business/login");
    }, 1500);
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};
