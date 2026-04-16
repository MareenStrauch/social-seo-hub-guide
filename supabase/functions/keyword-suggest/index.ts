import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== "string" || topic.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "Bitte gib ein Thema mit mindestens 2 Zeichen ein." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Du bist ein Social SEO Experte. Der Nutzer gibt ein Thema ein und du generierst Keyword-Vorschläge für 4 Plattformen: YouTube, TikTok, Google und LinkedIn.

Antworte NUR mit dem JSON-Ergebnis des tool calls, keine zusätzlichen Erklärungen.

Regeln:
- Pro Plattform genau 5 Keywords
- Keywords sollen realistisch und suchrelevant sein
- Mische Short-Tail und Long-Tail Keywords
- Berücksichtige plattformspezifische Suchmuster (z.B. TikTok: Trends/Hashtags, YouTube: How-to, Google: informational, LinkedIn: B2B/professional)
- Alle Keywords auf Deutsch, es sei denn das Thema ist englisch`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Thema: ${topic.trim()}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_keywords",
              description: "Return keyword suggestions for 4 platforms",
              parameters: {
                type: "object",
                properties: {
                  platforms: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string", enum: ["YouTube", "TikTok", "Google", "LinkedIn"] },
                        keywords: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              keyword: { type: "string" },
                              type: { type: "string", enum: ["short-tail", "long-tail"] },
                              searchIntent: { type: "string", enum: ["informational", "transactional", "navigational"] },
                            },
                            required: ["keyword", "type", "searchIntent"],
                            additionalProperties: false,
                          },
                        },
                      },
                      required: ["name", "keywords"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["platforms"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "suggest_keywords" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Zu viele Anfragen - bitte versuche es in einer Minute erneut." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI-Kontingent aufgebraucht." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("No tool call response from AI");
    }

    const keywords = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(keywords), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("keyword-suggest error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unbekannter Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
