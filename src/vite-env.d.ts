
/// <reference types="vite/client" />

// Google Maps type definitions
interface Window {
  google: {
    maps: {
      Map: typeof google.maps.Map;
      Marker: typeof google.maps.Marker;
      InfoWindow: typeof google.maps.InfoWindow;
      LatLng: typeof google.maps.LatLng;
      MapOptions: google.maps.MapOptions;
      Animation: {
        DROP: number;
      };
      SymbolPath: {
        CIRCLE: number;
      };
    };
  };
}
