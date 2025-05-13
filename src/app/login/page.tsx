import React from 'react'
import AuthForm from '@/components/AuthForm'
import { login } from '@/app/actions/auth'

export default async function page() {
  const handleSubmit = async (formData: FormData) => {
    const res = await login(formData)
  }

  return (
    <AuthForm handleSubmit={handleSubmit} />
  )
}
