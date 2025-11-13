// src/app/card/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { parseCardSlug } from "@/lib/store";
import { ChatWidget } from "@/components/ChatWidget";
import { Mail, Phone, Building2 } from "lucide-react";

type Props = {
  params: { slug: string };
};

export default function CardPage({ params }: Props) {
  const card = parseCardSlug(params.slug);

  if (!card) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-zinc-900/90 via-cardBg to-black p-[1px] shadow-card">
        <div className="rounded-3xl bg-gradient-to-b from-zinc-950/95 to-black p-5">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900">
              {card.avatarUrl ? (
                <Image
                  src={card.avatarUrl}
                  alt={card.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-zinc-200">
                  {card.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <h1 className="text-lg font-semibold tracking-tight text-white">
                {card.name}
              </h1>
              {card.title && (
                <p className="text-sm text-zinc-400">{card.title}</p>
              )}
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {card.company}
              </p>
            </div>
          </div>

          <div className="my-4 h-px bg-gradient-to-r from-transparent via-zinc-700/70 to-transparent" />

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-zinc-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900/80">
                <Mail className="h-4 w-4 text-zinc-400" />
              </div>
              <a
                href={`mailto:${card.email}`}
                className="truncate hover:text-zinc-100"
              >
                {card.email}
              </a>
            </div>

            {card.phone && (
              <div className="flex items-center gap-3 text-zinc-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900/80">
                  <Phone className="h-4 w-4 text-zinc-400" />
                </div>
                <a
                  href={`tel:${card.phone}`}
                  className="truncate hover:text-zinc-100"
                >
                  {card.phone}
                </a>
              </div>
            )}

            <div className="flex items-center gap-3 text-zinc-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900/80">
                <Building2 className="h-4 w-4 text-zinc-400" />
              </div>
              <p className="truncate text-zinc-300">{card.company}</p>
            </div>
          </div>

          <ChatWidget agentUrl={card.agentUrl} />

          <p className="mt-4 text-[10px] text-zinc-500">
            QR-powered AI business card · Prototype
          </p>
        </div>
      </div>
    </main>
  );
}
