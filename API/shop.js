const SHOP_ITEMS = [
  { key: "sword", name: "Sword", price: 500, type: "weapon", emoji: "⚔️", description: "A sharp blade for close combat." },
  { key: "shield", name: "Shield", price: 400, type: "armor", emoji: "🛡️", description: "Protect yourself from enemy attacks." },
  { key: "bow", name: "Bow", price: 350, type: "weapon", emoji: "🏹", description: "Strike from a distance." },
  { key: "dagger", name: "Dagger", price: 300, type: "weapon", emoji: "🗡️", description: "Quick and deadly at close range." },
  { key: "staff", name: "Magic Staff", price: 600, type: "weapon", emoji: "🪄", description: "Channel arcane power." },
  { key: "trident", name: "Trident", price: 550, type: "weapon", emoji: "🔱", description: "Command the seas." },
  { key: "chainmail", name: "Chain Mail", price: 450, type: "armor", emoji: "🥋", description: "Flexible yet tough armor." },
  { key: "helmet", name: "Helmet", price: 300, type: "armor", emoji: "⛑️", description: "Protect your head." },
  { key: "boots", name: "Speed Boots", price: 250, type: "armor", emoji: "👢", description: "+5 speed in dungeons." },
  { key: "potion", name: "Health Potion", price: 100, type: "consumable", emoji: "🧪", description: "Restore 50 HP instantly." },
  { key: "elixir", name: "Elixir", price: 300, type: "consumable", emoji: "✨", description: "Full HP restore." },
  { key: "bomb", name: "Bomb", price: 200, type: "consumable", emoji: "💣", description: "Deal AOE damage in dungeons." },
  { key: "antidote", name: "Antidote", price: 80, type: "consumable", emoji: "💊", description: "Cure poison status." },
  { key: "pickaxe", name: "Pickaxe", price: 400, type: "tool", emoji: "⛏️", description: "Mine resources for crafting." },
  { key: "fishingrod", name: "Fishing Rod", price: 350, type: "tool", emoji: "🎣", description: "Catch rare fish for XP." },
  { key: "shovel", name: "Shovel", price: 280, type: "tool", emoji: "🪛", description: "Dig for buried loot." },
  { key: "map", name: "Dungeon Map", price: 500, type: "tool", emoji: "🗺️", description: "Navigate dungeons safely." },
  { key: "ring", name: "Power Ring", price: 700, type: "accessory", emoji: "💍", description: "+10 attack permanently." },
  { key: "amulet", name: "Amulet", price: 650, type: "accessory", emoji: "📿", description: "+10 defense permanently." },
  { key: "cape", name: "Shadow Cape", price: 800, type: "accessory", emoji: "🧣", description: "+8 speed, rare drop boost." },
  { key: "gloves", name: "Combat Gloves", price: 400, type: "accessory", emoji: "🥊", description: "+5 attack, crit chance." },
  { key: "pokeball", name: "Pokéball", price: 150, type: "tool", emoji: "🎱", description: "Catch wild Pokémon." },
  { key: "greatball", name: "Great Ball", price: 300, type: "tool", emoji: "🔵", description: "1.5x catch rate." }
];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const type = req.query.type;
  const items = type && type !== "all" ? SHOP_ITEMS.filter(i => i.type === type) : SHOP_ITEMS;
  return res.json(items);
}
