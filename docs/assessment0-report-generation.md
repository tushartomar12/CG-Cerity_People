# Assessment0 — How the “report” is generated

This document describes the **Quick HR check** (`/assessment0`): what counts as a report, how each question and MCQ option affects output, where every string and number comes from, and what does **not** change when the user picks different options.

**Scope:** Assessment0 only. The full assessment (`/assessment`) uses a separate flow and a client-generated PDF (`ReportDocument.tsx`).

---

## 1. What is the “report”?

Assessment0 has **no PDF**. The report is the combination of:

| Output | File(s) | Notes |
|--------|---------|--------|
| On-screen results | `components/assessment0/Assessment0ResultReport.tsx` | Shown after wizard; **no API** until lead form |
| Visitor email | `lib/email-templates.ts` → `assessment0UserEmail()` | HTML + plain text |
| Sales email | `lib/email-templates.ts` → `assessment0SalesEmail()` | Internal notification |
| Database record | `app/api/assessment0/route.ts` + Prisma `AssessmentSubmission` | Scores + raw answers JSON; no prose report column |

There is **no** LLM, **no** per-option narrative generator, and **no** `conclusion` field on the result object. Prose is either **hard-coded in UI/email templates** or **fixed per question** in `lib/assessment-data.ts` (`gapInsight`, `solvedBy`).

---

## 2. End-to-end pipeline

```
Landing → Wizard (9 steps) → scoreAssessment0(answers) in browser → ResultReport + LeadCapture
  → POST /api/assessment0 only when user submits lead form (Assessment0Experience.tsx)
       → validation → scoreAssessment0 on server → DB + emails
```

**UX (2026 redesign):** `Assessment0Experience.tsx` orchestrates landing, wizard, results, and lead capture. Scoring logic is unchanged; **High / Medium / Low** on the results screen is **display-only** via `lib/assessment0-display.ts` (maps 7 scored categories → 6 UI risk areas).

**Why score on server again?** The server must compute scores for DB/emails without trusting the client.

**Source files (index):**

| Concern | Path |
|---------|------|
| Questions & categories | `lib/assessment0-data.ts` |
| Shared MCQ definitions (reused ids) | `lib/assessment-data.ts` |
| Scoring & result shape | `lib/assessment0-scoring.ts` |
| Bands & colors | `lib/assessment-data.ts` (`MATURITY_BANDS`, `BAND_COLORS`; `bandForScore` in `lib/assessment-scoring.ts`) |
| Module blurbs (“Addressed by…”) | `lib/assessment-data.ts` → `moduleCopy()` → `lib/data.ts` → `hrTechModules` |
| Form / flow UI | `components/assessment0/Assessment0Experience.tsx`, `Assessment0Landing.tsx`, `Assessment0Wizard.tsx`, `Assessment0QuestionStep.tsx` |
| Results UI | `components/assessment0/Assessment0ResultReport.tsx`, `Assessment0LeadCapture.tsx` |
| Risk display mapping | `lib/assessment0-display.ts` |
| API | `app/api/assessment0/route.ts` |
| Validation | `lib/validation.ts` |
| Emails | `lib/email-templates.ts` |
| Page route | `app/assessment0/page.tsx` (`robots: noindex`) |

---

## 3. Questions: inventory and sources

`ASSESSMENT0_QUESTIONS` in `lib/assessment0-data.ts` defines **8 items** (7 scored MCQs + 1 optional text).

### 3.1 Seven categories (always scored)

`ASSESSMENT0_CATEGORIES`:

1. Recruitment & Hiring
2. Onboarding
3. Attendance & Leave
4. Payroll & Compliance
5. Performance Management
6. Engagement & Retention
7. HR Data & Reporting

### 3.2 Question list (display order = form order)

