import { BASE_URL_NEXT } from "@/constants/baseUrl";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const body = JSON.stringify(credentials);
        const res = await axios.post<{
          id: string;
          status: string;
        }>(`${BASE_URL_NEXT}/auth`, body, {
          headers: { "Content-Type": "application/json" },
        });
        // If no error and we have user data, return it
        if (res.status === 200) {
          return res.data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        iat: token.iat,
        exp: token.exp,
        jti: token.jti,
      };
    },
  },
};
