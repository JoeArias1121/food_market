"use client";
import { useEffect, useState } from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

export default function GoogleMap() {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
  
  useEffect(() => {
    // Get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, (error) => {
        console.error("Error getting location:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [])
  // TODO: use toasts and/or loading state to if error or loading
  // this is temporary
  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
    >
      <div className="flex h-80">
        <Map className="h-full w-full" center={location} zoom={10} mapId={process.env.NEXT_PUBLIC_MAP_ID as string}>
          <AdvancedMarker position={location} />
        </Map>
      </div>
    </APIProvider>
  );
}
