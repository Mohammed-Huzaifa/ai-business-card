// src/lib/store.ts

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

// In-memory store (works on Vercel)
const cards: Card[] = [];

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

  const card: Card = { slug, ...data };
  cards.push(card);

  return card;
}

export function getCard(slug: string): Card | null {
  return cards.find((c) => c.slug === slug) ?? null;
}
