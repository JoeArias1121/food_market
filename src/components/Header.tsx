import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  const user = null; // Replace with actual user authentication logic
  return (
    <header className="flex justify-between bg-slate-900 p-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Food Market</h1>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <Button asChild>
            <Link href="/signout">Sign out</Link>
          </Button>
        ) : (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
