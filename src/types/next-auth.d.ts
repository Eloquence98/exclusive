import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  // 1. Extend the Session object
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  // 2. Extend the User object (available in callbacks)
  interface User extends DefaultUser {
    id: string;
    role: string;
    backendToken: string;
  }
}

declare module "next-auth/jwt" {
  // 3. Extend the JWT token object
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    backendToken: string;
  }
}
