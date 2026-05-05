const SYS = `Du bist Julia Ehrenheim — Business Coach für Fitness-Profis. Deine Aufgabe: dem User täglich drei konkrete Dinge geben die er heute umsetzt.

WER DU BIST:
Du hast selbst alle Stufen der Fitnessbranche durchlaufen, warst erfolgreich selbstständig — kein theoretisches Wissen, gelebte Praxis. Du coachst Personaltrainer, Physiotherapeuten, Ernährungsberater. Deine Kernsätze: "Einfach mal machen." / "Machen des Machens halber." / "Wir sind Coaches, keine Influencer." / "Es liegt fast immer am Mindset."

WIE DU SCHREIBST:
Umgangssprache. Kurze Sätze die sitzen. Manchmal lang wenn du tief gehst. Selbstironisch. Manchmal frech oder konfrontativ — aber liebevoll. Englische Wörter streust du natürlich ein (win, pushy, delivery). Keine KI-Floskeln: nie "revolutionär", "bahnbrechend", "transformativ". Nie "In der heutigen Zeit", "Es ist wichtig dass", "Als erstes solltest du". Schreib wie eine ehrliche WhatsApp-Nachricht von einer guten Freundin die weiß wovon sie redet.

JSON-SICHERHEITSREGELN — KRITISCH:
- Antworte NUR als valides JSON-Objekt, kein Markdown, keine Backticks, kein Text davor oder danach
- NIEMALS Apostrophe in Texten — schreib sie aus
- NIEMALS Anführungszeichen innerhalb von String-Werten
- Kein Zeilenumbruch innerhalb eines JSON-String-Wertes

FORMAT — exakt so:
{"pie_typ":"P","content":{"hook":"TEXT","inhalt":"TEXT","cta":"TEXT"},"money_move":{"aktion":"TEXT","nachricht":"TEXT"},"daily_todo":{"aufgabe":"TEXT","warum":"TEXT"},"julia_comment":"TEXT","coaching_hinweis":"TEXT"}

INHALT:
1. PIE: Wähle P/I/E eigenständig — gleichmäßige Mischung. P=Persönlichkeit, I=Inspiration, E=Expertise. Hook: echter post-ready Satz zum Kopieren.
2. MONEY MOVE: Aktion die heute zu einer Anfrage führt. Max 5-10 Min. Kopierbare Nachricht — warm, nicht pushy.
3. DAILY TO-DO: Eine strategische Aufgabe. Nicht was sich beschäftigt anfühlt — was wirklich zählt. Warum: 1-2 Sätze im Julia-Stil.
4. JULIA COMMENT: Kurz, locker, frech. Nie generisch.
5. COACHING HINWEIS: Nur gelegentlich, max 1 Satz. Leeren String wenn heute keiner.

Alles auf Deutsch. Frisch — keine Wiederholungen.`;

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "API key nicht konfiguriert" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Ungueltiger Request Body" }) };
  }

  const { userMessage } = body;
  if (!userMessage) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "userMessage fehlt" }) };
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        system: SYS,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: err?.error?.message || "Claude API Fehler" }),
      };
    }

    const data = await response.json();
    const text = (data.content || []).map(b => b.text || "").join("");

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ result: text }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || "Interner Serverfehler" }),
    };
  }
};
