# 🚀 Daily Client Plan – Deploy Anleitung

## Was du brauchst
- Einen GitHub Account (kostenlos) → github.com
- Einen Netlify Account (kostenlos) → netlify.com
- Deinen Anthropic API Key → console.anthropic.com/settings/keys

---

## SCHRITT 1 – Projektordner vorbereiten

Erstelle auf deinem Computer einen Ordner namens `daily-client-plan`.
Darin legst du folgende Struktur an:

```
daily-client-plan/
├── netlify/
│   └── functions/
│       └── claude.js
├── src/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── netlify.toml
```

Kopiere alle Dateien aus diesem Download in die entsprechenden Ordner.

---

## SCHRITT 2 – Auf GitHub hochladen

1. Gehe auf github.com → einloggen
2. Klicke oben rechts auf "+" → "New repository"
3. Name: `daily-client-plan`
4. Auf "Create repository" klicken
5. Klicke auf "uploading an existing file"
6. Ziehe ALLE Dateien und Ordner per Drag & Drop rein
7. Klicke "Commit changes"

---

## SCHRITT 3 – Netlify verbinden

1. Gehe auf netlify.com → einloggen
2. Klicke auf "Add new site" → "Import an existing project"
3. Wähle "GitHub"
4. Erlaube Netlify Zugriff auf dein GitHub
5. Wähle das Repository "daily-client-plan"
6. Build-Einstellungen werden automatisch erkannt (netlify.toml)
7. Klicke "Deploy site"

---

## SCHRITT 4 – API Key hinterlegen (WICHTIG!)

Ohne diesen Schritt funktioniert das Tool nicht.

1. In Netlify: gehe zu deiner Site
2. Klicke oben auf "Site configuration"
3. Links auf "Environment variables"
4. Klicke "Add a variable"
5. Key: `ANTHROPIC_API_KEY`
6. Value: dein API Key (von console.anthropic.com/settings/keys)
7. Klicke "Save"
8. Gehe zurück zur Übersicht → "Deploys" → "Trigger deploy" → "Deploy site"

---

## SCHRITT 5 – Eigene Domain (optional aber empfohlen)

Netlify gibt dir automatisch eine URL wie:
`https://zufaelliger-name-123.netlify.app`

Für eine eigene URL:
1. Netlify → deine Site → "Domain management"
2. "Add custom domain"
3. Zum Beispiel: `tool.fitnesszumbusiness.de`
4. Dann bei deinem Domain-Anbieter den DNS-Eintrag setzen

---

## SCHRITT 6 – Teilen mit deinen Coachees

Sobald deployed, hast du eine URL die du einfach teilen kannst:
- Per WhatsApp / Telegram
- Als Link in deinem Kurs
- In deiner Instagram Bio
- Als Button auf deiner Website

Das Tool ist fertig — kein Login, kein Download, läuft im Browser. 🎉

---

## Kosten

- GitHub: kostenlos
- Netlify: kostenlos (bis 125.000 Aufrufe/Monat — reicht locker)
- Anthropic API: ca. 0,01–0,03€ pro Nutzung (sehr günstig)

Bei 100 Nutzungen täglich → ca. 1–3€ pro Tag.

---

## Probleme?

Fehlermeldung "Function timeout" → normal, einfach nochmal versuchen
Fehlermeldung "API key not found" → Schritt 4 wiederholen
Seite lädt nicht → Schritt 3 wiederholen, Build-Log prüfen
