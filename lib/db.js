import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextauth:nextAuth1234@cluster1.by0xsp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  );
  return client;
}
