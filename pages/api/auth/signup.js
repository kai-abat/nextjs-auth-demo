import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db("auth-demo");

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  console.clear();

  const hashedPassword = await hashPassword(password);

  console.log("saving to db:", email, hashedPassword);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  console.log("Result of insert:", result);

  res.status(201).json({ message: "Created user successfully" });
  client.close();
}

export default handler;