| # | `id` | Category | Source |
|---|------|----------|--------|
| 1 | `rec-q1` | Recruitment & Hiring | `fromExisting("rec-q1", …)` → `lib/assessment-data.ts` |
| 2 | `onb-q1` | Onboarding | `fromExisting` |
| 3 | `att-q1` | Attendance & Leave | `fromExisting` |
| 4 | `pay-q1` | Payroll & Compliance | `fromExisting` (category label differs from full assessment) |
| 5 | `perf-q0` | Performance Management | Defined only in `assessment0-data.ts` |
| 6 | `eng-q0` | Engagement & Retention | Defined only in `assessment0-data.ts` |
| 7 | `dat-q2` | HR Data & Reporting | `fromExisting` |
| 8 | `headache-t0` | Engagement & Retention | Text only; `HEADACHE_MAX = 200` |

`fromExisting` copies prompt, options, scores, `gapInsight`, and `solvedBy` from the full assessment MCQ and **only overrides** `category` for Assessment0.

`solvedBy` is validated against `hrTechModules` via `moduleTitle()` — unknown module titles throw when the module list is loaded.

---

## 4. How answers are stored (MCQ vs text)

**File:** `components/assessment0/QuestionCard.tsx`

- MCQ: `onChange(opt.label)` — the **entire option label string** is stored under `answers[question.id]`.
- UI order: first radio = score 0, second = 1, third = 2, fourth = 3. Users may say “option C”; that means **third option, score 2** (not stored as “C”).
- Text (`headache-t0`): free text in a textarea; optional for scoring.

**Validation** (`assessment0PayloadSchema` in `lib/validation.ts`):

- Every MCQ `id` in `ASSESSMENT0_MCQS` must have `answers[q.id]` **exactly equal** to one of that question’s `options[].label`.
- Headache length ≤ `HEADACHE_MAX` (200).
- `details`: email, companySize, hrHeadcount (digits), hrmsToday.
- Hidden `website` honeypot: if filled, API returns success without saving.

**Important:** The visitor-facing report **does not display** raw MCQ labels. Only the headache field is quoted verbatim on screen and in the sales email.

---

## 5. Scoring algorithm (`scoreAssessment0`)

**File:** `lib/assessment0-scoring.ts`  
**Input:** `answers: Record<string, string>`  
**Output:** `Assessment0Result`:

```ts
{
  overall: number;           // 0–100, one decimal
  overallBand: MaturityBand;
  categories: Assessment0CategoryScore[];  // length 7
  gaps: Assessment0Gap[];                  // length 3
  quotedText: { questionId, category, prompt, answer }[];  // 0 or 1 item
}
```

### 5.1 Per-category score (one MCQ per category)

For each category in `ASSESSMENT0_CATEGORIES`:

1. Find MCQs with that `category` (count = 1).
2. `chosen = options.find(o => o.label === answers[q.id])`.
3. `rawSum = chosen?.score ?? 0` (missing/invalid → 0).
4. `percent = round((rawSum / (3 * mcqCount)) * 1000) / 10` → with one MCQ: **`percent = (score / 3) * 100`**.

**Allowed category percentages** (only four values per category):

| Option position | Score | Category % | Typical band |
|-----------------|-------|------------|----------------|
| 1st (A) | 0 | 0.0% | Critical |
| 2nd (B) | 1 | 33.3% | Critical |
| 3rd (C) | 2 | 66.7% | Developing |
| 4th (D) | 3 | 100.0% | Optimized |

Bands (`bandForScore` in `lib/assessment-scoring.ts`, thresholds in `MATURITY_BANDS`):

| Percent | Band |
|---------|------|
| 0–39 | Critical |
| 40–59 | Reactive |
| 60–79 | Developing |
| 80–100 | Optimized |

### 5.2 Overall score

`overall = average(categories[].percent)` with equal weight `1/7`, rounded to one decimal.  
`overallBand = bandForScore(overall)`.

**Effect of changing one MCQ only:** overall changes by `(newCategoryPercent - oldCategoryPercent) / 7`.

