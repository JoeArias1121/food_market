import React from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { Button } from '@/components/ui/button'

type Props = {
  searchOrigin: { lat: number; lng: number } | null
  range: number
  superMarkets: any[]
  setSuperMarkets: (superMarkets: any[]) => void
}

export default function SupermarketList({ searchOrigin, range, superMarkets, setSuperMarkets }: Props) {
  
  const handleSearch = async () => { 
    // Implement search logic here
    console.log("Searching for supermarkets...");
    try {
      if(!searchOrigin) {
        throw new Error("Search origin is not set");
      }

      const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;

      const request = {
        fields: ['displayName', 'location', 'businessStatus'],
        locationRestriction: {
          center: searchOrigin,
          radius: range,
        },
        // optional parameters
        type: 'supermarket',
        maxResultCount: 10,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
        language: 'en-US',
      };
      const { places } = await Place.searchNearby(request);

      if (!places.length) {
        throw new Error("No supermarkets found in the specified area.");
      }

        const { LatLngBounds } = (await google.maps.importLibrary(
          "core",
        )) as google.maps.CoreLibrary;
        const bounds = new LatLngBounds();

        // Loop through and get all the results.
        // TODO: Migrate to new map api to show map
        places.forEach((place) => {
          setSuperMarkets([
            ...superMarkets,
            {
              displayName: place.displayName,
              position: place.location,
              title: place.displayName,
            }
          ]);

          bounds.extend(place.location as google.maps.LatLng);
          console.log(place);
        });

        //map.fitBounds(bounds);
    } catch (error) {
    console.error("Error searching for supermarkets:", error);
  }
  }
  return (
    <>
      <Button className="" onClick={handleSearch}>Search</Button>
      <div id="supermarket-list" className="flex flex-col gap-2">
        {}
      </div>
    </>
  )
}
