"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const logout = async () => {
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
    console.error("Error signing out:", error);
    // Show error message to user through toast
  }
};

export const login = async (formData: FormData) => {
  try {
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();
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
    revalidatePath("/");
    redirect("/"); // Redirect to the home page or any other page after login
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const signup = async (formData: FormData) => {
  try {
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();
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
    revalidatePath("/");
    redirect("/"); // Redirect to the home page or any other page after signup
  } catch (error) {
    console.error("Error signing up:", error);
  }
};
