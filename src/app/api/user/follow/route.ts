import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  const currentUser = await getCurrentUser();

  if (!userId || typeof userId !== "string") return new NextResponse("Invalid id", { status: 400 });
  if (!currentUser) return new NextResponse("Unauthorized", { status: 403 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    let userFollowerIds = [...(user.followerIds || [])];

    let currentUserFollowingIds = [...(currentUser.followingIds || [])];

    if (userFollowerIds.includes(currentUser.id)) {
      return new NextResponse("Bad request", { status: 400 });
    }

    userFollowerIds.push(currentUser.id);
    currentUserFollowingIds.push(user.id);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followerIds: userFollowerIds,
      },
    });

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: currentUserFollowingIds,
      },
    });

    return new NextResponse("Successful", { status: 200 });
  } catch (err: unknown) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = await req.json();
  const currentUser = await getCurrentUser();

  if (!userId || typeof userId !== "string") return new NextResponse("Invalid id", { status: 400 });
  if (!currentUser) return new NextResponse("Unauthorized", { status: 403 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    let userFollowerIds = [...(user.followerIds || [])];

    let currentUserFollowingIds = [...(currentUser.followingIds || [])];

    userFollowerIds = userFollowerIds.filter((id) => id !== currentUser.id);
    currentUserFollowingIds = currentUserFollowingIds.filter((id) => id !== user.id);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followerIds: userFollowerIds,
      },
    });

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: currentUserFollowingIds,
      },
    });

    return new NextResponse("Successful", { status: 200 });
  } catch (err: unknown) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
