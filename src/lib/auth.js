// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";

// const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//     // if using credentials
//     // Credentials({
//     //   credentials: {
//     //     username: { label: "Username" },
//     //     password: { label: "Password", type: "password" },
//     //   },
//     //   async authorize({ request }) {
//     //     const response = await fetch(request);
//     //     if (!response.ok) return null;
//     //     return (await response.json()) ?? null;
//     //   },
//     // }),
//   ],
//   callbacks: {
//     authorized({ auth, request }) {
//       // !! convert any value into a boolean
//       return !!auth?.user;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

// // export const {
// //   handlers: { GET, POST },
// //   auth,
// //   signIn,
// //   signOut,
// // } = NextAuth(authConfig);

// const nextAuthInstance = NextAuth(authConfig);

// export const auth = nextAuthInstance.auth;
// export const signIn = nextAuthInstance.signIn;
// export const signOut = nextAuthInstance.signOut;
// export const handlers = nextAuthInstance.handlers;

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Call YOUR backend login API
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const data = await res.json();
          
          // Return user data with backend JWT token
          return {
            id: data.data.user._id,
            email: data.data.user.email,
            name: data.data.user.name,
            image: data.data.user.photo,
            backendToken: data.token, // CRITICAL: Store backend JWT
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // First sign in
      if (user) {
        token.backendToken = user.backendToken;
        token.userId = user.id;
      }

      // Handle Google OAuth
      if (account?.provider === 'google') {
        // Call your backend to create/login user
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/google-auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            googleId: account.providerAccountId,
          }),
        });
        
        const data = await res.json();
        token.backendToken = data.token;
      }

      return token;
    },
    async session({ session, token }) {
      // Add backend token to session
      session.backendToken = token.backendToken;
      session.user.id = token.userId;
      return session;
    },
  },
};

const nextAuthInstance = NextAuth(authConfig);

export const auth = nextAuthInstance.auth;
export const signIn = nextAuthInstance.signIn;
export const signOut = nextAuthInstance.signOut;
export const handlers = nextAuthInstance.handlers;