
import { Service } from "@/lib/types";

type BusinessServicesProps = {
  services: Service[];
};

export const BusinessServices = ({ services }: BusinessServicesProps) => {
  if (!services || services.length === 0) return null;
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map(service => (
          <div 
            key={service.id}
            className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{service.name}</h3>
              <span className="font-medium">
                {service.price > 0 ? `₹${service.price}` : 'Free'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Duration: {service.duration} mins
              {service.category && ` • ${service.category}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
