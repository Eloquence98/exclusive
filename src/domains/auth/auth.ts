import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth;
      const isOnDashboard = nextUrl.pathname.startsWith("/me");
      const isOnLogin = nextUrl.pathname === "/login";

      if (isOnDashboard) return isLoggedIn;
      if (isOnLogin && isLoggedIn)
        return Response.redirect(new URL("/me", nextUrl));
      return true;
    },
    async jwt({ token, account, profile }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
});
