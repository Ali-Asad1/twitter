import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

import prisma from "@/libs/prismadb";

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { avatar } = body;
  if (!avatar) {
    return new NextResponse("Missing info", { status: 400 });
  }

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        profileImage: avatar,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
