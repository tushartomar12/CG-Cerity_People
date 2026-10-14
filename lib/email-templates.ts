import type { AssessmentDetails } from "./assessment-data";
import type { Assessment0Details } from "./assessment0-data";
import type { Assessment0Result } from "./assessment0-scoring";
import type { AssessmentResult } from "./assessment-scoring";
import { siteOrigin } from "./email";
import { siteConfig } from "./site-config";
import type { ContactInput } from "./validation";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function companySlug(company: string): string {
  const slug = company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return slug || "organisation";
}

export function assessmentPdfFilename(company: string, at = new Date()): string {
  const y = at.toISOString().slice(0, 10);
  return `Cerity-People-HR-Assessment-${companySlug(company)}-${y}.pdf`;
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px;color:#5B6B7C;vertical-align:top;width:38%">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#102840">${escapeHtml(value)}</td></tr>`;
}

function wrap(opts: {
  preheader: string;
  title: string;
  bodyHtml: string;
  reason: string;
}): string {
  const origin = siteOrigin();
  const privacy = `${origin}/privacy`;
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#F8F8F8;">
  <div style="display:none;max-height:0;overflow:hidden">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F8F8;padding:24px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid #E2E8F0">
          <tr>
            <td style="background:#FFFFFF;padding:20px 24px;border-bottom:3px solid #F59E0B">
              <img src="cid:cerity-logo" alt="Cerity People" width="200" style="display:block;height:auto;max-width:200px;border:0" />
            </td>
          </tr>
          <tr>
            <td style="padding:24px;font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.5;color:#102840">
              <h1 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#102840">${escapeHtml(opts.title)}</h1>
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px 24px;font-family:'DM Sans',Arial,sans-serif;font-size:12px;line-height:1.45;color:#5B6B7C;border-top:1px solid #E2E8F0">
              <p style="margin:0 0 8px">${escapeHtml(siteConfig.legalName)}</p>
              <p style="margin:0 0 8px">${escapeHtml(opts.reason)}</p>
              <p style="margin:0"><a href="${privacy}" style="color:#1677E8">Privacy Policy</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

type Mail = { subject: string; html: string; text: string };

export function contactSalesEmail(
  data: ContactInput,
  meta: { id: string; submittedAt: Date },
): Mail {
  const subject = sanitizeHeader(`New enquiry: ${data.fullName} (${data.company})`);
  const fields = [
    row("Name", data.fullName),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Company", data.company),
    row("Company size", data.companySize),
    row("Country", data.country),
    row("Service", data.service),
    row("Message", data.message),
    row("Submitted", meta.submittedAt.toISOString()),
    row("Record id", meta.id),
  ].join("");
  const html = wrap({
    preheader: `New enquiry from ${data.fullName}`,
    title: "New website enquiry",
    reason: "Internal notification of a contact form submission on the Cerity People website.",
    bodyHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0">${fields}</table>`,
  });
  const text = [
    "New website enquiry",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Company: ${data.company}`,
    `Company size: ${data.companySize}`,
    `Country: ${data.country}`,
    `Service: ${data.service}`,
    `Message: ${data.message}`,
    `Submitted: ${meta.submittedAt.toISOString()}`,
    `Record id: ${meta.id}`,
  ].join("\n");
  return { subject, html, text };
}

export function contactUserEmail(data: ContactInput): Mail {
  const subject = "Thanks for contacting Cerity People";
  const body = `
    <p style="margin:0 0 12px">Hello ${escapeHtml(data.fullName.split(" ")[0] || data.fullName)},</p>
    <p style="margin:0 0 12px">Thank you for reaching out. Our team will connect with you soon.</p>
    <p style="margin:0 0 8px"><strong>Your enquiry</strong></p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0">
      ${row("Service", data.service)}
      ${row("Message", data.message)}
    </table>
    <p style="margin:16px 0 0">You can reach us at <a href="mailto:${escapeHtml(siteConfig.contact.email)}" style="color:#1677E8">${escapeHtml(siteConfig.contact.email)}</a> or ${escapeHtml(siteConfig.contact.phone)}.</p>
  `;
  const html = wrap({
    preheader: "We received your enquiry and will be in touch soon.",
    title: "We received your message",
    reason: "You received this because you contacted us on the Cerity People website.",
    bodyHtml: body,
  });
  const text = [
    `Hello ${data.fullName.split(" ")[0] || data.fullName},`,
    "",
    "Thank you for reaching out. Our team will connect with you soon.",
    "",
    `Service: ${data.service}`,
    `Message: ${data.message}`,
    "",
    `Reach us: ${siteConfig.contact.email} · ${siteConfig.contact.phone}`,
    "",
    `${siteConfig.legalName}`,
    "You received this because you contacted us on the Cerity People website.",
    `${siteOrigin()}/privacy`,
  ].join("\n");
  return { subject, html, text };
}

export function assessmentSalesEmail(
  details: AssessmentDetails,
  result: AssessmentResult,
  meta: { id: string; submittedAt: Date },
): Mail {
  const subject = sanitizeHeader(
    `New HR assessment: ${details.company}, ${result.overallBand} (${result.overall}/100)`,
  );
  const catRows = result.categories.map((c) => row(c.category, `${c.percent} · ${c.band}`)).join("");
  const quotes = result.quotedText
    .map((q) => row(q.category, q.answer || "No response provided"))
    .join("");
  const gaps = result.gaps
    .slice(0, 3)
    .map((g, i) =>
      row(
        `${i + 1}. ${g.category}`,
        `${g.percent}% · ${g.band} · ${g.insights[0] ?? ""} (${g.indicativeHoursPerMonth} h/mo indicative)`,
      ),
    )
    .join("");
  const html = wrap({
    preheader: `${details.company}: ${result.overall} ${result.overallBand}`,
    title: "New HR Health Assessment",
    reason: "Internal notification of an assessment completed on the Cerity People website.",
    bodyHtml: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;margin-bottom:16px">
        ${row("Name", details.name)}
        ${row("Email", details.email)}
        ${row("Company", details.company)}
        ${row("Size", details.companySize)}
        ${row("Industry", details.industry)}
        ${row("HR headcount", details.hrHeadcount)}
        ${row("HRMS today", details.hrmsToday)}
        ${row("Overall score", `${result.overall} · ${result.overallBand}`)}
        ${row("Indicative hours/month", String(result.indicativeHoursPerMonth))}
        ${row("Compliance (indicative)", result.complianceLevel)}
        ${row("Submitted", meta.submittedAt.toISOString())}
        ${row("Record id", meta.id)}
      </table>
      <p style="margin:0 0 8px"><strong>Category scores</strong></p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;margin-bottom:16px">${catRows}</table>
      <p style="margin:0 0 8px"><strong>One-line answers</strong></p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;margin-bottom:16px">${quotes}</table>
      <p style="margin:0 0 8px"><strong>Top 3 priority gaps</strong></p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0">${gaps}</table>
      <p style="margin:16px 0 0">The PDF report is attached.</p>
    `,
  });
  const text = [
    "New HR Health Assessment",
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Company: ${details.company}`,
    `Overall: ${result.overall} ${result.overallBand}`,
    `Record id: ${meta.id}`,
    "",
    "Category scores:",
    ...result.categories.map((c) => `- ${c.category}: ${c.percent} ${c.band}`),
    "",
    "One-line answers:",
    ...result.quotedText.map((q) => `- ${q.category}: ${q.answer || "No response provided"}`),
    "",
    "Top 3 priority gaps:",
    ...result.gaps.slice(0, 3).map((g, i) => `${i + 1}. ${g.category} ${g.percent}% ${g.band} — ${g.insights[0] ?? ""}`),
  ].join("\n");
  return { subject, html, text };
}

export function assessmentUserEmail(details: AssessmentDetails, result: AssessmentResult): Mail {
  const subject = "Your HR Health Assessment report from Cerity People";
  const greeting = details.name.trim() || details.company;
  const bookUrl = `${siteOrigin()}/contact`;
  const gapsHtml = result.gaps
    .slice(0, 3)
    .map(
      (g) =>
        `<li style="margin:0 0 8px">${escapeHtml(g.category)} — ${g.percent}% (${escapeHtml(g.band)}): ${escapeHtml(g.insights[0] ?? "")}</li>`,
    )
    .join("");
  const body = `
    <p style="margin:0 0 12px">Hello ${escapeHtml(greeting)},</p>
    <p style="margin:0 0 12px">Thank you for completing the HR Health Assessment. Your indicative overall score is <strong>${result.overall}/100</strong> (${escapeHtml(result.overallBand)}).</p>
    <p style="margin:0 0 8px"><strong>Your top priority areas</strong></p>
    <ul style="margin:0 0 16px;padding-left:18px">${gapsHtml}</ul>
    <p style="margin:0 0 16px">A copy of your report is attached. A Cerity People expert will get in touch.</p>
    <p style="margin:0 0 20px">
      <a href="${bookUrl}" style="display:inline-block;background:#1677E8;color:#FFFFFF;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:700">Book a consultation</a>
    </p>
    <p style="margin:0;font-size:13px;color:#5B6B7C">Figures in this report are indicative and based on self-reported answers.</p>
  `;
  const html = wrap({
    preheader: `Your indicative score is ${result.overall} (${result.overallBand}).`,
    title: "Your HR Health Assessment",
    reason: "You received this because you completed our assessment on the Cerity People website.",
    bodyHtml: body,
  });
  const text = [
    `Hello ${greeting},`,
    "",
    `Thank you for completing the HR Health Assessment. Your indicative overall score is ${result.overall}/100 (${result.overallBand}).`,
    "",
    "Your top priority areas:",
    ...result.gaps.slice(0, 3).map((g) => `- ${g.category} — ${g.percent}% (${g.band}): ${g.insights[0] ?? ""}`),
    "",
    "A copy of your report is attached. A Cerity People expert will get in touch.",
    `Book a consultation: ${bookUrl}`,
    "",
    "Figures in this report are indicative and based on self-reported answers.",
    "",
    `${siteConfig.legalName}`,
    "You received this because you completed our assessment on the Cerity People website.",
    `${siteOrigin()}/privacy`,
  ].join("\n");
  return { subject, html, text };
}

export function assessment0SalesEmail(
  details: Assessment0Details,
  result: Assessment0Result,
  meta: { id: string; submittedAt: Date },
): Mail {
  const subject = sanitizeHeader(
    `New QUICK HR check: ${details.email}, ${result.overallBand} (${result.overall}/100)`,
  );
  const catRows = result.categories.map((c) => row(c.category, `${c.percent} · ${c.band}`)).join("");
  const quotes = result.quotedText
    .map((q) => row(q.prompt, q.answer || "No response provided"))
    .join("");
  const gaps = result.gaps
    .slice(0, 3)
    .map((g, i) => row(`${i + 1}. ${g.category}`, `${g.percent}% · ${g.band} · ${g.insights[0] ?? ""}`))
    .join("");
  const html = wrap({
    preheader: `Quick check ${details.email}: ${result.overall} ${result.overallBand}`,
    title: "New QUICK HR check",
    reason: "Internal notification of a quick HR check completed on the Cerity People website.",
    bodyHtml: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;margin-bottom:16px">
        ${row("Email", details.email)}
        ${row("Size", details.companySize)}
        ${row("HR headcount", details.hrHeadcount)}
        ${row("HRMS today", details.hrmsToday)}
        ${row("Overall score", `${result.overall} · ${result.overallBand}`)}
        ${row("Submitted", meta.submittedAt.toISOString())}
        ${row("Record id", meta.id)}
      </table>
      <p style="margin:0 0 8px"><strong>Category scores</strong></p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;margin-bottom:16px">${catRows}</table>
      ${quotes ? `<p style="margin:0 0 8px"><strong>Biggest headache</strong></p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;margin-bottom:16px">${quotes}</table>` : ""}
      <p style="margin:0 0 8px"><strong>Top 3 priority gaps</strong></p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0">${gaps}</table>
    `,
  });
  const text = [
    "New QUICK HR check",
    `Email: ${details.email}`,
    `Overall: ${result.overall} ${result.overallBand}`,
    `Record id: ${meta.id}`,
    "",
    "Category scores:",
    ...result.categories.map((c) => `- ${c.category}: ${c.percent} ${c.band}`),
    "",
    "Top 3 priority gaps:",
    ...result.gaps.slice(0, 3).map((g, i) => `${i + 1}. ${g.category} ${g.percent}% ${g.band} — ${g.insights[0] ?? ""}`),
  ].join("\n");
  return { subject, html, text };
}

export function assessment0UserEmail(details: Assessment0Details, result: Assessment0Result): Mail {
  const subject = "Your quick HR check results from Cerity People";
  const bookUrl = `${siteOrigin()}/contact`;
  const fullUrl = `${siteOrigin()}/assessment`;
  const gapsHtml = result.gaps
    .slice(0, 3)
    .map(
      (g) =>
        `<li style="margin:0 0 8px">${escapeHtml(g.category)} — ${g.percent}% (${escapeHtml(g.band)}): ${escapeHtml(g.insights[0] ?? "")}</li>`,
    )
    .join("");
  const body = `
    <p style="margin:0 0 12px">Hello,</p>
    <p style="margin:0 0 12px">Thank you for completing the quick HR check. Your indicative score is <strong>${result.overall}/100</strong> (${escapeHtml(result.overallBand)}).</p>
    <p style="margin:0 0 8px"><strong>Areas to look at first</strong></p>
    <ul style="margin:0 0 16px;padding-left:18px">${gapsHtml}</ul>
    <p style="margin:0 0 16px">This is a short snapshot, not the full briefing. If you would like a detailed report or a conversation, you can take the full assessment or book a consultation — there is no obligation.</p>
    <p style="margin:0 0 12px">
      <a href="${bookUrl}" style="display:inline-block;background:#1677E8;color:#FFFFFF;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:700">Book a consultation</a>
    </p>
    <p style="margin:0 0 16px;font-size:14px"><a href="${fullUrl}" style="color:#1677E8">Take the full assessment</a></p>
    <p style="margin:0;font-size:13px;color:#5B6B7C">Figures are indicative and based on a quick self-assessment.</p>
  `;
  const html = wrap({
    preheader: `Your indicative quick-check score is ${result.overall} (${result.overallBand}).`,
    title: "Your quick HR check",
    reason: "You received this because you completed our quick HR check on the Cerity People website.",
    bodyHtml: body,
  });
  const text = [
    "Hello,",
    "",
    `Thank you for completing the quick HR check. Your indicative score is ${result.overall}/100 (${result.overallBand}).`,
    "",
    "Areas to look at first:",
    ...result.gaps.slice(0, 3).map((g) => `- ${g.category} — ${g.percent}% (${g.band}): ${g.insights[0] ?? ""}`),
    "",
    "This is a short snapshot, not the full briefing. If you would like a detailed report or a conversation, you can take the full assessment or book a consultation — there is no obligation.",
    `Book a consultation: ${bookUrl}`,
    `Take the full assessment: ${fullUrl}`,
    "",
    "Figures are indicative and based on a quick self-assessment.",
    "",
    `${siteConfig.legalName}`,
    "You received this because you completed our quick HR check on the Cerity People website.",
    `${siteOrigin()}/privacy`,
  ].join("\n");
  return { subject, html, text };
}
