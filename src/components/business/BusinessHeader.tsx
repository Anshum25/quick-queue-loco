
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type BusinessHeaderProps = {
  name: string;
  imageUrl: string;
};

export const BusinessHeader = ({ name, imageUrl }: BusinessHeaderProps) => (
  <div className="h-48 md:h-64 overflow-hidden relative">
    <img 
      src={imageUrl} 
      alt={name}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
      <h1 className="text-2xl md:text-3xl font-bold text-white">{name}</h1>
    </div>
  </div>
);
