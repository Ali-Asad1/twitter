import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const { postId }: { postId: string } = await req.json();
  const currentUser = await getCurrentUser();

  if (!postId || typeof postId !== "string") return new NextResponse("Invalid Id", { status: 400 });

  if (!currentUser) return new NextResponse("Unauthorized", { status: 403 });

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return new NextResponse("Invalid id", { status: 400 });

    let postLikeIds = [...(post.likedIds || [])];

    if (postLikeIds.includes(currentUser.id)) {
      return new NextResponse("Bad request", { status: 400 });
    }
    
    postLikeIds.push(currentUser.id);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: postLikeIds,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err: unknown) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { postId }: { postId: string } = await req.json();

  const currentUser = await getCurrentUser();

  if (!postId || typeof postId !== "string") return new NextResponse("Invalid Id", { status: 400 });

  if (!currentUser) return new NextResponse("Unauthorized", { status: 403 });

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) return new NextResponse("Invalid id", { status: 400 });

    let postLikeIds = [...(post.likedIds || [])];

    postLikeIds = postLikeIds.filter((id) => id !== currentUser.id);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: postLikeIds,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err: unknown) {
    console.log(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
