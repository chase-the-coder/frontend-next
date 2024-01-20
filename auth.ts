import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { post } from "./utils/apiClient";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const response = await post({
          endpoint: "/users/login",
          data: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        if (response.status === 200 && response.data) {
          const { id, email, token } = response.data;
          const user = {
            id,
            email,
            token,
          };
          return user;
        } else {
          console.log("something went wrong");

          throw new Error("Could not log you in!");
        }
      },
    }),
  ],
});
