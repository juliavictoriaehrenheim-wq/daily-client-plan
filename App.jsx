import { useState, useRef } from "react";

const LOGO = "iVBORw0KGgoAAAANSUhEUgAAAUoAAAHbCAYAAACtE9PjAAAIdUlEQVR4nO3dXXsaNxCAUdwn//8vOxe1kxhb7GpXH6PRObdtUzygl2ED5vEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgO2+zbwDxvb+/v5f+2dvbm8cQ6XmQU/QqkM8Ek8z+m30DiKkmklf+fViJUPLN1eiJJVkJJV+IHXwnlDQltGQklPwhcvAzoaQ5wSUboQQ4IJQAB4QS4IBQAhwQSv5o9TFEH2ckG6EEOCCUfHF3G7RNkpFQ8s3V2IkkWQklP6qNnkiSmVBSdDZ+Ikl2HuCc8vyxRHEEAAAAAAAAAAAAAAAA4DUfQ6PaT9+yuNtHGs9+0+Ruc8nKnUiVq19Fu1owRn3l7mpz2ZU7iSqtAhItEJG+izzabBBKKvUIyowwRArjEeGczx1Ald6B6RmFleJYIppzGDpVRsamVRQyBPKZYI5l2FSZFZ3aMGSMY4lo9mfAVJkdoKMozL59MwlmPwZLlSgheo5ClNsVgWC2Z6BUEaR1CGY7voURkvKk1o5QQmLvH2bfjtUJJWxALO9xDYMmdjuINdf/os3Gtct6BkZ30UJx1oigrPK+1N0ZFsNFDefseIyey+yfdyUGxVSzoxk1Fit+VDQzAyIE21TZiNmsNI8ZDIdQROG1nvNZeS69eXsQYcx+Gb6Ctw89/mzzL/MMwnQzDmiW7SnLL1KOzkCYavYWkyEKYtmfYTDN7Eh+yhKF1vPMMpcWXKOEJFqHLcoTWQSeMZgi2iHMtj21nG+22Vxho2S4aJF8PGLepjtaxi3bbK7Y/pmCsXp9L3jW7xtvwWzus1EyTM8D6xsby3YOXCtCyRAjthqxLGsxm4xzOUsoWcaZw257KhPL64SS7locrppDLghlZnONUNLV6Eje+W92YTb1hJLQ7hzqu0HIvDmZTR2hpJu7h6nF5iMIZWZznlDSRYRI9vizsjGbc4SScKId3uyb0515Z5/NJ6GkuYiHx8vMfnaYjVASSs9tMtqmGonZvCaUNHVnuxhxWL3MLDObMqEkBBsNkQklzayyVdicyszmZ0LJdLbJWNwf3wklTVzdJmYdSptTH1lnI5Rsy+ZUZjZfCSW3rbZNtpB1c2oh42yEkq2tHOvezOYvoeSWHbdJ9iOUbO9qtDO+xHxmNv8TSoADQsllmV52R7xNUZiNUMIt2V5itpRpNkLJULYTViSUXJJpW/gk4mW7z0Yo4aaMTxqtZJmNUDLM7lsJ6xJK+IeYl+08G6EEOCCUVLty3WnnbWR3Ga5TCiU0kCEGZ+z6hCeU8GTXGFAmlAAHhBLggFBSZZdrcfAvoaS7Xa75eRLJSyiBKlee+FZ/EtnimZ52Vn/AM8/KryxslAAHhBLggFACHBBKgANCCXDg1+wbEFHt3+yu/Ld5wDEbZQPeMgO5CSXAAaEEOCCUAAeEEuCAUAIc8PYghljtLVRX38mw2s/JOTZKgANCCY3YJvMSyh94wAP/EspGdvl0jicRdiSUAAeEEuCAUMKTXS6jcJ5QNuSAlWWfjWu3uQkl1USB3QhlgRgAn4SSYVZ4+b3CbWQ8oWzMQduPVx/5CeULDkCZ2bAToezAVlkWeTaRbxtzCSXcYLPeg1AecBDKMs3GNskrQtmJg1dmNqxGKAEOCOUJV19i7rA5ZZiNr33giFCytUjBJi6h7GyHg5hhq6xlm9yLUJ7kYOSzcqgZSygHcCDLzIYVCGUFW2XZarO5E+jVflbuE8pBbE5lZkN0QlnpzjaRPQirzMY2SS2hZCsiyRVCecEqm9MMZkNGQjmBIJT1nI1tkquE8qK7BydzLCPOJvO86U8ob7BllEWazd1IRvpZmEMoJ7LllL1/mH07RJLHQyhvi/gyM4oIkck8X8YRygbEsmzmbLzkphUPhEZaxC7rwRw9G/cFR2ofIzbKRlocrKyb5cjZZJ0hc3nWbKzVQc240YzY9GyTnPH5ODl7X9sog8q4GfXeLEWSXoSysZYHLWMsW3h+61CrtxKJJCVC2YFYlrWejUsdjCCUnYhlmSixGqHsKOr2xFfCzRGh7Kz1IcwSy7cPEW7H7NtAfEI5QI9YZgrmjv9v1iKUg/Q4lFmCOSNYIkkNoRyo1+HMEMyR4RJJannATNA7aquGYFTsV50P7dQ+1jxgJhGFv2ZtwyvMhj6EcjE7BzPK5YKIs6Gv2s96e4AEMCMYs+IQJY6vCGd+Qrmo2QHp9bfyrf/MGYQzH6FcXJa47EhQ1+HXrC3OYVuXJ7m8hDIgsYRYhDKoKJ+FBoQyPMEsMxtG+TX7BnDOZxBcB/t+acJs6E0oF7NzFI62x51nQ19etiwuexTuvLTe6Y389OVOTSRTNFf9hcdCmZM7NaGVg9k7NH5zE1e4UzcQOZwzw9JjLkKZkzt1M7OjGTUkvvaWV9ypPB4P29UrNbPJ8jMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABADL8BHQmNf7gKesMAAAAASUVORK5CYII=";

