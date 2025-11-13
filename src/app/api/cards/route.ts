// src/app/api/cards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createCardSlug, parseCardSlug } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, title, email, phone, avatarUrl, agentUrl } = body;

    if (!name || !company || !email || !agentUrl) {
      return NextResponse.json(
        { error: "name, company, email, and agentUrl are required" },
        { status: 400 }
      );
    }

    // Build slug that encodes the data
    const slug = createCardSlug({
      name,
      company,
      title,
      email,
      phone,
      avatarUrl,
      agentUrl,
    });

    // Reconstruct the card from the slug so the client gets full data if needed
    const card = parseCardSlug(slug);
    if (!card) {
      return NextResponse.json(
        { error: "Failed to generate card" },
        { status: 500 }
      );
    }

    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.hostname}`;

    return NextResponse.json(
      {
        card,
        cardUrl: `${baseUrl}/card/${slug}`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
