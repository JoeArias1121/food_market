'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function LogoutButton() {

  function handleLogout() { 
    // Add your logout logic here
    console.log('User logged out')
    toast.success("Logged out successfully", {
      description: "You have been logged out.",
    })
  }
  return (
    <Button onClick={handleLogout} variant="outline">
      Log out
    </Button>
  )
}
