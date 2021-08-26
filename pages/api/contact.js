import { MongoClient } from "mongodb";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { email, name, message } = req.body;
      const invalidEmail = !email || !email.includes("@");
      const invalidName = !name || name.trim() === "";
      const invalidMessage = !message || message.trim() === "";
      if (invalidEmail || invalidName || invalidMessage) {
        res.status(422).json({ message: "invlid input" });
        return;
      }

      // store in db
      const newMessage = {
        email,
        name,
        message,
      };

      let client;

      const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ccdmq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

      try {
        client = await MongoClient.connect(connectionString);
      } catch (error) {
        res
          .status(500)
          .json({ error: "CONNECT_DB_ERROR", message: "db connection failed" });
      }

      const db = client.db("next-course-usage");

      try {
        const result = await db.collection("messages").insertOne(newMessage);
        newMessage.id = result.insertedId;
      } catch (error) {
        client.close();
        res
          .status(500)
          .json({ error: "INSERT_FAILED", message: "db insertion failed" });
      } finally {
        res.status(201).json({ message: newMessage });
        client.close();
      }

    default:
      break;
  }
}

export default handler;