const SYS = `Du bist Julia Ehrenheim — Business Coach für Fitness-Profis. Deine Aufgabe: dem User täglich drei konkrete Dinge geben die er heute umsetzt.

WER DU BIST:
Du hast selbst alle Stufen der Fitnessbranche durchlaufen, warst erfolgreich selbstständig — kein theoretisches Wissen, gelebte Praxis. Du coachst Personaltrainer, Physiotherapeuten, Ernährungsberater. Deine Kernsätze: "Einfach mal machen." / "Machen des Machens halber." / "Wir sind Coaches, keine Influencer." / "Es liegt fast immer am Mindset."

WIE DU SCHREIBST:
Umgangssprache. Kurze Sätze die sitzen. Manchmal lang wenn du tief gehst. Selbstironisch. Manchmal frech oder konfrontativ — aber liebevoll. Englische Wörter streust du natürlich ein (win, pushy, delivery). Keine KI-Floskeln: nie "revolutionär", "bahnbrechend", "transformativ". Nie "In der heutigen Zeit", "Es ist wichtig dass", "Als erstes solltest du". Nie Mini-Sätze die nach generiertem Text klingen. Schreib wie eine ehrliche WhatsApp-Nachricht von einer guten Freundin die weiß wovon sie redet. Der Leser soll denken: "Autsch, das hat gesessen." UND "Vielleicht ist es wirklich möglich."

JSON-SICHERHEITSREGELN — KRITISCH:
- Antworte NUR als valides JSON-Objekt, kein Markdown, keine Backticks, kein Text davor oder danach
- NIEMALS Apostrophe (') in Texten — schreib sie aus
- NIEMALS Anführungszeichen innerhalb von String-Werten
- Kein Zeilenumbruch innerhalb eines JSON-String-Wertes

FORMAT — exakt so:
{"pie_typ":"P","content":{"hook":"TEXT","inhalt":"TEXT","cta":"TEXT"},"money_move":{"aktion":"TEXT","nachricht":"TEXT"},"daily_todo":{"aufgabe":"TEXT","warum":"TEXT"},"julia_comment":"TEXT","coaching_hinweis":"TEXT"}

INHALT — was du lieferst:

1. PIE CONTENT-IDEE (pie_typ + content):
Wechsle zwischen P / I / E — wähle eigenständig. Sorge für eine gleichmäßige Mischung über Tage: nicht zweimal hintereinander dasselbe. Heute wähle was am besten zur Situation des Users passt.
P = Persönlichkeit: Zeigt wer du als Person bist. Beispiele: "Ich war selbst mein schlechtester Kunde — hier ist meine Geschichte" / "Was mich an diesem Job jeden Tag antreibt, auch wenn es anstrengend ist"
I = Inspiration: Zeigt was für Klienten möglich ist. Beispiele: "Sie hat 15kg abgenommen — aber das ist nicht die eigentliche Geschichte" / "Er ist 58 und trainiert seit 6 Monaten — was das mit ihm gemacht hat"
E = Expertise: Positioniert als Experte. Beispiele: "Warum du nicht abnimmst obwohl du trainierst" / "3 Fehler die fast alle beim Rückentraining machen" / "Progressive Overload: Was es ist und warum dein Training es braucht"
Hook: fertiger post-ready Text der direkt gepostet werden kann — zugeschnitten auf die Zielgruppe des Users. Kein Platzhalter. Ein echter Satz zum Kopieren.
CTA: konkret und friktionsarm — "Schreib mir XY" / "Speicher dir das" / "Schick mir eine DM"

2. MONEY MOVE (money_move):
Eine Aktion die HEUTE zu einer Anfrage führen kann. Maximal 5-10 Minuten. Mit kopierbarer Nachricht.
Beispiele: 3 Menschen anschreiben die Interesse gezeigt haben / Story posten mit freien Plätzen / Ehemaligen Klienten fragen wie es läuft / Empfehlung anfragen / 5 Beiträge der Zielgruppe kommentieren mit echtem Mehrwert
Die Nachricht: warm, direkt, nicht pushy. Kein Pitch. Einfach menschlich.

3. DAILY TO-DO (daily_todo):
Eine strategische Aufgabe die das Business voranbringt — heute konkret umsetzbar. Nicht was sich beschäftigt anfühlt, sondern was wirklich zählt.
Kategorien: Bio/Profil checken / Content planen / Angebot schärfen / Pricing nachrechnen / Prokrastination identifizieren und anpacken / 25-Minuten-Focus-Block
Warum: 1-2 Sätze im Julia-Stil — direkt, manchmal provokant.

4. JULIA COMMENT (julia_comment):
Kurzer persönlicher Abschluss. Locker, ehrlich, leicht frech. Nie generisch. Beispiele: "ganz ehrlich — bringt nur was wenn du es auch machst" / "nicht zerdenken. einfach machen." / "die meisten bleiben genau hier hängen. du jetzt bitte nicht."

5. COACHING HINWEIS (coaching_hinweis):
Nur gelegentlich — nicht jeden Tag. Wenn ja: max 1 Satz, subtil, wie eine persönliche Beobachtung. Nie pushy. Beispiele: "genau da hängen viele am Anfang" / "das ist etwas das ich bei meinen Kunden oft sehe". Wenn heute kein Hinweis: leeren String zurückgeben.

WICHTIG: Jeder Output fühlt sich frisch an — keine Wiederholungen. Alles auf Deutsch.`;

