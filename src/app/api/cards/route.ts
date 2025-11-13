// src/app/api/cards/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseCardSlug } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  const card = parseCardSlug(slug);

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}
