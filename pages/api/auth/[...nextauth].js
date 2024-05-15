import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",

      authorize: async (credentials) => {
        const enteredEmail = credentials.email;
        const enteredPassword = credentials.password;
        const client = await connectToDatabase();
        const db = client.db("auth-demo");
        const user = await db
          .collection("users")
          .findOne({ email: enteredEmail });

        if (!user) {
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(enteredPassword, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