| Change on one question | Δ overall (approx.) |
|------------------------|---------------------|
| A→D (0% → 100%) | +14.3 |
| A→C (0% → 66.7%) | +9.5 |
| C→D (66.7% → 100%) | +4.8 |
| D→A (100% → 0%) | -14.3 |

### 5.3 Top gaps (three “priority” areas)

1. Copy `categories`, sort by `percent` **ascending** (lowest first).
2. `gaps = ranked.slice(0, 3)`.
3. For each gap category, load MCQs in that category and set:
   - `insights = unique list of q.gapInsight` (one string per question; here always one).
   - `solvedBy = unique list of q.solvedBy` (module title string).

**What user options change:**

- **Which three categories** appear (ranking).
- **`percent` and `band`** on each gap line.

**What user options do NOT change:**

- Wording of `insights[0]` — always the question’s static `gapInsight` from data files.
- Which module name is used — always that question’s `solvedBy`.

**Design implication:** A user on option C (66.7%, Developing) can still see gap copy written for a weaker maturity state if that category is still among their three lowest.

### 5.4 Quoted text (optional)

If `answers[headache-t0]` trimmed non-empty → one entry in `quotedText`. Does not affect scores.

### 5.5 What is NOT used in scoring

- `details.email`, `companySize`, `hrHeadcount`, `hrmsToday` — lead fields only (DB + emails).
- `consent`, `submittedAt`, `website` — compliance / anti-abuse only.

---

## 6. Full MCQ reference: options → score → report impact

For each question, changing the selected option changes **that category’s % and band**, **overall**, and possibly **gap membership**. Gap **text** and **module** rows are fixed per question id.

### Q1 — `rec-q1` — Recruitment & Hiring

**Prompt:** How do you manage open roles and candidates today?

| # | Score | Label |
|---|-------|--------|
| A | 0 | Email, WhatsApp, or memory — no single tracker |
| B | 1 | Spreadheets shared across the hiring team |
| C | 2 | A standalone ATS or job board inbox |
| D | 3 | Integrated ATS with stages, SLAs, and reporting |

- **gapInsight (if category in top 3 gaps):** “Hiring lives outside a system of record, so pipelines stall and offers are hard to audit.”
- **solvedBy:** Recruitment & ATS

### Q2 — `onb-q1` — Onboarding

**Prompt:** How do new joiners complete paperwork and day-one tasks?

| # | Score | Label |
|---|-------|--------|
| A | 0 | Paper files and chase-ups after they join |
| B | 1 | Email checklists and shared folders |
| C | 2 | A basic onboarding form or HR tool |
| D | 3 | Automated tasks, documents, and day-one readiness in one flow |

- **gapInsight:** “Onboarding is fragmented, so day-one readiness depends on who remembers to chase.”
- **solvedBy:** Onboarding

### Q3 — `att-q1` — Attendance & Leave

**Prompt:** How is attendance tracked?

| # | Score | Label |
|---|-------|--------|
| A | 0 | Paper register or no consistent record |
| B | 1 | Spreadsheets updated by managers |
| C | 2 | Basic biometric or app, little auto-regularisation |
| D | 3 | Integrated attendance with policy-based regularisation |

- **gapInsight:** “Attendance is not reliable enough for payroll, leave, or compliance.”
- **solvedBy:** Attendance

### Q4 — `pay-q1` — Payroll & Compliance

**Prompt:** How is payroll prepared each cycle, and how are statutory filings tracked?

| # | Score | Label |
|---|-------|--------|
| A | 0 | Manual calculations and reactive filings when something is due |
| B | 1 | Spreadsheets, accountant files, and calendar reminders |
| C | 2 | Payroll software with some returns handled by a consultant or tool |
| D | 3 | Integrated pay runs and tracked filings with records ready for review |

- **gapInsight:** “Payroll and compliance still depend on manual inputs, which raises error and evidence risk.”
- **solvedBy:** Payroll

