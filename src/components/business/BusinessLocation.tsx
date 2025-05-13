
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
    <Map 
      latitude={coordinates.latitude} 
      longitude={coordinates.longitude}
      address={address}
      businessName={name}
      className="h-[300px] mb-4"
    />
  </div>
);
