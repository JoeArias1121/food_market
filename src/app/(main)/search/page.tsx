"use client";
import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import { Card } from "@/components/ui/card";
import GoogleMap from "@/components/GoogleMap";
import { Slider } from "@/components/ui/slider";
import PlacesAutocomplete from "@/components/PlacesAutoComplete";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import SupermarketList from "@/app/(main)/search/SupermarketList";

export default function Search() {
  //const [range, setRange] = useState([0]);
  // <Slider value={range} />
  const [search, setSearch] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [searchOrigin, setSearchOrigin] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [superMarketMarkers, setSuperMarketMarkers] = useState<any[]>([]);
  return (
    <>
      <h1>Search</h1>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
        libraries={["places"]}
      >
        <h1>{process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}</h1>
        {mapReady && <PlacesAutocomplete setSearchOrigin={setSearchOrigin} />}
        <div className="flex w-1/4 flex-col">
          <SearchInput search={search} setSearch={setSearch} />
          <GoogleMap
            mapReady={mapReady}
            superMarketMarkers={superMarketMarkers}
            setMapReady={setMapReady}
            search={search}
            searchOrigin={searchOrigin}
          />
        </div>
        <SupermarketList searchOrigin={searchOrigin} range={2} superMarketMarkers={ superMarketMarkers} setSuperMarketMarkers={setSuperMarketMarkers} />
      </APIProvider>
    </>
  );
}
