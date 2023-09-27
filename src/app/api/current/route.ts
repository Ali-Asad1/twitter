import serverAuth from "@/libs/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  try {
    const { currentUser } = await serverAuth(request);
    return NextResponse.json(currentUser);
  } catch (err) {
    console.log(err);
    return new Response(null, {
      status: 400,
      statusText: "invalid request",
    });
  }
}
