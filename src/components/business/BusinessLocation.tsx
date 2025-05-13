
import Map from "@/components/Map";

type BusinessLocationProps = {
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export const BusinessLocation = ({ name, address, coordinates }: BusinessLocationProps) => (
  <div>
    <h2 className="text-xl font-semibold mb-2">Location</h2>
    <div className="border rounded-md overflow-hidden">
      <Map 
        latitude={coordinates.latitude} 
        longitude={coordinates.longitude}
        address={address}
        businessName={name}
        className="h-[300px] w-full mb-4"
      />
    </div>
    <p className="text-sm text-muted-foreground mt-2">{address}</p>
  </div>
);
