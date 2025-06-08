"use client";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

export default function GoogleMap() {
  const position = { lat: 61.2176, lng: -149.8997 };
  return (
    <APIProvider
      className="h-full"
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
    >
      <div className="flex h-80">
        <Map className="h-full w-full" center={position} zoom={10} mapId={"f4c0b1d3a2b6c5e7"}>
          <AdvancedMarker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
}
