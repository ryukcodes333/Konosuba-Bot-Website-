import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

async function getDb() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("test");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  const db = await getDb();
  const { action } = req.query;

  if (action === "login" && req.method === "POST") {
    const { phone, password } = req.body;
    if (!phone || !password) return res.status(400).json({ error: "Phone and password required" });

    const cleanPhone = phone.replace(/\D/g, "");
    const user = await db.collection("users").findOne({
      phone: cleanPhone
    });

    if (!user) return res.status(401).json({ error: "User not found. Register on WhatsApp first using .reg <name> | <password>" });
    if (!user.password) return res.status(401).json({ error: "No password set. Re-register on WhatsApp using .reg <name> | <password>" });
    if (user.password !== password) return res.status(401).json({ error: "Wrong password" });
    if (user.banned) return res.status(403).json({ error: "Account banned" });

    const { password: _p, ...safeUser } = user;
    return res.json({ success: true, user: safeUser });
  }

  if (action === "me" && req.method === "GET") {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "No token" });

    const phone = Buffer.from(auth.replace("Bearer ", ""), "base64").toString();
    const cleanPhone = phone.replace(/\D/g, "");
    const user = await db.collection("users").findOne({ phone: cleanPhone });
    if (!user) return res.status(401).json({ error: "Not found" });

    const { password: _p, ...safeUser } = user;
    return res.json(safeUser);
  }

  return res.status(404).json({ error: "Unknown action" });
}
