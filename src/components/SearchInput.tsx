'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

type props = {
  search: string
  setSearch: (search: string) => void
}

export default function SearchInput({ search, setSearch }: props) {
  return (
    <div className="flex items-center justify-center">
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Search className="" />
    </div>
  );
}
