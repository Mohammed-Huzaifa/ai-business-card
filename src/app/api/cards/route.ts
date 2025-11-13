// src/app/api/cards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createCardSlug, parseCardSlug } from "@/lib/store";

// Make sure this is never prerendered as static
export const dynamic = "force-dynamic";

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

    const slug = createCardSlug({
      name,
      company,
      title,
      email,
      phone,
      avatarUrl,
      agentUrl,
    });

    const card = parseCardSlug(slug);
    if (!card) {
      return NextResponse.json(
        { error: "Failed to generate card" },
        { status: 500 }
      );
    }

    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.hostname}${
      url.port ? `:${url.port}` : ""
    }`;

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
