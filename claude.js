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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "API key fehlt" }) };
  }

  let userMessage = "";
  try {
    let bodyStr = event.body || "";
    if (event.isBase64Encoded) {
      bodyStr = Buffer.from(bodyStr, "base64").toString("utf8");
    }
    const parsed = JSON.parse(bodyStr);
    userMessage = parsed.userMessage || "";
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Parse fehler: " + e.message + " | body: " + String(event.body).substring(0, 100) })
    };
  }

  if (!userMessage) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "userMessage fehlt. Body: " + String(event.body).substring(0, 200) })
    };
  }

  const SYS = `Du bist Julia Ehrenheim — Business Coach fuer Fitness-Profis. Antworte NUR als valides JSON-Objekt ohne Markdown ohne Backticks.
FORMAT: {"pie_typ":"P","content":{"hook":"TEXT","inhalt":"TEXT","cta":"TEXT"},"money_move":{"aktion":"TEXT","nachricht":"TEXT"},"daily_todo":{"aufgabe":"TEXT","warum":"TEXT"},"julia_comment":"TEXT","coaching_hinweis":"TEXT"}
PIE: P=Persoenlichkeit I=Inspiration E=Expertise. Gleichmaessige Mischung. Hook als post-ready Satz kopierbar.
MONEY MOVE: konkrete Aktion heute. Kopierbare Nachricht warm nicht pushy.
DAILY TO-DO: eine strategische Aufgabe. Warum direkt und provokant.
JULIA COMMENT: kurz locker frech nie generisch.
COACHING HINWEIS: nur gelegentlich 1 Satz oder leerer String.
Alles Deutsch. NIEMALS Apostrophe oder Anfuehrungszeichen in Texten.`;

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

    const responseText = await response.text();
    if (!response.ok) {
      return { statusCode: response.status, headers, body: JSON.stringify({ error: responseText }) };
    }

    const data = JSON.parse(responseText);
    const text = (data.content || []).map(b => b.text || "").join("");
    return { statusCode: 200, headers, body: JSON.stringify({ result: text }) };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
