"use client";
import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import { Card } from "@/components/ui/card";
import GoogleMap from "@/components/GoogleMap";
import { Slider } from "@/components/ui/slider";

export default function Search() {
  //const [distance, setDistance] = useState([0]);
  // <Slider value={distance} />
  const [search, setSearch] = useState("");
  return (
    <>
      <h1>Search</h1>
      <div className="flex w-1/4 flex-col">
        <SearchInput search={ search } setSearch={ setSearch } />
        <GoogleMap search={ search } />
      </div>
    </>
  );
}
