# Database and email

Contact form and HR assessment leads are stored in PostgreSQL via Prisma. Each successful save can trigger **two** emails: one to the sales inbox, then one confirmation to the visitor. SMTP goes through `lib/email.ts` (Nodemailer). Swap that file later for AWS SES or Resend without changing the API routes.

Leads are always saved first. Email failure never rolls back the row.

## Environment variables

Copy `.env.example` to `.env`. Never commit `.env`.

| Name | Use |
|---|---|
| `DATABASE_URL` | Runtime Postgres URL (use the **pooled** URL on Vercel / Neon / Supabase) |
| `DIRECT_URL` | Direct (non-pooled) URL for Prisma Migrate. Locally, set this to the same value as `DATABASE_URL` |
| `SMTP_HOST` | SMTP hostname |
| `SMTP_PORT` | `587` (STARTTLS, `requireTLS`) or `465` (implicit TLS) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `EMAIL_FROM` | From address only, e.g. `Cerity People <hello@ceritypeople.com>`. Visitor addresses are never used as From. |
| `SALES_TEAM_EMAIL` | Inbox that receives lead notifications |
| `EMAIL_REPLY_TO_PEOPLE` | Optional Reply-To on visitor confirmations. Falls back to `SALES_TEAM_EMAIL`. Prefer a monitored inbox, not no-reply. |
| `IP_HASH_SALT` | Salt for hashed IPs (do not store raw IPs) |
| `NEXT_PUBLIC_SITE_URL` | Public site origin (logo, privacy, book-a-consultation links) |

`EMAIL_PROVIDER_API_KEY` is reserved for a later Resend/SES swap; SMTP uses `SMTP_PASS` instead.

Configure **SPF and DKIM** on the domain used in `EMAIL_FROM` so confirmations are less likely to land in spam. That is DNS on your side, not application code.

## Two-email flow

1. Validate (Zod, honeypot, IP rate limit, PDF checks).
2. Insert the row with `salesEmailStatus` and `userEmailStatus` = `PENDING`.
3. Send sales mail. Update sales status to `SENT` or `FAILED`.
4. If this visitor address already has **3** confirmation emails with `userEmailStatus = SENT` in the last hour across **both** tables, set user status to `SKIPPED` (`hourly_cap`) and do not send.
5. Otherwise send the visitor confirmation. Update user status to `SENT` or `FAILED`.
6. Respond `{ ok: true, userEmailSent: boolean }` even if mail failed.

Honeypot submissions return `{ ok: true, userEmailSent: false }` and create no row.

Sales failure does not skip the visitor email (unless the hourly cap applies). Visitor `To` is their address; `From` is always `EMAIL_FROM`. Sales mail uses Reply-To = visitor. User mail uses Reply-To = `EMAIL_REPLY_TO_PEOPLE` or `SALES_TEAM_EMAIL`.

Route timeouts: contact `maxDuration` 30s; full assessment `maxDuration` 60s (PDF + two SMTP waits); quick check `/api/assessment0` 30s. SMTP connection/greeting/socket timeouts are 15s. The transporter is verified once per process.

## Quick check (`/assessment0`)

Hidden single-page flow. Saves to the same `AssessmentSubmission` table with `assessmentType = QUICK` (existing rows default to `FULL`). No PDF. Sales subject is prefixed `New QUICK HR check`. Visitor mail invites them to `/assessment` and `/contact`. Retry can resend QUICK sales and user mail without a PDF. FULL user mail still cannot be resent without regenerating the PDF.

## Status columns

`EmailStatus`: `PENDING | SENT | FAILED | SKIPPED`.

On both `ContactSubmission` and `AssessmentSubmission`:

- `salesEmailStatus`, `salesEmailError`, `salesEmailSentAt`
- `userEmailStatus`, `userEmailError`, `userEmailSentAt`

## Local migrations

```bash
npx prisma generate
npx prisma migrate dev
```

`migrate dev` applies pending SQL from `prisma/migrations/` and regenerates the client. Do not use `prisma db push` in production.

## Production migrations

```bash
npx prisma migrate deploy
```

Run this against the **direct** connection string (`DIRECT_URL`). On Vercel, add a deploy command or CI step: `prisma migrate deploy && next build`. `postinstall` already runs `prisma generate`.

## pgAdmin

1. Host, port, user, password and database from the same Postgres URL as `DIRECT_URL`.
2. SSL: require it if the host requires SSL (most hosted providers).
3. Tables: `ContactSubmission`, `AssessmentSubmission` (Prisma default names). Enums: `EmailStatus`, `MaturityBand`.

## Vercel

1. Set all env vars in the project dashboard (Production + Preview).
2. `DATABASE_URL` = pooled. `DIRECT_URL` = direct (needed for `migrate deploy`).
3. `postinstall`: `prisma generate` so the client exists at build time.
4. Rate limits are in-memory (5 POSTs / 10 minutes per hashed IP per route) and reset per serverless instance.

## Moving to AWS RDS + SES

1. Point `DATABASE_URL` / `DIRECT_URL` at RDS (same Postgres; no provider-specific features).
2. Run `npx prisma migrate deploy` against RDS so schema matches.
3. Replace the implementation inside `lib/email.ts` with SES (keep `sendEmail({ to, subject, html, text, attachments, replyTo })`).
4. Keep `EMAIL_FROM`, `SALES_TEAM_EMAIL`, and `EMAIL_REPLY_TO_PEOPLE` as-is.

## Retry failed emails

```bash
npx tsx scripts/retry-failed-emails.ts
```

Contact rows with `salesEmailStatus = FAILED` and/or `userEmailStatus = FAILED` are resent independently.

Assessment PDFs are not stored. The script logs `PDF not stored — regenerate to resend` and **does not** send visitor assessment mail without a PDF. Set `RETRY_ASSESSMENT_SALES_WITHOUT_PDF=1` to send assessment **sales-only** mail with no attachment (default off).
