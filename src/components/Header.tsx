import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  const user = null; // Replace with actual user authentication logic
  return (
    <header className="flex justify-between">
      <div className="flex items-center">
        <h1>Food Market</h1>
      </div>
      <div className="flex items-center gap-4">
        {user! ? (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link href="/signout">Sign out</Link>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
