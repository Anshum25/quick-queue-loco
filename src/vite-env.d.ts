
/// <reference types="vite/client" />

// Google Maps type definitions
interface Window {
  google?: {
    maps: {
      Map: any;
      Marker: any;
      InfoWindow: any;
      LatLng: any;
      MapOptions: any;
      Animation: {
        DROP: number;
      };
      SymbolPath: {
        CIRCLE: number;
      };
    };
  };
}

