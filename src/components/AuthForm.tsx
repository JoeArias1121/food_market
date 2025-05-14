"use client";
import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    console.log("Handle submit called");
  };
  console.log("AuthForm rendered");
  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="123@gmail.com"
            required
            disabled={isPending}
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
            disabled={isPending}
          />
        </div>
        <CardFooter className="w-full mt-4 flex flex-col gap-6">
          <Button className="w-full">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : isLoginForm ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-xs">
            {isLoginForm
              ? "Don't have an account yet? "
              : "Already have an account? "}
            <Link
              href={isLoginForm ? "/signup" : "/login"}
              className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </Link>
          </p>
        </CardFooter>
      </CardContent>
    </form>
  );
}