**Example (user selects C on MCQ 4):**

- `answers["pay-q1"]` = C’s full label.
- Payroll category: **66.7%**, band **Developing**.
- Overall shifts vs other choices on Q4 by `(66.7 - otherPercent) / 7`.
- Payroll appears in “Top gaps” only if at least three categories score **below** 66.7% (ties: sort order among equals).
- If listed in gaps, body text is still the **same** `gapInsight`, not text tailored to option C.

### Q5 — `perf-q0` — Performance Management

**Prompt:** How do you set goals and run performance reviews?

| # | Score | Label |
|---|-------|--------|
| A | 0 | Informal conversations only — no consistent record |
| B | 1 | Annual reviews in documents or slides |
| C | 2 | A review tool, with goals still loosely tracked |
| D | 3 | Ongoing goals, reviews, and development in one system |

- **gapInsight:** “Goals and reviews are hard to coach against because they are not captured consistently.”
- **solvedBy:** Performance

### Q6 — `eng-q0` — Engagement & Retention

**Prompt:** How do you track engagement, attrition risk, and why people leave?

| # | Score | Label |
|---|-------|--------|
| A | 0 | We hear issues only when someone resigns |
| B | 1 | Occasional surveys or manager notes |
| C | 2 | Regular pulse surveys, with limited follow-up |
| D | 3 | Engagement signals, stay conversations, and action tracking |

- **gapInsight:** “Retention risk stays invisible until people leave, so action often comes too late.”
- **solvedBy:** Employee Management

### Q7 — `dat-q2` — HR Data & Reporting

**Prompt:** Where does employee data live, and how do leaders get headcount or cost views?

| # | Score | Label |
|---|-------|--------|
| A | 0 | Scattered files; leaders wait on a manual extract |
| B | 1 | Master spreadsheets and monthly slides from sheets |
| C | 2 | An HR tool for some fields; reports are not self-serve |
| D | 3 | Central profiles with dashboards for workforce insights |

- **gapInsight:** “There is no reliable source of truth for people data, so payroll and leadership reports wait on extracts.”
- **solvedBy:** HR Analytics

### Q8 — `headache-t0` — optional text

**Prompt:** What is your single biggest HR headache today?

- **Scoring:** none.
- **Report:** if non-empty, shown in `ResultPanel` and sales email; stored in `textAnswers` on server.

---

## 7. Display layer: High / Medium / Low (UI only)

The redesigned results screen uses [`lib/assessment0-display.ts`](lib/assessment0-display.ts):

- **6 cards:** Compliance, Performance, Payroll (min of Payroll & Compliance + Attendance), Hiring, Employee relations, Onboarding.
- **Risk tags:** High if category % &lt; 40; Medium if 40–79; Low if ≥ 80.
- **Headline / summary paragraph:** templates from overall band + count of High areas.
- **“Based on:”** short strings in display config; **body** text still from each MCQ’s `gapInsight`.

Scoring in `scoreAssessment0` is unchanged (7 categories, maturity bands).

---

## 8. Written text and explanations (where prose comes from)

The report **almost never generates explanations from the MCQ option the user selected.** It combines **fixed sentences** (written in source files) with **numbers and band names** computed from scores. Only one block uses the user’s own words.

There is **no** AI, **no** template like “Because you chose {option}…”, and **no** dynamic conclusion on the results screen (the visitor email has a fixed “short snapshot…” paragraph).

### 7.1 Four sources of written text

| Bucket | What it is | Changes when user picks A/B/C/D? |
|--------|------------|-----------------------------------|
| **A. UI shell** | Headings, buttons, disclaimer lines in `ResultPanel.tsx` and `email-templates.ts` | No |
| **B. Question bank** | `gapInsight` and `solvedBy` on each MCQ in `assessment-data.ts` / `assessment0-data.ts` | **No** — same paragraph for that question regardless of option |
| **C. Product catalog** | Module `title` + `description` from `hrTechModules` in `lib/data.ts` via `moduleCopy()` | No |
| **D. User** | Optional “biggest headache” (`headache-t0`) | Only if they typed something |

