// src/app/api/cards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createCard } from "@/lib/store";

export async function POST(req: NextRequest) {
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

  // Build base URL from the incoming request
  const url = new URL(req.url);
  const baseUrl = `${url.protocol}//${url.hostname}${
    url.port ? `:${url.port}` : ""
  }`;

  const cardUrl = `${baseUrl}/card/${card.slug}`;

  return NextResponse.json(
    {
      card,
      cardUrl,
    },
    { status: 201 }
  );
}
