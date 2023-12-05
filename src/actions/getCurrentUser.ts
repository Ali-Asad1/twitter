import getSession from "./getSession";
import prisma from "@/libs/prismadb";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
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

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export default getCurrentUser;
