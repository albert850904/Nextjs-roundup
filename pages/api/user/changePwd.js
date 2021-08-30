import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/authUtil";
import { connectToDB } from "../../../lib/db";

async function changePwdHandler(req, res) {
  switch (req.method) {
    case "PATCH":
    case "PUT":
    case "POST":
      const session = await getSession({ req });
      // 檢查user是否登入
      if (!session) {
        res.status(401).json({ message: "user not logged in" });
        return;
      }

      const userEmailInToken = session.user.email;
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;

      const client = await connectToDB();
      const userCollection = client.db("next-auth").collection("users");
      const userInfo = await userCollection.findOne({
        email: userEmailInToken,
      });
      if (!userInfo) {
        res.status(404).json({ message: "User not found" });
        client.close();
        return;
      }

      const currentPassword = userInfo.password;
      const isEqualPassword = await verifyPassword(
        oldPassword,
        currentPassword
      );
      if (!isEqualPassword) {
        res.status(403).json({ message: "User password incorrect" });
        client.close();
        return;
      }

      const hashedPassword = await hashPassword(newPassword);

      const result = await userCollection.updateOne(
        { email: userEmailInToken },
        { $set: { password: hashedPassword } }
      );

      client.close();
      res.status(200).json({ message: "password updated" });
      break;
    default:
      break;
  }
}

export default changePwdHandler;
