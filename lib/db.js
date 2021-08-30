import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ccdmq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

export async function connectToDB() {
  try {
    const client = await MongoClient.connect(connectionString);
    return client;
  } catch (error) {}
}
