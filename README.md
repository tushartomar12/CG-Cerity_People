# Cerity People

Marketing site for Cerity People (HR technology and consulting). Next.js 16, React 19, Tailwind CSS v4.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local` if you need to override the public site URL:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for SEO (defaults to `https://www.ceritypeople.com`) |

Company name, contact, and social links live in `lib/site-config.ts`. Page copy lives in `lib/data.ts`.
