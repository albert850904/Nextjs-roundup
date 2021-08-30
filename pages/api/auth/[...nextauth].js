import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/authUtil";
import { connectToDB } from "../../../lib/db";

export default NextAuth({
  // 用什麼auth 方式
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      // credentials: next auth gen 一個forum 給你
      // 收到login req 時會自動幫你跑的callback
      async authorize(credentials) {
        // 裏面跑自己的authorization logic
        const client = await connectToDB();

        const usersCollection = client.db("next-auth").collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("Email not registered");
        }
        const isValidResult = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValidResult) {
          client.close();
          throw new Error("password incorrect");
        }
        client.close();

        // 回傳object會告訴next auth 代表authenticatin success
        return { email: user.email };
      },
    }),
  ],
});