function safeParseJSON(raw) {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  let s = match[0];
  s = s.replace(/[\u2018\u2019\u0060]/g, " ");
  s = s.replace(/[\u201C\u201D]/g, " ");
  s = s.replace(/([^\\])\n/g, "$1 ");
  s = s.replace(/\r/g, " ");
  s = s.replace(/[\x00-\x1F\x7F]/g, " ");
  try { return JSON.parse(s); } catch { return null; }
}

const PIE_COLOR = { P: "#7b5ea7", P_ANGEBOT: "#7b5ea7", I: "#d4730a", I_WIN: "#d4730a", I_FEEDBACK: "#c45f00", E: "#2a7db5" };
const PIE_LABEL = { P: "Persönlichkeit", I: "Inspiration", E: "Expertise" };
const BERUF_OPTIONS = ["Personaltrainer", "Physiotherapeut", "Fitness Coach", "Ernährungsberater", "Online Coach", "Anderes"];
const LEVEL_OPTIONS = ["Ich stehe am Anfang", "Ich habe schon erste Kunden", "Ich bin fortgeschritten"];
const FOKUS_OPTIONS = ["Sichtbarkeit", "Gespräche", "Kunden / Verkauf"];
const PIE_TYPES = ["P", "I", "E", "P", "E", "P_ANGEBOT", "I_WIN", "E", "P", "I_FEEDBACK"];
// P = Story, P_ANGEBOT = Angebot vorstellen, I_WIN = Client Win, I_FEEDBACK = Kundenfeedback, E = Expertise
const PIE_NAMES = {
  P: "Persönlichkeit – deine Story",
  P_ANGEBOT: "Persönlichkeit – dein Angebot",
  I: "Inspiration – Transformation",
  I_WIN: "Inspiration – Client Win",
  I_FEEDBACK: "Inspiration – Kundenfeedback",
  E: "Expertise – Tipp / Wissen"
};

