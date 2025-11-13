import { NextRequest, NextResponse } from "next/server";
import { getCard } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;
  const card = getCard(slug);

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}
