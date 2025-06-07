import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import LogoutButton from "@/components/LogoutButton";
import { Toaster } from "@/components/ui/sonner";

export default function Header() {
  const user = false; // Replace with actual user authentication logic
  return (
    <header className="flex justify-between bg-slate-900 p-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Food Market</h1>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <LogoutButton />
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
