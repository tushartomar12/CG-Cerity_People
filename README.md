# CG People — HR Technology & Consulting Website

Premium B2B marketing site built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize for production

| Area | Location |
|------|----------|
| Company name, contact, social, URL | `lib/site-config.ts` |
| Page copy, stats, blog posts, modules | `lib/data.ts` |
| Brand colors | `app/globals.css` (`:root` + `@theme`) |
| Logo | Replace `public/logo.svg` and `components/Logo.tsx` |
| Contact form API | `components/ContactForm.tsx` (submit handler) |
| Site URL (SEO) | `NEXT_PUBLIC_SITE_URL` env variable |

## Pages

- `/` — Home
- `/about` — About
- `/hr-tech` — HRMS / HR Technology
- `/consulting` — HR Consulting
- `/solutions` — Solutions & industries
- `/insights` — Resources (CMS-ready list)
- `/insights/[slug]` — Article template
- `/contact` — Contact & consultation form

## Build

```bash
npm run build
npm start
```
