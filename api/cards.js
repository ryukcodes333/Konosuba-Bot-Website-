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
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const db = await getDb();
  const page = Math.max(1, parseInt(req.query.page || "1"));
  const limit = Math.min(parseInt(req.query.limit || "24"), 48);
  const tier = req.query.tier;
  const search = req.query.search;

  const filter = {};
  if (tier && tier !== "all") filter.rarity = tier;
  if (search) filter.name = { $regex: search, $options: "i" };

  const total = await db.collection("cards").countDocuments(filter);
  const cards = await db.collection("cards")
    .find(filter)
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return res.json({ cards, total, page, limit });
}
