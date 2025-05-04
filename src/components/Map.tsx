
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

interface MapProps {
  longitude?: number;
  latitude?: number;
  address?: string;
  businessName?: string;
  className?: string;
}

const Map = ({ longitude = 72.5714, latitude = 23.0225, address, businessName, className }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 14
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add marker
    marker.current = new mapboxgl.Marker({ color: "#f43f5e" })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${businessName || 'Location'}</strong><p>${address || ''}</p>`
        )
      )
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, [longitude, latitude, address, businessName, mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      setShowTokenInput(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!map.current) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude: userLong, latitude: userLat } = position.coords;
        map.current?.flyTo({
          center: [userLong, userLat],
          zoom: 14
        });
        
        // Add a user location marker
        new mapboxgl.Marker({ color: "#3b82f6" })
          .setLngLat([userLong, userLat])
          .setPopup(
            new mapboxgl.Popup().setHTML('<strong>You are here</strong>')
          )
          .addTo(map.current!);
      },
      (err) => {
        console.error("Error getting location: ", err);
      }
    );
  };

  if (showTokenInput) {
    return (
      <div className={`border rounded-md p-4 ${className}`}>
        <h3 className="font-medium mb-2">Mapbox Token Required</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Please enter your Mapbox public token to display the map. You can get one from 
          <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary ml-1">
            mapbox.com
          </a>
        </p>
        <form onSubmit={handleTokenSubmit} className="space-y-4">
          <input 
            type="text" 
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="Enter Mapbox public token"
            className="w-full p-2 border rounded-md"
          />
          <Button type="submit">Load Map</Button>
        </form>
      </div>
    );
  }

  return (
    <div className={`relative ${className || 'h-[300px]'}`}>
      <div ref={mapContainer} className="absolute inset-0 rounded-md" />
      <div className="absolute top-2 left-2 z-10">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={handleGetCurrentLocation}
          className="flex items-center gap-1"
        >
          <Navigation className="h-4 w-4" />
          <span>Find Me</span>
        </Button>
      </div>
    </div>
  );
};

export default Map;
