import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  const { postId: reqPostId } = params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: reqPostId,
      },
      include: {
        comments: {
          include: {
            user: {
              select: {
                name: true,
                username: true,
                profileImage: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });

    if (!post) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err: unknown) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
