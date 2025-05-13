
import React, { useEffect, useRef, useState } from 'react';
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
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiLoaded, setApiLoaded] = useState<boolean>(false);
  const [googleApiKey, setGoogleApiKey] = useState<string>("");
  const [showKeyInput, setShowKeyInput] = useState<boolean>(true);

  useEffect(() => {
    if (!googleApiKey || !mapRef.current || apiLoaded) return;

    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setApiLoaded(true);
        initializeMap();
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsApi();
  }, [googleApiKey, apiLoaded, latitude, longitude]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapOptions: google.maps.MapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 14,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    // Add marker for business location
    const marker = new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: newMap,
      title: businessName || 'Location',
      animation: window.google.maps.Animation.DROP
    });

    // Add info window with business details
    if (businessName || address) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${businessName || 'Location'}</strong><p>${address || ''}</p></div>`
      });

      marker.addListener('click', () => {
        infoWindow.open(newMap, marker);
      });
      
      // Open info window by default
      infoWindow.open(newMap, marker);
    }
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (googleApiKey) {
      setShowKeyInput(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!map || !window.google) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude: userLong, latitude: userLat } = position.coords;
        const userLocation = new google.maps.LatLng(userLat, userLong);
        
        map.panTo(userLocation);
        
        // Add a user location marker
        const userMarker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'You are here',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8
          }
        });

        // Add info window for user location
        const infoWindow = new google.maps.InfoWindow({
          content: '<strong>You are here</strong>'
        });

        userMarker.addListener('click', () => {
          infoWindow.open(map, userMarker);
        });
        
        // Open the info window briefly
        infoWindow.open(map, userMarker);
        setTimeout(() => infoWindow.close(), 3000);
      },
      (err) => {
        console.error("Error getting location: ", err);
      }
    );
  };

  if (showKeyInput) {
    return (
      <div className={`border rounded-md p-4 ${className}`}>
        <h3 className="font-medium mb-2">Google Maps API Key Required</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Please enter your Google Maps API key to display the map. You can get one from 
          <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-primary ml-1">
            Google Cloud Console
          </a>
        </p>
        <form onSubmit={handleKeySubmit} className="space-y-4">
          <input 
            type="text" 
            value={googleApiKey}
            onChange={(e) => setGoogleApiKey(e.target.value)}
            placeholder="Enter Google Maps API key"
            className="w-full p-2 border rounded-md"
          />
          <Button type="submit">Load Map</Button>
        </form>
      </div>
    );
  }

  return (
    <div className={`relative ${className || 'h-[300px]'}`}>
      <div ref={mapRef} className="absolute inset-0 rounded-md" />
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
