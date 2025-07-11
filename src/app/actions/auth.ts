"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

export const logoutAction = async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut(); // signing out user on supabase auth
    if (error) {
      throw new Error(error.message);
    }
    const cookieStore = await cookies();
    cookieStore.delete("user_id")
    // user definitely signed out
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    return handleError(error);
    // Show error message to user through toast
  }
};

export const loginAction = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw new Error("Email and/or password missing, both are required");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    const cookieStore = await cookies();
    cookieStore.set("user_id", user.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    }); // Set the user ID in cookies

    const response = await axios.get("/api/user", {
      params: {
        email,
        password,
      },
    });

    const user = response.data;
    if (!user) {
      throw new Error("User not found");
    }

    revalidatePath("/");
    redirect("/"); // Redirect to the home page or any other page after login
  } catch (error) {
    return handleError(error);
  }
};

export const signupAction = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    // prisma.create user
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    const cookieStore = await cookies();
    cookieStore.set("user_id", user.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    }); // Set the user ID in cookies

    const response = await axios.post('/api/user', {
      params: {
        email,
        password,
      }
    })

    const user = response.data;

    if (!user) {
      throw new Error("User not found");
    }

    revalidatePath("/");
    redirect("/"); // Redirect to the home page or any other page after signup
  } catch (error) {
    return handleError(error);
  }
};

export const handleError = async (error: unknown) => { 
  console.error("An error occurred:", error);
  if (error instanceof Error) { 
    return { errorMessage: error.message };
  }
  return { errorMessage: "An error occurred" };
}