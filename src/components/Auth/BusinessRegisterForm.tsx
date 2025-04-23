
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import BasicInfoFields from "./BusinessRegister/BasicInfoFields";
import AuthFields from "./BusinessRegister/AuthFields";
import BusinessDetailsFields from "./BusinessRegister/BusinessDetailsFields";
import { useBusinessRegister } from "@/hooks/useBusinessRegister";

const BusinessRegisterForm = () => {
  const { form, isLoading, onSubmit } = useBusinessRegister();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BasicInfoFields />
          <AuthFields />
          <BusinessDetailsFields />
        </div>
        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register Business"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessRegisterForm;
