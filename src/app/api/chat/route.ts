import { streamChat, type ChatMessage } from "@/lib/chat-provider";

// Chat is request-time and must never be cached.
export const dynamic = "force-dynamic";

const MAX_HISTORY = 12; // cap context to keep latency + token use modest

export async function POST(request: Request) {
  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response("Geçersiz istek.", { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMessage[] = raw
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        (m as ChatMessage).role !== undefined &&
        ((m as ChatMessage).role === "user" ||
          (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string" &&
        (m as ChatMessage).content.trim().length > 0,
    )
    .slice(-MAX_HISTORY);

  // Gemini requires the conversation to begin with a user turn — drop any
  // leading assistant messages (e.g. the widget's opening greeting).
  while (messages.length && messages[0].role === "assistant") {
    messages.shift();
  }

  if (messages.length === 0) {
    return new Response("Mesaj bulunamadı.", { status: 400 });
  }

  try {
    const stream = await streamChat(messages);
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Chat error:", err);
    return new Response(
      "Üzgünüm, şu anda yanıt veremiyorum. Lütfen biraz sonra tekrar deneyin ya da 'Randevu Al' formundan bize ulaşın.",
      { status: 500 },
    );
  }
}
