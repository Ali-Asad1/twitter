import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function GET(req: Request, { params }: { params: { username: string } }) {
  const { username: reqUsername } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: reqUsername,
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        profileImage: true,
        coverImage: true,
        bio: true,
        followingIds: true,
        followerIds: true,
        posts: true,
        createdAt: true,
      },
    });

    if (!user) {
      return new NextResponse("user not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
