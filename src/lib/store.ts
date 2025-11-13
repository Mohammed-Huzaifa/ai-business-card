// src/lib/store.ts
import fs from "fs";
import path from "path";

export type Card = {
  slug: string;
  name: string;
  title?: string;
  company: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  agentUrl: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "cards.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf8");
  }
}

function loadCards(): Card[] {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as Card[];
    }
    return [];
  } catch {
    return [];
  }
}

function saveCards(cards: Card[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(cards, null, 2), "utf8");
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function createCard(data: Omit<Card, "slug">): Card {
  const base = slugify(data.name || "card");
  const random = Math.random().toString(36).slice(2, 6);
  const slug = `${base}-${random}`;

  const cards = loadCards();
  const card: Card = { slug, ...data };
  cards.push(card);
  saveCards(cards);

  return card;
}

export function getCard(slug: string): Card | null {
  const cards = loadCards();
  return cards.find((c) => c.slug === slug) ?? null;
}
