import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            return null;
          }

          const data = await res.json();

          return {
            id: data.data.user._id,
            email: data.data.user.email,
            name: data.data.user.name,
            image: data.data.user.photo 
              ? `${API_URL.replace('/api/v1', '')}/img/users/${data.data.user.photo}`
              : null,
            role: data.data.user.role,
            backendToken: data.token,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth
      if (account?.provider === "google") {
        try {
          // Call backend to create/login user with Google
          const res = await fetch(`${API_URL}/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profile.name,
              email: profile.email,
              // Backend should handle Google users specially
              // or you can create a separate endpoint
            }),
          });

          if (res.ok) {
            const data = await res.json();
            user.backendToken = data.token;
            user.id = data.data.user._id;
            user.role = data.data.user.role;
          }
        } catch (error) {
          console.error("Google sign in error:", error);
          // Continue anyway - NextAuth will handle it
        }
      }
      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user) {
        token.backendToken = user.backendToken;
        token.userId = user.id;
        token.role = user.role;
      }

      // Handle session update
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId;
        session.user.role = token.role;
        session.backendToken = token.backendToken;
      }
      return session;
    },

    authorized({ auth, request }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60, // 90 days (match backend)
  },
};

const nextAuthInstance = NextAuth(authConfig);

export const auth = nextAuthInstance.auth;
export const signIn = nextAuthInstance.signIn;
export const signOut = nextAuthInstance.signOut;
export const handlers = nextAuthInstance.handlers;