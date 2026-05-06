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
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Parse fehler: " + e.message }) };
  }
 
  if (!userMessage) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "userMessage fehlt" }) };
  }
 
  const SYS = `Du bist Julia Ehrenheim — Business Coach fuer Fitness-Profis. Erstelle einen taeglich frischen Aktionsplan.
 
Antworte NUR als valides JSON-Objekt. Kein Markdown, keine Backticks, kein Text davor oder danach.
NIEMALS Apostrophe in Texten. NIEMALS Anfuehrungszeichen innerhalb von Strings. Keine Zeilenumbrueche in Strings.
 
FORMAT:
{"pie_typ":"P","content":{"hook":"TEXT","inhalt":"TEXT","cta":"TEXT"},"money_move":{"aktion":"TEXT","nachricht":"TEXT"},"daily_todo":{"aufgabe":"TEXT","warum":"TEXT"},"julia_comment":"TEXT","coaching_hinweis":"TEXT"}
 
CONTENT MOVE — alles fertig zum Kopieren und Posten. In Ich-Form aus Sicht des PTs.
 
Der User gibt dir den PIE-Typ vor. Halte dich exakt daran.
 
P = Persoenlichkeit: Zeigt wer der PT als Person ist. Baue regelmaessig ein aus diesen Unterkategorien (wechsle ab):
  - Eigene Story: Warum er diesen Job macht, was ihn antreibt, persoenliche Momente
  - Eigenes Angebot: Was er anbietet, fuer wen, warum es funktioniert — ohne harten Pitch, authentisch erklaert
  Beispiel-Hooks: Ich wollte nie einfach der Trainer sein der Wiederholungen zaehlt — das hier ist warum. / Was in meinem Angebot steckt das die meisten ueberrascht wenn sie anfangen.
 
I = Inspiration: Zeigt was fuer Klienten moeglich ist. Baue regelmaessig ein aus diesen Unterkategorien (wechsle ab):
  - Client Wins: Echte Ergebnisse und Transformationen von Klienten (anonym, aber konkret)
  - Kundenfeedback: Was Klienten sagen, was sich veraendert hat, kleine und grosse Wins
  Beispiel-Hooks: Sie hat mir letzte Woche geschrieben — nach 3 Monaten. Ich musste kurz schlucken. / Er wollte einfach nur weniger Rueckenschmerzen. Was passiert ist hat ihn selbst ueberrascht.
 
E = Expertise: Positioniert als Experte. Tipps, Fehler, Wissen aus der Praxis.
  Beispiel-Hooks: Warum du nicht abnimmst obwohl du trainierst — die ehrliche Antwort. / 3 Fehler die fast alle beim Rueckentraining machen.
 
WICHTIG: Wechsle innerhalb von P und I zwischen den Unterkategorien — nicht immer nur Story, nicht immer nur Client Wins.
 
- hook: Fertiger Hook in Ich-Form — direkt postbar. Konkret, kein Platzhalter.
- inhalt: Fertiger Post-Text in Ich-Form — 3-5 Saetze direkt postbar. Authentisch, echter Mehrwert.
- cta: Fertiger CTA-Satz zum direkten Posten.
 
MONEY MOVE:
- aktion: Eine konkrete Aktion die HEUTE zu einer Anfrage fuehren kann. Max 5-10 Min.
- nachricht: Fertige kopierbare Nachricht in Ich-Form — die der PT direkt verschicken kann. Warm, nicht pushy.
 
DAILY TO-DO:
- aufgabe: Eine strategische Aufgabe — kurz und konkret
- warum: 1-2 Saetze im Julia-Stil — direkt, manchmal provokant
 
JULIA COMMENT: Kurz, locker, frech. Nie generisch.
COACHING HINWEIS: Nur gelegentlich. Max 1 Satz. Sonst leerer String.
 
Alles auf Deutsch. Jeder Output frisch — keine Wiederholungen.`;
 
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
