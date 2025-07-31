"use client";
import { useEffect, useState, useRef } from "react";
import { AdvancedMarker, APIProvider } from "@vis.gl/react-google-maps";

type Props = {
  search: string;
  mapReady: boolean;
  setMapReady: (ready: boolean) => void;
  searchOrigin?: { lat: number; lng: number } | null;
  setSearchOrigin: (origin: { lat: number; lng: number } | null) => void;
  superMarkets: any[];
  searchRadius: number;
};

export default function GoogleMap({
  search,
  setMapReady,
  mapReady,
  searchOrigin,
  superMarkets,
  searchRadius,
  setSearchOrigin,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const mapAdvancedMarkersRef = useRef<
    google.maps.marker.AdvancedMarkerElement[]
  >([]);
  // TODO: Ask about ref and how it works especially with dom manipulation and how they work with elements that are not rendered yet

  useEffect(() => {
    // Get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchOrigin({
            lat: searchOrigin ? searchOrigin.lat : position.coords.latitude,
            lng: searchOrigin ? searchOrigin.lng : position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  // This sees if the map is ready and initializes it
  useEffect(() => {
    if (!mapRef.current) {
      console.log("Map ref is not set yet");
      return;
    } else if (!searchOrigin) {
      console.log("Search origin is not set yet");
      return;
    }
    // At this point we're ready to initialize the map
    initMap();
  }, [searchOrigin]);
  // TODO: Find out why useEffect does not accept async functions also ask if you can have async functions in regular functions
  // This is to update the markers when the user searches for supermarkets and it adds them to the map
  useEffect(() => {
    // Probably won't need this but good to have in case if future changes
    // TODO: Use variable that checks if the map is ready and have search bar use that
    if (!mapRef.current || !googleMapRef.current) {
      console.log("Map ref is not set yet");
      return;
    }
    const setUpMarkers = async () => {
      mapAdvancedMarkersRef.current.forEach((marker) => {
        marker.map = null; // Clear previous markers
      });
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;
      superMarkets.forEach((superMarket) => {
        const marker = new AdvancedMarkerElement({
          position: superMarket.position,
          title: superMarket.title,
          map: googleMapRef.current,
        });
        mapAdvancedMarkersRef.current.push(marker);
      });
    };
    setUpMarkers();
  }, [superMarkets]);

  // This is to initialize the map when the search origin is set
  async function initMap() {
    // This won't be needed because of checks before initialization but good to protect against future changes
    if (!mapRef.current || !searchOrigin) {
      console.log("Map ref or search origin is not set yet");
      return;
    }
    const { Map } = (await google.maps.importLibrary(
      "maps",
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker",
    )) as google.maps.MarkerLibrary;
    // useRef for map element
    googleMapRef.current = new Map(mapRef.current, {
      center: searchOrigin,
      zoom: 10,
      mapId: process.env.NEXT_PUBLIC_MAP_ID as string,
    });

    const marker = new AdvancedMarkerElement({
      position: searchOrigin,
      map: googleMapRef.current,
      title: "Center of search",
    });
  }

  return (
    <>
      <div ref={mapRef} className="flex h-80" />
    </>
  );
}
