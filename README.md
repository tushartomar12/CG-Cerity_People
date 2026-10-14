# Cerity People

Marketing site for Cerity People (HR technology and consulting). Next.js 16, React 19, Tailwind CSS v4.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm start
```

Requires Node.js 20.9 or later.

## Environment

Copy `.env.example` to `.env.local` and fill in values. Never commit `.env.local`.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for SEO (defaults to `https://www.ceritypeople.com`) |
| `DATABASE_URL` | PostgreSQL pooled URL (Prisma) |
| `DIRECT_URL` | PostgreSQL direct URL (migrations) |
| `SMTP_HOST` | SMTP host |
| `SMTP_PORT` | SMTP port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `EMAIL_FROM` | From address for outgoing mail |
| `SALES_TEAM_EMAIL` | Internal sales inbox |
| `EMAIL_REPLY_TO_PEOPLE` | Reply-To for visitor mail |
| `EMAIL_PROVIDER_API_KEY` | Reserved; unused while SMTP is the provider |
| `IP_HASH_SALT` | Salt for hashed request IPs |

Company name, contact, and social links live in `lib/site-config.ts`. Page copy lives in `lib/data.ts`.
