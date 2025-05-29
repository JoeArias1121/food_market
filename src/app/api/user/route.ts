import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("user_id");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { email, name, password } = await request.json();
  if (!email || !name || !password) {
    return NextResponse.json({ error: "Email, name, and password are required" }, { status: 400 });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await hashPassword(password), // use library to hash password
      }
    })
    if (!user) {
      return NextResponse.json({ error: "User creation failed" }, { status: 500 });
    }
    return NextResponse.json(user, { status: 201 });
  } catch (error) { 
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}