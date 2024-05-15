import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  console.clear();
  console.log("Change PW:", req.method);

  if (req.method !== "PATCH") return;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  // console.log(session);

  const { oldPassword, newPassword } = req.body;
  const email = session.user.email;

  if (
    newPassword.length < 6 ||
    oldPassword.length < 6 ||
    oldPassword === newPassword
  ) {
    res.status(422).json({ message: "Invalid Input!" });
    return;
  }

  console.log("EMAIL: ", email);
  console.log("ENTERED OLD PASSWORD: ", oldPassword);
  console.log("ENTERED NEW PASSWORD: ", newPassword);

  const client = await connectToDatabase();
  const userCollection = client.db("auth-demo").collection("users");

  const user = await userCollection.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const passwordAreEqual = await verifyPassword(oldPassword, user.password);

  if (!passwordAreEqual) {
    res.status(403).json({ message: "Invalid password" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  await userCollection.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "Password updated successfully" });
}

export default handler;
