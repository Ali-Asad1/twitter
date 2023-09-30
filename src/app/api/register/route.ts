import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

interface ReqBody {
  email: string;
  name: string;
  username: string;
  password: string;
}

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, username, password }: ReqBody = body;

    if (!email || !name || !username || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          errors: {
            password:
              "Your password needs to contain one uppercase letter, one symbol, and a number",
          },
        },
        { status: 400, statusText: "bad request" }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      if (error.meta.target === "User_email_key") {
        return NextResponse.json(
          {
            errors: {
              email: "Email has already been taken",
            },
          },
          { status: 400, statusText: "bad request" }
        );
      } else if (error.meta.target === "User_username_key") {
        return NextResponse.json(
          {
            errors: {
              username: "Username has already been taken try another one!",
            },
          },
          { status: 400, statusText: "bad request" }
        );
      }
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}
