
import { Store } from "lucide-react";

const BusinessRegisterHeader = () => {
  return (
    <div className="space-y-2 text-center">
      <Store className="mx-auto h-12 w-12 text-primary" />
      <h1 className="text-2xl font-semibold tracking-tight">Register Your Business</h1>
      <p className="text-muted-foreground">
        Join our platform to manage your queues and grow your business
      </p>
    </div>
  );
};

export default BusinessRegisterHeader;