**MCQ option labels** (radio button text) are **not** copied into the report. Scoring maps label → **score 0–3** only.

### 7.2 How gap “explanations” are attached (scoring code)

When building `gaps`, scoring copies pre-written strings from the question definition — not from the selected option:

```ts
// lib/assessment0-scoring.ts
insights: [...new Set(catMcqs.map((q) => q.gapInsight))],
solvedBy: [...new Set(catMcqs.map((q) => q.solvedBy))],
```

The UI shows `g.insights[0]` — always that question’s **`gapInsight`**, authored once as the 4th argument to `mcq(...)` in the data files.

**Example — `pay-q1` (Payroll & Compliance):** If this category is in the top 3 gaps, the gray paragraph is always:

> Payroll and compliance still depend on manual inputs, which raises error and evidence risk.

That holds whether the user chose A, B, C, or D. Their choice only changes **percent**, **band**, **overall**, and **whether Payroll appears** in the top 3 — not this sentence.

### 7.3 One gap card — what each line is

```
┌─────────────────────────────────────────────────────────────┐
│ Payroll & Compliance · 66.7 · Developing   ← computed     │
├─────────────────────────────────────────────────────────────┤
│ Payroll and compliance still depend on manual inputs...     │  ← gapInsight (Bucket B)
│         (same text for any A/B/C/D on this question)        │
├─────────────────────────────────────────────────────────────┤
│ Addressed by Payroll — Accurate pay runs, deductions...   │  ← solvedBy (B) + description (C)
└─────────────────────────────────────────────────────────────┘
```

Rendering: `ResultPanel.tsx` uses `g.insights[0]` and `moduleCopy(g.solvedBy[0])`.

### 7.4 On-screen copy — line by line

| What the user sees | Bucket | Source file / field |
|--------------------|--------|---------------------|
| “Your indicative result”, “Quick HR check”, “Overall score”, “Category scores”, “Top gaps” | A | `ResultPanel.tsx` |
| Overall number (e.g. `66.7`) | Computed | `scoreAssessment0` → `overall` |
| Band name under gauge (e.g. `Developing`) | Computed label | `bandForScore` + `MATURITY_BANDS` in `assessment-data.ts` |
| Chart short names (“Hiring”, “Payroll”) | A | `shortLabel()` in `ResultPanel.tsx` |
| Gap title `Category · % · Band` | Computed | `result.gaps[]` |
| Gray gap paragraph | B | `gapInsight` on the MCQ for that category |
| “Addressed by **X** — …” | B + C | `solvedBy` + `moduleCopy()` → `hrTechModules` |
| “Your biggest headache today: *…*” | A + D | Fixed prefix + `quotedText[0].answer` |
| “Indicative, based on a quick self-assessment.” | A | `ResultPanel.tsx` |
| “We’ve also emailed your result to …” | A + form | `details.email` |
| Button / link labels | A | `ResultPanel.tsx` |

### 7.5 Email prose — line by line

**Visitor (`assessment0UserEmail`):**

| Text | Bucket | Notes |
|------|--------|--------|
| “Hello,”, “Thank you for completing the quick HR check…” | A | Fixed in `email-templates.ts` |
| `X/100` and band in body | Computed | `result.overall`, `result.overallBand` |
| “Areas to look at first” | A | Fixed heading |
| Each gap bullet: `Category — N% (Band): …` | Computed + B | Numbers from scoring; sentence after colon is `g.insights[0]` |
| “This is a short snapshot, not the full briefing…” | A | Fixed conclusion / CTA |
| “Figures are indicative and based on a quick self-assessment.” | A | Fixed disclaimer |
| Footer legal name, privacy link | A | `wrap()` + `siteConfig.legalName` |

