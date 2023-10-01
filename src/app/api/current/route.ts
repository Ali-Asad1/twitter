import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentUser: any = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(currentUser);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Error", { status: 500 });
  }
}
