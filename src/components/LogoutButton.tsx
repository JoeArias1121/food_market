'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {

  function handleLogout() { 
    // Add your logout logic here
    console.log('User logged out')
  }
  return (
    <Button onClick={handleLogout} variant="outline">
      Log out
    </Button>
  )
}
