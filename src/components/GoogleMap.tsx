"use client";
import { useEffect, useState } from "react";
import { AdvancedMarker, APIProvider, Map, useMap } from "@vis.gl/react-google-maps";

type Props = {
  search: string
  mapReady: boolean
  setMapReady: (ready: boolean) => void
  searchOrigin?: { lat: number, lng: number } | null
  superMarketMarkers: any[]
}

export default function GoogleMap({search, setMapReady, mapReady, searchOrigin, superMarketMarkers}: Props) {
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null)

  const map = useMap();
  const markers: any[] = []
  
  useEffect(() => {
    // Get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: searchOrigin ? searchOrigin.lat : position.coords.latitude,
          lng: searchOrigin ? searchOrigin.lng : position.coords.longitude,
        });
        console.log("📍 Current Location: ", location)
      }, (error) => {
        console.error("Error getting location:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (searchOrigin) {
      setLocation({
        lat: searchOrigin.lat,
        lng: searchOrigin.lng,
      });
      map?.panTo({ lat: searchOrigin.lat, lng: searchOrigin.lng });
      console.log("📍 Panning to Location: ", searchOrigin);
    }
  }, [searchOrigin, map, mapReady])

  // This effect is to handle the map readiness
  useEffect(() => {
    if (map) {
      console.log("Map is ready");
      setMapReady(true);
    }
  }, [map])

  useEffect(() => {
    superMarketMarkers.forEach((marker) => {
      console.log("Supermarket Marker:", marker);
      markers.push(<AdvancedMarker position={marker.position} title={ marker.title} />);
    });
  }, [superMarketMarkers]);
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
          {markers}
        </Map>
      </div>
    </>
  );
}
