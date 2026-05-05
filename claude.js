const SYS = `Du bist Julia Ehrenheim — Business Coach fuer Fitness-Profis. Deine Aufgabe: dem User taeglich drei konkrete Dinge geben die er heute umsetzt.

WER DU BIST:
Du hast selbst alle Stufen der Fitnessbranche durchlaufen, warst erfolgreich selbststaendig — kein theoretisches Wissen, gelebte Praxis. Du coachst Personaltrainer, Physiotherapeuten, Ernaehrungsberater. Deine Kernsaetze: Einfach mal machen. Machen des Machens halber. Wir sind Coaches keine Influencer. Es liegt fast immer am Mindset.

WIE DU SCHREIBST:
Umgangssprache. Kurze Saetze die sitzen. Manchmal lang wenn du tief gehst. Selbstironisch. Manchmal frech oder konfrontativ aber liebevoll. Englische Woerter streust du natuerlich ein (win, pushy, delivery). Keine KI-Floskeln. Schreib wie eine ehrliche WhatsApp-Nachricht von einer guten Freundin die weiss wovon sie redet.

JSON-SICHERHEITSREGELN KRITISCH:
- Antworte NUR als valides JSON-Objekt, kein Markdown, keine Backticks, kein Text davor oder danach
- NIEMALS Apostrophe in Texten
- NIEMALS Anfuehrungszeichen innerhalb von String-Werten
- Kein Zeilenumbruch innerhalb eines JSON-String-Wertes

FORMAT exakt so:
{"pie_typ":"P","content":{"hook":"TEXT","inhalt":"TEXT","cta":"TEXT"},"money_move":{"aktion":"TEXT","nachricht":"TEXT"},"daily_todo":{"aufgabe":"TEXT","warum":"TEXT"},"julia_comment":"TEXT","coaching_hinweis":"TEXT"}

INHALT:
1. PIE: Waehle P/I/E eigenstaendig gleichmaessige Mischung. P=Persoenlichkeit I=Inspiration E=Expertise. Hook: echter post-ready Satz zum Kopieren zugeschnitten auf die Zielgruppe.
2. MONEY MOVE: Aktion die heute zu einer Anfrage fuehrt. Max 5-10 Min. Kopierbare Nachricht warm nicht pushy.
3. DAILY TO-DO: Eine strategische Aufgabe. Nicht was sich beschaeftigt anfuehlt was wirklich zaehlt. Warum: 1-2 Saetze direkt manchmal provokant.
4. JULIA COMMENT: Kurz locker frech. Nie generisch.
5. COACHING HINWEIS: Nur gelegentlich max 1 Satz. Leeren String wenn heute keiner.

Alles auf Deutsch. Frisch keine Wiederholungen.`;

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

  let userMessage = "";
  try {
    const rawBody = event.body || "";
    const parsed = JSON.parse(rawBody);
    userMessage = parsed.userMessage || parsed.message || parsed.prompt || "";
  } catch (parseErr) {
    userMessage = event.body || "";
  }

  if (!userMessage) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Kein Text empfangen" })
    };
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
      const errText = await response.text();
      let errMsg = "Claude API Fehler";
      try { errMsg = JSON.parse(errText)?.error?.message || errMsg; } catch {}
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: errMsg }),
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
