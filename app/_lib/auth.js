import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // if using credentials
    // Credentials({
    //   credentials: {
    //     username: { label: "Username" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize({ request }) {
    //     const response = await fetch(request);
    //     if (!response.ok) return null;
    //     return (await response.json()) ?? null;
    //   },
    // }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      // !! convert any value into a boolean
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth(authConfig);

const nextAuthInstance = NextAuth(authConfig);

export const auth = nextAuthInstance.auth;
export const signIn = nextAuthInstance.signIn;
export const signOut = nextAuthInstance.signOut;
export const handlers = nextAuthInstance.handlers;
