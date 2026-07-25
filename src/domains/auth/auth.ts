import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { syncGoogleUser } from "../customer/customer.api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isOnDashboard = nextUrl.pathname.startsWith("/me");
      const isOnLogin = nextUrl.pathname === "/login";

      if (isOnDashboard) return !!auth;
      if (isOnLogin && auth) {
        return Response.redirect(new URL("/me", nextUrl));
      }

      return true;
    },

    async signIn({ user, account }) {
      try {
        const res = await syncGoogleUser({
          photo: user.image,
          idToken: account?.id_token,
        });

        user.backendToken = res.token;
        user.id = res.data.id;
        user.role = res.data.role;

        return true;
      } catch {
        return false;
      }
    },

    async jwt({ token, user }) {
      // Runs after sign in
      if (user) {
        token.backendToken = user.backendToken;
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;

      return session;
    },
  },
});
