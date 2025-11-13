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

function slugifyName(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function toBase64Url(str: string): string {
  return Buffer.from(str, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(str: string): string {
  const padLength = (4 - (str.length % 4 || 4)) % 4;
  const padded = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLength);
  return Buffer.from(padded, "base64").toString("utf8");
}

/**
 * Create a slug that encodes the card data itself.
 * Format: "{name-slug}-{base64url(json)}"
 */
export function createCardSlug(data: Omit<Card, "slug">): string {
  const base = slugifyName(data.name || "card");
  const payload = JSON.stringify({
    name: data.name,
    title: data.title,
    company: data.company,
    email: data.email,
    phone: data.phone,
    avatarUrl: data.avatarUrl,
    agentUrl: data.agentUrl,
  });
  const encoded = toBase64Url(payload);
  return `${base}-${encoded}`;
}

/**
 * Parse a slug back into a Card object.
 */
export function parseCardSlug(slug: string): Card | null {
  const lastDash = slug.lastIndexOf("-");
  if (lastDash === -1) return null;

  const encoded = slug.slice(lastDash + 1);

  try {
    const json = fromBase64Url(encoded);
    const raw = JSON.parse(json) as Omit<Card, "slug">;
    if (!raw.name || !raw.company || !raw.email || !raw.agentUrl) {
      return null;
    }
    return {
      slug,
      ...raw,
    };
  } catch (err) {
    console.error("Failed to parse card slug:", err);
    return null;
  }
}
