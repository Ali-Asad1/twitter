import { UserType } from "@/types/user.type";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession;
  }

  interface User extends UserType {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
  }
}
