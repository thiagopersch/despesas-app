import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "login", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            `${process.env.API_URL}/auth/sigin`,
            {
              login: credentials?.login,
              password: credentials?.password,
            },
          );
          console.log({ response });

          if (response.status === 200) {
            return response.data;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: true,
  callbacks: {
    async session({ session, token }) {
      session.jwt = token.jwt;
      session.user.id = token.id;

      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
