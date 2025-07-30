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
  const [searchRadius, setSearchRadius] = useState(2);
  const [superMarkets, setSuperMarkets] = useState<any[]>([]);
  return (
    <>
      <h1>Search</h1>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
        libraries={["places"]}
      >
        {mapReady && <PlacesAutocomplete setSearchOrigin={setSearchOrigin} />}
        <div className="flex w-1/4 flex-col">
          <SearchInput search={search} setSearch={setSearch} />
          <GoogleMap
            mapReady={mapReady}
            superMarkets={superMarkets}
            setMapReady={setMapReady}
            search={search}
            searchOrigin={searchOrigin}
            setSearchOrigin={setSearchOrigin}
            searchRadius={searchRadius}
          />
        </div>
        <SupermarketList searchOrigin={searchOrigin} range={2} superMarkets={ superMarkets} setSuperMarkets={setSuperMarkets} />
      </APIProvider>
    </>
  );
}
