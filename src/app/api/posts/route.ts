import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  try {
    if (userId) {
      const posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          comments: true,
          user: {
            select: {
              name: true,
              username: true,
              profileImage: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 30,
      });

      return NextResponse.json(posts, { status: 200 });
    } else {
      const posts = await prisma.post.findMany({
        include: {
          comments: true,
          user: {
            select: {
              name: true,
              username: true,
              profileImage: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 30,
      });

      return NextResponse.json(posts, { status: 200 });
    }
  } catch (err: unknown) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { body }: any = await req.json();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!body) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (err: unknown) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