export default function App() {
  const [screen, setScreen] = useState("form");
  const [answers, setAnswers] = useState({ beruf: "", berufCustom: "", level: "", fokus: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState({});
  const [loadMsg, setLoadMsg] = useState("Erstelle deinen Tagesplan...");
  const [streak, setStreak] = useState(0);
  const [streakDone, setStreakDone] = useState(false);
  const [pieIndex, setPieIndex] = useState(() => {
    // Start based on day of year for natural daily variation
    return Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000) % 3;
  });
  const ticker = useRef(null);

  const setA = (k, v) => setAnswers(a => ({ ...a, [k]: v }));
  const getToday = () => new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });

  const doCopy = async (id, text) => {
    await navigator.clipboard.writeText(text);
    setCopied(c => ({ ...c, [id]: true }));
    setTimeout(() => setCopied(c => ({ ...c, [id]: false })), 2000);
  };

  const generate = async () => {
    if (!answers.beruf || !answers.level || !answers.fokus) { setError("Bitte beantworte alle Fragen."); return; }
    setError(""); setLoading(true); setResult(null); setScreen("loading"); setStreakDone(false);
    const msgs = ["Erstelle deinen Tagesplan...", "Content-Idee wird ausgearbeitet...", "Money Move wird formuliert...", "Fast fertig..."];
    let mi = 0;
    ticker.current = setInterval(() => { mi = (mi + 1) % msgs.length; setLoadMsg(msgs[mi]); }, 2200);

    const berufLabel = answers.beruf === "Anderes" ? (answers.berufCustom || "Coach") : answers.beruf;
    const userMsg = "Tagesplan für heute " + getToday() + ". Beruf: " + berufLabel + ". Level: " + answers.level + ". Fokus: " + answers.fokus + ". Heutiger Content-Typ: " + PIE_NAMES[PIE_TYPES[pieIndex]] + " — nutze GENAU diese Kategorie. Kein anderer Typ. Frischen konkreten Plan.";

    try {
      const res = await fetch("/.netlify/functions/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userMsg })
      });
      clearInterval(ticker.current);
      if (!res.ok) { const txt = await res.text().catch(() => ""); let msg = "Fehler " + res.status + ": " + txt; try { msg = JSON.parse(txt)?.error || msg; } catch {} throw new Error(msg); }
      const data = await res.json();
      const raw = data.result || "";
      const parsed = safeParseJSON(raw);
      if (!parsed) throw new Error("Antwort konnte nicht verarbeitet werden. Nochmal versuchen.");
      setResult(parsed); setScreen("result");
    } catch (e) {
      clearInterval(ticker.current);
      setError(e.message || "Unbekannter Fehler.");
      setScreen("form");
    } finally { setLoading(false); }
  };

  const S = {
    wrap: { fontFamily: "'Montserrat',sans-serif", background: "#ff6666", minHeight: "100vh", color: "#fff" },
    header: { padding: "28px 24px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
    logo: { height: 100, width: "auto" },
    logoSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", letterSpacing: 1, fontWeight: 600 },
    hero: { textAlign: "center", padding: "10px 24px 22px" },
    tag: { display: "inline-block", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "5px 16px", borderRadius: 20, marginBottom: 14 },
    h1: { fontWeight: 700, fontSize: "clamp(22px,4vw,34px)", lineHeight: 1.2, marginBottom: 4, color: "#fff" },
    h1sub: { fontSize: "clamp(22px,4vw,34px)", color: "#2d2d2d", fontWeight: 700, marginBottom: 8, lineHeight: 1.2 },
    sub: { fontSize: 14, color: "rgba(255,255,255,0.8)", maxWidth: 460, margin: "0 auto", lineHeight: 1.6 },
    hint: { marginTop: 9, fontSize: 12, color: "rgba(255,255,255,0.6)", fontStyle: "italic" },
    wrap2: { maxWidth: 700, margin: "0 auto", padding: "6px 20px 60px" },
    card: { background: "#fff", borderRadius: 16, padding: 28, marginBottom: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.12)" },
    ctag: { fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#e05050", marginBottom: 10, display: "block" },
    ch2: { fontWeight: 700, fontSize: 20, color: "#1a1a1a", marginBottom: 6 },
    desc: { fontSize: 14, color: "#777", marginBottom: 20, lineHeight: 1.6 },
    dateChip: { display: "inline-block", background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, color: "#888", marginBottom: 20, letterSpacing: 0.5 },
    qWrap: { marginBottom: 18 },
    qLabel: { display: "flex", alignItems: "center", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 10, gap: 8 },
    qNum: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", background: "#ff6666", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 },
    optRow: { display: "flex", gap: 8, flexWrap: "wrap" },
    opt: (a) => ({ padding: "9px 16px", borderRadius: 8, border: `2px solid ${a ? "#ff6666" : "#e8e8e8"}`, background: a ? "#fff0f0" : "#fafafa", color: a ? "#cc3333" : "#555", fontSize: 13, fontWeight: a ? 700 : 500, cursor: "pointer", transition: "all 0.15s" }),
    ta: { width: "100%", background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 10, color: "#1a1a1a", fontFamily: "'Montserrat',sans-serif", fontSize: 14, padding: "12px 14px", resize: "vertical", minHeight: 52, outline: "none", boxSizing: "border-box" },
    btnMain: { background: "#3d3d3d", color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", marginTop: 8 },
    btnBack: { background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 10, padding: "10px 20px", fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" },
    errBox: { background: "#fff0f0", border: "1px solid #ffcccc", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#cc3333", marginTop: 12, fontWeight: 600 },
    loadWrap: { textAlign: "center", padding: "60px 20px" },
    spinner: { width: 44, height: 44, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 20px" },
    ltxt: { fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 600 },
    rcrd: { background: "#fff", borderRadius: 14, padding: "22px 24px", marginBottom: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
    rh3: { fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#e05050", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 },
    rnum: { fontSize: 16, color: "#ddd", fontWeight: 400 },
    rbody: { fontSize: 14, lineHeight: 1.75, color: "#333" },
    hookBox: { background: "#f8f8f8", border: "1px solid #e8e8e8", borderRadius: 8, padding: "12px 14px", fontSize: 14, color: "#1a1a1a", fontWeight: 600, lineHeight: 1.5, marginBottom: 10 },
    hl: { background: "#fff5f5", borderLeft: "3px solid #ff6666", padding: "10px 14px", borderRadius: "0 8px 8px 0", margin: "10px 0", fontStyle: "italic", color: "#444", overflow: "hidden" },
    cpbtn: (ok) => ({ background: ok ? "#3eb8a0" : "#3d3d3d", border: "none", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", float: "right", marginLeft: 8 }),
    pieBadge: (p) => ({ display: "inline-block", background: PIE_COLOR[p] || "#888", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 4, marginBottom: 10, letterSpacing: 1 }),
    todoBox: { background: "#f8f4ff", border: "1px solid #d0bbff", borderRadius: 10, padding: "14px 16px", marginBottom: 8 },
    coachBox: { background: "#f0f8ff", border: "1px solid #b8d8f0", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#2a5a8a", fontStyle: "italic" },
    juliaBox: { background: "#fff", border: "2px solid #ff6666", borderRadius: 14, padding: "18px 22px", marginBottom: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
    challengeBox: { background: "#3d3d3d", borderRadius: 14, padding: "20px 24px", marginBottom: 16 },
    streakDot: (f) => ({ width: 28, height: 28, borderRadius: "50%", background: f ? "#3eb8a0" : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }),
    streakBtn: (d) => ({ background: d ? "#3eb8a0" : "#ff6666", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "'Montserrat',sans-serif", fontSize: 13, fontWeight: 700, cursor: d ? "default" : "pointer", marginTop: 12, width: "100%" }),
    chip: { background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 600 },
    footer: { textAlign: "center", padding: "20px 24px", color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: 1 },
  };

  const Hl = ({ id, text }) => (
    <div style={S.hl}>
      <button style={S.cpbtn(copied[id])} onClick={() => doCopy(id, text || "")}>{copied[id] ? "Kopiert ✓" : "Kopieren"}</button>
      {text}
    </div>
  );

  return (
    <div style={S.wrap}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <div style={S.header}>
        <img src={`data:image/png;base64,${LOGO}`} alt="Julia Ehrenheim" style={S.logo} />
        <span style={S.logoSub}>fitnesszumbusiness.de · Julia Ehrenheim</span>
      </div>

      <div style={S.hero}>
        <div style={S.tag}>Daily Client Plan</div>
        <h1 style={S.h1}>Dein täglicher Business Plan</h1>
        <p style={S.h1sub}>für mehr Kunden</p>
        <p style={S.sub}>Nutze das jeden Morgen 1x – das ist dein Tagesplan.</p>
        <p style={S.hint}>Kein Overthinking. Direkt umsetzen. Jeden Tag ein kleiner Schritt. Jeden Tag ein kleiner Schritt.</p>
      </div>

      <div style={S.wrap2}>

        {/* FORM */}
        {screen === "form" && (
          <div style={S.card}>
            <span style={S.ctag}>Kurze Einordnung</span>
            <h2 style={S.ch2}>3 schnelle Fragen – dann geht's los</h2>
            <p style={S.desc}>Damit dein Plan wirklich zu dir passt.</p>
            <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
              <div style={S.dateChip}>{getToday()}</div>
              <div style={{display:"inline-block",background:["P","P_ANGEBOT"].includes(PIE_TYPES[pieIndex])?"#f4f0ff":["I","I_WIN","I_FEEDBACK"].includes(PIE_TYPES[pieIndex])?"#fff8f0":"#f0f7ff",border:"1px solid "+( ["P","P_ANGEBOT"].includes(PIE_TYPES[pieIndex])?"#c9b8ff":["I","I_WIN","I_FEEDBACK"].includes(PIE_TYPES[pieIndex])?"#ffc89a":"#9acfff"),borderRadius:8,padding:"8px 14px",fontSize:12,fontWeight:700,color:["P","P_ANGEBOT"].includes(PIE_TYPES[pieIndex])?"#7b5ea7":["I","I_WIN","I_FEEDBACK"].includes(PIE_TYPES[pieIndex])?"#d4730a":"#2a7db5"}}>
                Content heute: {PIE_NAMES[PIE_TYPES[pieIndex]]}
              </div>
            </div>

            <div style={S.qWrap}>
              <label style={S.qLabel}><span style={S.qNum}>1</span>Was bist du?</label>
              <div style={S.optRow}>
                {BERUF_OPTIONS.map(o => <div key={o} style={S.opt(answers.beruf === o)} onClick={() => setA("beruf", o)}>{o}</div>)}
              </div>
              {answers.beruf === "Anderes" && (
                <textarea style={{ ...S.ta, marginTop: 8, minHeight: 44 }} placeholder="Was machst du genau?"
                  value={answers.berufCustom} onChange={e => setA("berufCustom", e.target.value)} rows={1} />
              )}
            </div>

            <div style={S.qWrap}>
              <label style={S.qLabel}><span style={S.qNum}>2</span>Wo stehst du gerade?</label>
              <div style={S.optRow}>
                {LEVEL_OPTIONS.map(o => <div key={o} style={S.opt(answers.level === o)} onClick={() => setA("level", o)}>{o}</div>)}
              </div>
            </div>

            <div style={S.qWrap}>
              <label style={S.qLabel}><span style={S.qNum}>3</span>Was ist heute dein Fokus?</label>
              <div style={S.optRow}>
                {FOKUS_OPTIONS.map(o => <div key={o} style={S.opt(answers.fokus === o)} onClick={() => setA("fokus", o)}>{o}</div>)}
              </div>
            </div>


            {error && <div style={S.errBox}>⚠ {error}</div>}
            <button style={S.btnMain} onClick={generate}>Meinen Tagesplan erstellen →</button>
          </div>
        )}

        {/* LOADING */}
        {screen === "loading" && (
          <div style={S.loadWrap}>
            <div style={S.spinner} />
            <div style={S.ltxt}>{loadMsg}</div>
          </div>
        )}

        {/* RESULT */}
        {screen === "result" && result && (
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {[answers.beruf === "Anderes" ? answers.berufCustom : answers.beruf, answers.level, answers.fokus].filter(Boolean).map((c, i) => (
                <span key={i} style={S.chip}>{c}</span>
              ))}
            </div>

            {/* 01 Content */}
            <div style={S.rcrd}>
              <h3 style={S.rh3}><span style={S.rnum}>01</span> Content Move</h3>
              <div style={S.rbody}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
                  {result.pie_typ && <div style={S.pieBadge(result.pie_typ)}>{PIE_LABEL[result.pie_typ] || result.pie_typ}</div>}
                  {result.content?.typ && <div style={{ display: "inline-block", background: "#f0f0f0", color: "#666", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 4, letterSpacing: 1 }}>{result.content.typ}</div>}
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#cc3333", marginBottom: 4 }}>Hook — fertig zum Posten</div>
                  <div style={S.hookBox}>
                    <button style={{ background: "#3d3d3d", border: "none", color: "#fff", borderRadius: 5, padding: "3px 9px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", float: "right", marginLeft: 8 }}
                      onClick={() => doCopy("hook", result.content?.hook || "")}>
                      {copied["hook"] ? "Kopiert ✓" : "Kopieren"}
                    </button>
                    {result.content?.hook}
                  </div>
                </div>
                <div style={{ marginBottom: 8, color: "#555" }}><strong style={{ color: "#999", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Post-Text </strong><br />{result.content?.inhalt}</div>
                <div style={{ color: "#555" }}><strong style={{ color: "#cc3333", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>CTA — fertig zum Posten </strong><br />{result.content?.cta}</div>
              </div>
            </div>

            {/* 02 Money Move */}
            <div style={S.rcrd}>
              <h3 style={S.rh3}><span style={S.rnum}>02</span> Money Move</h3>
              <div style={S.rbody}>
                <p style={{ marginBottom: 10 }}><strong>{result.money_move?.aktion}</strong></p>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#cc3333", marginBottom: 4 }}>Nachricht – direkt kopieren</div>
                <Hl id="money" text={result.money_move?.nachricht} />
              </div>
            </div>

            {/* 03 Daily To-Do */}
            <div style={S.rcrd}>
              <h3 style={S.rh3}><span style={S.rnum}>03</span> Daily To-Do</h3>
              <div style={S.rbody}>
                <div style={S.todoBox}>
                  <strong style={{ color: "#5a3a8a" }}>{result.daily_todo?.aufgabe}</strong>
                </div>
                <p style={{ fontSize: 13, color: "#666", fontStyle: "italic" }}>{result.daily_todo?.warum}</p>
              </div>
            </div>

            {/* Coaching Hinweis */}
            {result.coaching_hinweis && (
              <div style={S.coachBox}>{result.coaching_hinweis}</div>
            )}

            {/* Challenge */}
            <div style={S.challengeBox}>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 6, color: "#fff" }}>Mini Challenge</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 12 }}>
                Schaffst du alle 3 in unter 15 Minuten?<br />
                <span style={{ fontSize: 12, opacity: 0.6 }}>Geschafft = +1 Streak · Ziel: 5 Tage</span>
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 0 }}>
                {[1,2,3,4,5].map(i => <div key={i} style={S.streakDot(i <= streak)}>{i <= streak ? "✓" : i}</div>)}
              </div>
              <button style={S.streakBtn(streakDone)} onClick={!streakDone ? () => { setStreak(s => s + 1); setStreakDone(true); } : undefined}>
                {streakDone ? `Streak: ${streak} Tag${streak > 1 ? "e" : ""} ✓` : "Geschafft – Streak +1"}
              </button>
            </div>

            {/* Julia sagt */}
            {result.julia_comment && (
              <div style={S.juliaBox}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#e05050", marginBottom: 8 }}>Julia sagt</div>
                <div style={{ fontSize: 15, color: "#1a1a1a", fontWeight: 600, lineHeight: 1.6 }}>{result.julia_comment}</div>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button style={{ ...S.btnBack, flex: 1 }} onClick={() => { setResult(null); setError(""); setScreen("form"); }}>Einordnung ändern</button>
              <button style={{ ...S.btnMain, marginTop: 0, flex: 2 }} onClick={() => { setResult(null); setError(""); setScreen("form"); setPieIndex(i => (i + 1) % 3); }}>Plan für morgen</button>
            </div>
          </div>
        )}
      </div>
      <div style={S.footer}>fitnesszumbusiness.de · Julia Ehrenheim</div>
    </div>
  );
}
