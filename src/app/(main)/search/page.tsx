//import {useState} from "react";
import SearchInput from "@/components/SearchInput";
import { Card } from "@/components/ui/card";
import GoogleMap from "@/components/GoogleMap";
import { Slider } from "@/components/ui/slider";

export default function Search() {
  //const [distance, setDistance] = useState([0]);
  // <Slider value={distance} />
  return (
    <>
      <h1>Search</h1>
      <div className="flex w-1/4 flex-col">
        <SearchInput />
        <GoogleMap />
      </div>
    </>
  );
}