**Sales (`assessment0SalesEmail`):** Lead fields from form; category table from `result.categories`; headache from `quotedText` (Bucket D); gap rows use same `insights[0]` (Bucket B) as the UI.

**Not in visitor email:** raw MCQ option labels (stored in DB `answers` JSON only).

### 7.6 What MCQ options actually change in the report

1. Label → **score 0–3**
2. Score → **category %** and **band**
3. All categories → **overall** and **which three categories** are `gaps`

Option **label text** does not appear in the results UI or visitor email.

### 7.7 Editing explanation copy

| Goal | Edit |
|------|------|
| Gray gap paragraph | `gapInsight` on that MCQ |
| Which module is named | `solvedBy` on that MCQ |
| Text after the dash on “Addressed by…” | `hrTechModules` in `lib/data.ts` |
| Headings / on-screen disclaimer | `ResultPanel.tsx` |
| Email wording / disclaimer | `assessment0UserEmail` / `assessment0SalesEmail` in `email-templates.ts` |
| Different explanation per option (A/B/C/D) | **Not implemented** — requires new data shape and code |

---

## 9. On-screen report (`Assessment0ResultReport.tsx`) — quick reference

| UI element | Data source | Changes with MCQ options? |
|------------|-------------|---------------------------|
| “Your indicative result” / “Quick HR check” | Hard-coded | No |
| Overall gauge | `overall`, `overallBand`, `BAND_COLORS` | Yes |
| Bar chart | `result.categories` | Yes |
| “Top gaps” title line | `category`, `percent`, `band` | Yes |
| Gap paragraph | `g.insights[0]` (`gapInsight`) | No |
| “Addressed by …” | `moduleCopy(g.solvedBy[0])` | No |
| Headache block | `quotedText[0]?.answer` | User text only |
| “Indicative, based on a quick self-assessment.” | Hard-coded disclaimer | No |
| Email confirmation line | `userEmailSent`, `details.email` | Delivery only |

---

## 10. Email content

### Visitor — `assessment0UserEmail`

**Dynamic:** `overall`, `overallBand`, gap bullets (`category`, `percent`, `band`, `insights[0]`).

**Static:** thank-you, “short snapshot, not the full briefing”, CTAs, “Figures are indicative and based on a quick self-assessment.”, footer via `wrap()` (`legalName`, privacy link).

### Sales — `assessment0SalesEmail`

**Dynamic:** lead details, all category scores, headache quotes, top 3 gaps.

**Not in visitor email:** per-question MCQ labels (stored in DB `answers` JSON only).

---

## 11. API and database

`POST /api/assessment0`: validate → `scoreAssessment0` → `AssessmentSubmission` (`assessmentType: QUICK`) → emails. No PDF attachment.

See also `docs/database-and-email.md` for email/DB operations.

---

## 12. Worked examples

**All C (score 2) on every MCQ:** each category 66.7% Developing; overall 66.7% Developing; bottom three gaps are the first three categories in sort order among ties (Recruitment, Onboarding, Attendance).

**Only Q4 = A, rest D:** Payroll 0% Critical; overall ≈ 85.7% Optimized; Payroll always in top gaps with payroll `gapInsight`.

---

## 13. Intentionally absent (vs full `/assessment`)

- Per-option narratives, PDF download, indicative hours, compliance risk label, MCQ labels in visitor email.

---

## 14. Maintainer guide

| Change | Edit |
|--------|------|
| Questions / scores | `assessment0-data.ts`, `assessment-data.ts` |
| Gap copy | `gapInsight` on each MCQ |
| Module line | `solvedBy` + `hrTechModules` |
| Bands / colors | `MATURITY_BANDS`, `BAND_COLORS` |
| Count of gaps | `slice(0, 3)` in scoring + emails |
| UI disclaimer | `ResultPanel.tsx`, email templates |

---

*Internal documentation for developers and operators. Not shown to assessment takers.*
