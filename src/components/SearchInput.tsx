'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function SearchInput() {
  return (
    <div className="flex items-center justify-center">
      <Search className="" />
      <Input />
    </div>
  )
}
