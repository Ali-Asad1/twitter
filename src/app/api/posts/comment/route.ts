import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const postId = url.searchParams.get("postId");

  if (!postId || typeof postId !== "string") return new NextResponse("Invalid id", { status: 400 });

  try {
    const { body }: { body: string } = await req.json();
    if (!body.trim()) return new NextResponse("Missing body", { status: 400 });

    const currentUser = await getCurrentUser();
    if (!currentUser) return new NextResponse("Unauthorized", { status: 403 });

    const comments = await prisma.comment.create({
      data: {
        body,
        postId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(comments);
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
