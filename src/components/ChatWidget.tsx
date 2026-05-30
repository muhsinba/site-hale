"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "Merhaba 🌿 Ben Hale'nin asistanıyım. Seanslar, yaklaşım ya da randevu hakkında merak ettiklerinizi sorabilirsiniz.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: errText || "Bir hata oluştu. Lütfen tekrar deneyin.",
          },
        ]);
        return;
      }

      // Append an empty assistant message, then stream tokens into it.
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = m.slice();
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = {
            role: "assistant",
            content: last.content + chunk,
          };
          return copy;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Bağlantı hatası. Lütfen tekrar deneyin." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Launcher bubble */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Sohbeti kapat" : "Sohbeti aç"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-purple text-cream shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple/30"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
            <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.4 1.41 6.29 6.3-6.3 6.29 1.41 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.29 6.3-6.3z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[30rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl bg-cream shadow-2xl ring-1 ring-plum/10">
          {/* Header */}
          <div className="flex items-center gap-2 bg-plum px-5 py-4 text-cream">
            <span className="text-gold">✦</span>
            <div>
              <p className="font-serif text-lg leading-none">Hale Bayramoğlu</p>
              <p className="text-xs text-cream/60">Bütünsel şifa asistanı</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <div
                  className={
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed " +
                    (m.role === "user"
                      ? "bg-purple text-cream"
                      : "bg-cream-deep text-plum")
                  }
                >
                  {m.content || (loading ? "…" : "")}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-cream-deep px-4 py-2.5 text-sm text-plum/60">
                  yazıyor…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-plum/10 px-3 py-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Mesajınızı yazın…"
              className="input flex-1"
            />
            <button
              type="button"
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Gönder"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-plum transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
