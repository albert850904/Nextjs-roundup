import { hashPassword } from "../../../lib/authUtil";
import { connectToDB } from "../../../lib/db";

async function signupHandler(req, res) {
  switch (req.method) {
    case "POST":
      const data = req.body;
      const { email, password } = data;
      const invalidEmail = !email || !email.includes("@");
      const invalidPwd = !password || password.trim().length < 7;
      if (invalidEmail || invalidPwd) {
        res.status(422).json({ message: "invalid input" });
        return;
      }
      const client = await connectToDB();
      const db = client.db("next-auth");

      // 檢查是否已經有此user
      const existingUser = db.collection("users").findOne({ email });
      if (existingUser) {
        res
          .status(500)
          .json({ error: "USER_ALREADY_EXISTED", message: "user existed" });
        client.close();
        return;
      }
      const hashedPassword = await hashPassword(password);

      try {
        // 記得不要store plain password in db >> 要加密
        const result = await db
          .collection("users")
          .insertOne({ email, password: hashedPassword });
        result.id = result.insertedId;
      } catch (error) {
        client.close();
        res
          .status(500)
          .json({ error: "INSERT_FAILED", message: "db insertion failed" });
      } finally {
        res.status(201).json({ message: "user created" });
        client.close();
      }
    default:
      break;
  }
}

export default signupHandler;
