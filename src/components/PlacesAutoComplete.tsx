import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

type Props = {
  setSearchOrigin: (coords: { lat: number; lng: number }) => void;
}

export default function PlacesAutocomplete({ setSearchOrigin }: Props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    debounce: 500,
    requestOptions: {
      // can add locationBias here by specifying lat and lng
    },
  });

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address: any) => {
    setValue(address, false);

    getGeocode({ address: address }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setSearchOrigin({ lat, lng });
      console.log("📍 Coordinates: ", { lat, lng });
    }).catch((error) => {
      console.error("😱 Error: ", error);
    });
  };

  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo" className="">
      <ComboboxInput
        value={value}
        onChange={handleInput}
        disabled={!ready}
        className="bg-blue-400"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                className="bg-green-800"
                key={place_id}
                value={description}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
