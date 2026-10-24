# ধারখোর সার্টিফিকেট 😂

বন্ধুর জন্য মজার “ধারখোর সার্টিফিকেট” বানানোর একটা বাংলা ওয়েব অ্যাপ — যে বন্ধু সবসময় বলে “ভাই, কালকে দিয়ে দেব!”

**৩০ দিনে ৩০ ওয়েবসাইট — Day 01**

![ধারখোর সার্টিফিকেট](public/og-image.png)

## Features

- Live certificate preview while you type
- 6 funny preset titles, or write your own
- 3 themes: Classic Gold, Midnight, Playful
- High-quality 1080×1350 PNG export with correct Bengali text rendering
- Native share (Web Share API) with download / copy-link fallback
- No login, no backend, no data stored — everything runs in the browser

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Zod · html-to-image · Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Environment variables (optional)

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL, used for Open Graph and canonical links |
| `NEXT_PUBLIC_IDEA_URL` | Link for the "suggest the next idea" button |

---

শুধুমাত্র মজা ও বন্ধুত্বের জন্য।
