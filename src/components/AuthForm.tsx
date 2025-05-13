import React from 'react'
import { CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AuthForm({handleSubmit}: {}) {
  return (
    <CardContent>
      <form action={handleSubmit}>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="123@gmail.com"
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="123"
            required
          />
        </div>
        <Button>Submit</Button>
      </form>
    </CardContent>
  );
}
