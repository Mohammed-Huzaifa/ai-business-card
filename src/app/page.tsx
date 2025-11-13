"use client";

import { useState } from "react";

type CreatedCard = {
  slug: string;
  name: string;
  company: string;
  title?: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  agentUrl: string;
};

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [card, setCard] = useState<CreatedCard | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      title: formData.get("title") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      avatarUrl: (formData.get("avatarUrl") as string) || undefined,
      agentUrl: formData.get("agentUrl") as string,
    };

    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to create card");
      }

      const data = await res.json();
      setCard(data.card);
      setCardUrl(data.cardUrl);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Proof of Concept
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          AI-powered Business Card via QR
        </h1>
        <p className="text-sm text-zinc-400">
          Create a minimal business card with a built-in AI agent. Scan the QR,
          open the card, and let your AI assistant handle the details.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl bg-zinc-950/60 p-4 shadow-card border border-zinc-800/80"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Full name *
            </label>
            <input
              name="name"
              required
              defaultValue="Alexandra Chen"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
              placeholder="Alexandra Chen"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Company *
            </label>
            <input
              name="company"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
              placeholder="DigiWorks.ai"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Title / Role
            </label>
            <input
              name="title"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
              placeholder="Senior Product Manager"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Phone (optional)
            </label>
            <input
              name="phone"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
              placeholder="+1…"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Email *
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
              placeholder="alexandra.chen@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Avatar URL (optional)
            </label>
            <input
              name="avatarUrl"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
              placeholder="/alexandra-chen.png"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-300">
            AI Agent URL *{" "}
            <span className="text-[10px] text-zinc-500">
              (public chat URL from your AI platform)
            </span>
          </label>
          <input
            name="agentUrl"
            required
            defaultValue="https://app.digiworks.ai/chatbot/908e217c-e9c4-4505-95b3-49f4f2ae02da"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-50 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60"
            placeholder="https://app.digiworks.ai/chatbot/908e217c-e9c4-4505-95b3-49f4f2ae02da"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-sm font-medium text-white shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating your card…" : "Generate my AI business card"}
        </button>
      </form>

      {cardUrl && card && (
        <section className="space-y-2 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-4">
          <p className="text-xs font-semibold text-emerald-400">
            Card created successfully
          </p>
          <p className="text-sm text-zinc-300">
            Share this URL or encode it into a QR code. Scanning it will open
            your AI-powered business card:
          </p>
          <div className="rounded-xl bg-black/70 px-3 py-2 text-xs font-mono text-emerald-300 break-all border border-zinc-800">
            {cardUrl}
          </div>
          <p className="text-[11px] text-zinc-500">
            For the POC, paste this URL into any QR code generator — when
            scanned, it opens <span className="font-medium text-zinc-200">
              /card/{card.slug}
            </span>.
          </p>
        </section>
      )}
    </main>
  );
}
