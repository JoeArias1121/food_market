import React from 'react'
import SearchInput from '@/components/SearchInput'
import { Card } from '@/components/ui/card'

export default function Search() {
  return (
    <>
      <h1>Search</h1>
      <SearchInput />
      <Card className="flex items-center justify-center mt-5">
        <h1>Map</h1>
      </Card>
    </>
  )
}
