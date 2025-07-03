import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const PlacesAutocomplete = () => {
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

  const handleSelect = (val: any) => {
    setValue(val, false);
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
export default PlacesAutocomplete;
