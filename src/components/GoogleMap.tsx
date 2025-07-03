"use client";
import { useEffect, useState } from "react";
import { AdvancedMarker, APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

type props = {
  search: string
  mapReady: boolean
  setMapReady: (ready: boolean) => void
}

export default function GoogleMap({search, setMapReady, mapReady}: props) {
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null)

  const map = useMap();
  
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

  // This effect is to handle the map readiness
  useEffect(() => {
    if (map) {
      console.log("Map is ready");
      setMapReady(true);
    }
  }, [map])
  // TODO: use toasts and/or loading state to if error or loading
  // this is temporary
  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex h-80">
        <Map className="h-full w-full" defaultCenter={location} defaultZoom={10} mapId={process.env.NEXT_PUBLIC_MAP_ID as string}>
          <AdvancedMarker position={location} />
        </Map>
      </div>
    </>
  );
}
