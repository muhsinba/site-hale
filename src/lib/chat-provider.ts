/**
 * Chat provider adapter — the ONLY provider-specific file.
 *
 * NOTE: This module is server-only — it reads a secret API key from env and
 * must never be imported into a Client Component. It is imported only by the
 * /api/chat Route Handler.
 *
 * Currently backed by Groq (free, OpenAI-compatible) via its REST API, so no
 * SDK dependency is needed. The rest of the app (the /api/chat route and the
 * ChatWidget UI) is provider-agnostic and talks only to `streamChat()` below.
 *
 * --- Switching to Claude later ---
 * Replace the body of `streamChat()` with a call to the Anthropic Messages API
 * and swap the env var. With the SDK:
 *
 *   import Anthropic from "@anthropic-ai/sdk";          // npm i @anthropic-ai/sdk
 *   const client = new Anthropic();                      // reads ANTHROPIC_API_KEY
 *   const stream = await client.messages.create({
 *     model: "claude-haiku-4-5-20251001",
 *     max_tokens: 1024,
 *     system: SYSTEM_PROMPT,                             // Claude takes system separately
 *     messages,                                          // same {role, content} shape
 *     stream: true,
 *   });
 *   // then pipe the text deltas into a ReadableStream<Uint8Array>.
 *
 * Nothing in the route handler or the UI changes.
 */

export type ChatMessage = { role: "user" | "assistant"; content: string };

const GROQ_MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

export const SYSTEM_PROMPT = `Sen, bütünsel şifa uzmanı Hale Bayramoğlu'nun web sitesindeki nazik ve sıcak bir asistansın. Görevin ziyaretçilere Hale'nin çalışmaları ve yaklaşımı hakkında bilgi vermek ve onları uygun olduğunda sayfadaki "Randevu Al" formuyla randevu almaya nazikçe yönlendirmektir.

Hale hakkında: 21 yılı aşkın deneyime sahip; İstanbul, Türkiye'de hizmet veriyor. Çalışma alanları: enerji terapileri ve dengeleme, frekans çalışmaları (SCIO Quantum Biofeedback), Reiki, Bach Çiçekleri Terapisi, bireysel farkındalık ve dönüşüm seansları.

Kurallar:
- Her zaman Türkçe, sıcak, şefkatli ve sakin bir tonda yanıt ver.
- Kısa ve net ol (genellikle 1-3 kısa paragraf).
- Tıbbi teşhis, tedavi veya tıbbi tavsiye VERME. Bu çalışmaların tamamlayıcı olduğunu ve tıbbi tedavinin yerini almadığını belirt; sağlık endişeleri için bir sağlık uzmanına başvurmalarını öner.
- Fiyat, kesin program veya emin olmadığın bilgileri uydurma; bunun için "Randevu Al" formuna ya da iletişim bilgilerine yönlendir.
- Uygun olduğunda ziyaretçiyi "Randevu Al" formuyla randevu almaya davet et.
- Konu Hale'nin çalışmalarından uzaklaşırsa nazikçe geri yönlendir.`;

/**
 * Streams a chat completion as a ReadableStream of UTF-8 text deltas.
 * Throws on configuration/upstream errors; the route handler maps that to a
 * friendly message.
 */
export async function streamChat(
  messages: ChatMessage[],
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set");
  }

  const upstream = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      }),
    },
  );

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    throw new Error(`Groq error ${upstream.status}: ${detail}`);
  }

  // Transform Groq's OpenAI-style SSE (`data: {json}` lines) into text deltas.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? ""; // keep the trailing partial line
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const parsed = JSON.parse(payload);
          const text: string = parsed?.choices?.[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        } catch {
          // Ignore non-JSON / partial lines; SSE chunking can split them.
        }
      }
    },
  });

  return upstream.body.pipeThrough(transform);
}
