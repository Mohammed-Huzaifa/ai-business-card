"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ChatWidgetProps {
  agentUrl: string;
}

export function ChatWidget({ agentUrl }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <span>Chat with my AI Agent</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
          <div
            className="relative w-full max-w-md rounded-2xl bg-zinc-950/95 p-3 shadow-2xl shadow-black/70"
            style={{
              maxHeight: "85vh",    // ⬅ Added: prevents overflow on all screens
            }}
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                AI Agent
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-zinc-800"
              >
                <X className="h-4 w-4 text-zinc-400" />
              </button>
            </div>

            {/* CHAT WINDOW HEIGHT FIX */}
            <div
              className="overflow-hidden rounded-xl border border-zinc-800 bg-black"
              style={{
                maxHeight: "75vh",   // ⬅ Added: ensures iframe never exceeds viewport
              }}
            >
              <iframe
                src={agentUrl}
                className="h-full w-full"
                title="AI Agent Chat"
                allow="clipboard-write; microphone; camera"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
