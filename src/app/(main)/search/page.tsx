import React from "react";
import SearchInput from "@/components/SearchInput";
import { Card } from "@/components/ui/card";
import GoogleMap from "@/components/GoogleMap";

export default function Search() {
  return (
    <>
      <h1>Search</h1>
      <div className="flex flex-col w-1/4">
        <SearchInput />
        <GoogleMap />
      </div>
    </>
  );
}
