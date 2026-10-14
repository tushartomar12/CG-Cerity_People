import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
  cid?: string;
};

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

const SMTP_TIMEOUT_MS = 15_000;

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function envStr(name: string): string {
  const raw = process.env[name];
  if (!raw) return "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

function smtpPort(): number {
  return Number(envStr("SMTP_PORT") || 587);
}

function createTransport(): Transporter {
  const host = envStr("SMTP_HOST");
  const user = envStr("SMTP_USER");
  const pass = envStr("SMTP_PASS").replace(/\s+/g, "");
  if (!host || !user || !pass) {
    console.error("[email] SMTP not configured");
    throw new Error("SMTP is not configured");
  }
  const port = smtpPort();
  const secure = port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure && port === 587,
    auth: { user, pass },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  });
}

let transportPromise: Promise<Transporter> | null = null;

async function getTransport(): Promise<Transporter> {
  if (!transportPromise) {
    transportPromise = (async () => {
      const mail = createTransport();
      try {
        await mail.verify();
      } catch (err) {
        transportPromise = null;
        const message = err instanceof Error ? err.message : "verify_failed";
        console.error("[email] SMTP verify failed", message);
        throw new Error(message.includes("Invalid login") || message.includes("535")
          ? "SMTP login rejected by Gmail (username or password)"
          : "SMTP verify failed");
      }
      return mail;
    })();
  }
  return transportPromise;
}

function brandLogoAttachment(): EmailAttachment | null {
  const file = path.join(process.cwd(), "public", "cerity-logo.png");
  try {
    return {
      filename: "cerity-logo.png",
      content: fs.readFileSync(file),
      contentType: "image/png",
      cid: "cerity-logo",
    };
  } catch {
    console.error("[email] brand logo file missing");
    return null;
  }
}

export async function sendEmail(input: SendEmailInput): Promise<void> {
  const from = envStr("EMAIL_FROM");
  if (!from) throw new Error("EMAIL_FROM is not configured");
  const mail = await getTransport();
  const logo = brandLogoAttachment();
  const attachments = [
    ...(logo ? [logo] : []),
    ...(input.attachments ?? []),
  ].map((a) => ({
    filename: sanitizeHeader(a.filename),
    content: a.content,
    contentType: a.contentType,
    cid: a.cid,
    contentDisposition: a.cid ? ("inline" as const) : ("attachment" as const),
  }));
  await mail.sendMail({
    from,
    to: sanitizeHeader(input.to),
    subject: sanitizeHeader(input.subject),
    html: input.html,
    text: input.text,
    replyTo: input.replyTo ? sanitizeHeader(input.replyTo) : undefined,
    attachments,
  });
}

export function salesTeamEmail(): string {
  const to = envStr("SALES_TEAM_EMAIL");
  if (!to) throw new Error("SALES_TEAM_EMAIL is not configured");
  return to;
}

export function replyToForPeople(): string {
  return envStr("EMAIL_REPLY_TO_PEOPLE") || salesTeamEmail();
}

export function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ceritypeople.com").replace(/\/$/, "");
}
