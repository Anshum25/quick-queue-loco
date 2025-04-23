
import BusinessRegisterHeader from "@/components/Auth/BusinessRegisterHeader";
import BusinessRegisterForm from "@/components/Auth/BusinessRegisterForm";
import { Link } from "react-router-dom";

const BusinessRegister = () => {
  return (
    <div className="min-h-screen py-10 bg-background">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <BusinessRegisterHeader />
          <BusinessRegisterForm />
          <div className="text-center text-sm mt-6">
            <span className="text-muted-foreground">Already have a business account? </span>
            <Link to="/business/login" className="text-primary hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegister;
