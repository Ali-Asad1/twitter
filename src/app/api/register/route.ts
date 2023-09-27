import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export async function POST(request: NextRequest) {
  try {
    const { email, username, name, password }: any = request.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return new Response(null, {
      status: 400,
      statusText: "invalid request",
    });
  }
}
