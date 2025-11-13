import { NextRequest, NextResponse } from "next/server";
import { createCard } from "@/lib/store";

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

    const card = createCard({
      name,
      company,
      title,
      email,
      phone,
      avatarUrl,
      agentUrl,
    });

    // Get base URL from request origin
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.hostname}`;

    return NextResponse.json(
      {
        card,
        cardUrl: `${baseUrl}/card/${card.slug}`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Server error", details: err instanceof Error ? err.message : err },
      { status: 500 }
    );
  }
}
