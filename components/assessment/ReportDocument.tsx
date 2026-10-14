import { Document, Image, Link, Page, Text, View } from "@react-pdf/renderer";
import {
  INDICATIVE_ASSUMPTIONS,
  MATURITY_BANDS,
  moduleCopy,
  type AssessmentDetails,
  type MaturityBand,
} from "@/lib/assessment-data";
import type { AssessmentResult } from "@/lib/assessment-scoring";
import { siteConfig } from "@/lib/site-config";
import { BarChartH } from "./report/BarChartH";
import { BeforeAfter } from "./report/BeforeAfter";
import { FigureBlock } from "./report/FigureBlock";
import { FlowDiagram } from "./report/FlowDiagram";
import { GaugeDial } from "./report/GaugeDial";
import { Heatmap } from "./report/Heatmap";
import { PriorityMatrix } from "./report/PriorityMatrix";
import { RadarChart } from "./report/RadarChart";
import { H2, P, ReportPage, TocRow } from "./report/ReportChrome";
import { BAND_FILL, answerStatus, bandStatus, clipText, reportTheme } from "./report/report-theme";
import { StatTile } from "./report/StatTile";
import { Timeline } from "./report/Timeline";

function shortCat(name: string) {
  const map: Record<string, string> = {
    "Recruitment & Hiring": "Hiring",
    Onboarding: "Onboarding",
    "Attendance & Leave": "Attendance",
    "Payroll, Compliance & HR Data": "Payroll / data",
  };
  return map[name] ?? name;
}

function riskLine(band: MaturityBand): string {
  if (band === "Critical") {
    return "Indicative: leaving this as-is keeps high rework and weak evidence for the monthly cycle.";
  }
  if (band === "Reactive") {
    return "Indicative: issues are handled after they appear, so time and error risk stay in the process.";
  }
  if (band === "Developing") {
    return "Indicative: some tools exist, but hand-offs still depend on people remembering the next step.";
  }
  return "Keep it up: the next-level move is tighter reporting and fewer exceptions, not a greenfield rebuild.";
}

function todayFlow(category: string): string[] {
  if (category.startsWith("Recruitment")) return ["Inbox / WhatsApp", "Ad-hoc interviews", "Scattered notes"];
  if (category === "Onboarding") return ["Paper / email", "IT chase-up", "Incomplete record"];
  if (category.startsWith("Attendance")) return ["Register / sheet", "Manager approval", "Payroll true-up"];
  return ["Manual inputs", "Filing reminders", "Leadership extract"];
}

function automatedFlow(modules: string[]): string[] {
  const names = modules.length ? modules : ["Employee Management"];
  if (names.length === 1) return [names[0], "Approvals in-record", "Payroll / reports"];
  return [...names.slice(0, 2), "Payroll / reports"];
}

function Chip({ band }: { band: MaturityBand }) {
  return (
    <Text
      style={{
        backgroundColor: BAND_FILL[band],
        color: reportTheme.white,
        fontSize: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
      }}
    >
      {bandStatus(band)} · {band}
    </Text>
  );
}

function Cell({
  width,
  children,
  color = reportTheme.navy,
  bold,
}: {
  width: `${number}%`;
  children: string | number;
  color?: string;
  bold?: boolean;
}) {
  return (
    <View style={{ width, paddingRight: 4 }}>
      <Text style={{ fontSize: 8, color, fontWeight: bold ? 700 : 400 }}>{children}</Text>
    </View>
  );
}

function McqTable({ rows }: { rows: AssessmentResult["mcqRows"] }) {
  return (
    <View wrap={false}>
      <View style={{ flexDirection: "row", backgroundColor: reportTheme.navy, padding: 4 }}>
        <Cell width="44%" color="#fff" bold>
          Question
        </Cell>
        <Cell width="30%" color="#fff" bold>
          Your answer
        </Cell>
        <Cell width="10%" color="#fff" bold>
          Score
        </Cell>
        <Cell width="16%" color="#fff" bold>
          Status
        </Cell>
      </View>
      {rows.map((r) => (
        <View
          key={r.questionId}
          wrap={false}
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: reportTheme.line,
            paddingVertical: 3,
          }}
        >
          <Cell width="44%">{clipText(r.prompt, 110)}</Cell>
          <Cell width="30%">{clipText(r.answerLabel, 70)}</Cell>
          <Cell width="10%">{r.score}</Cell>
          <Cell width="16%">{answerStatus(r.score)}</Cell>
        </View>
      ))}
    </View>
  );
}

export function ReportDocument({
  details,
  result,
  logoSrc,
  coverLogoSrc,
  generatedAt = new Date(),
}: {
  details: AssessmentDetails;
  result: AssessmentResult;
  logoSrc: string;
  coverLogoSrc?: string;
  generatedAt?: Date;
}) {
  const company = clipText(details.company || "Your organisation", 60);
  const dateLabel = generatedAt.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const ranked = [...result.categories].sort((a, b) => a.percent - b.percent);
  const weakest = ranked[0];
  const strongest = ranked[ranked.length - 1];
  const criticalCount = result.categories.filter((c) => c.band === "Critical").length;
  const allStrong = result.categories.every((c) => c.percent >= 80);
  const top3 = result.gaps.slice(0, 3);
  const contactUrl = `${siteConfig.url}/contact`;

  const verdict = allStrong
    ? `${company} scores ${result.overall}/100 (${result.overallBand} / ${bandStatus(result.overallBand)}). Categories are in the Optimized band. This briefing records strengths and next-level optimizations rather than a turnaround plan. Figures remain indicative.`
    : `${company} scores ${result.overall}/100 (${result.overallBand} / ${bandStatus(result.overallBand)}). The weakest area is ${weakest.category} at ${weakest.percent}. Priority work should start there, then ${ranked[1]?.category ?? "adjacent processes"}. All figures are indicative and based on self-reported answers.`;

  const heatRows = result.categories.map((c) => ({
    category: c.category,
    cells: result.mcqRows
      .filter((r) => r.category === c.category)
      .map((r) => ({ label: r.questionId, score: r.score })),
  }));

  const matrixPoints = result.gaps.map((g) => ({
    label: shortCat(g.category),
    impact: Math.max(g.indicativeHoursPerMonth, allStrong ? 4 : g.indicativeHoursPerMonth),
    effort: Math.max(1, 100 - g.percent),
  }));

  const sortedBars = [...result.categories]
    .sort((a, b) => a.percent - b.percent)
    .map((c) => ({ label: shortCat(c.category), percent: c.percent, band: c.band }));

  const radarItems = result.categories.map((c) => ({
    label: shortCat(c.category),
    percent: c.percent,
  }));

  const deepIds = ["deep1", "deep2", "deep3", "deep4"] as const;

  return (
    <Document title={`HR Health Assessment — ${company}`}>
      <Page size="A4" style={{ backgroundColor: reportTheme.navy, padding: 36, fontFamily: reportTheme.font.sans }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          src={coverLogoSrc ?? logoSrc}
          style={{
            height: 56,
            width: 140,
            objectFit: "contain",
            objectPosition: "left center",
            marginLeft: -10,
          }}
        />
        <Text style={{ color: reportTheme.gold, marginTop: 28, fontSize: 11, letterSpacing: 1.2 }}>
          CONFIDENTIAL · INDICATIVE
        </Text>
        <Text
          style={{
            fontFamily: reportTheme.font.serif,
            fontSize: 28,
            color: reportTheme.white,
            marginTop: 10,
            lineHeight: 1.2,
          }}
        >
          HR Health Assessment Report
        </Text>
        <Text style={{ color: reportTheme.cream, fontSize: 14, marginTop: 14 }}>{company}</Text>
        <Text style={{ color: "#CBD5E1", fontSize: 10, marginTop: 8, lineHeight: 1.45 }}>
          Industry: {clipText(details.industry || "Not specified", 48)}
          {"\n"}Size: {details.companySize || "Not specified"} · HR headcount: {details.hrHeadcount || "—"} · HRMS
          today: {details.hrmsToday || "—"}
          {"\n"}Prepared for {clipText(details.name || details.email || "Recipient", 50)} · {dateLabel}
        </Text>
        <View style={{ marginTop: 28, backgroundColor: reportTheme.white, padding: 16, borderRadius: 6 }}>
          <Text style={{ fontSize: 9, color: reportTheme.muted }}>Overall score (0–100, indicative)</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
            <GaugeDial score={result.overall} band={result.overallBand} width={240} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Chip band={result.overallBand} />
              <Text style={{ marginTop: 8, fontSize: 9.5, lineHeight: 1.4 }}>
                Maturity band {result.overallBand} ({MATURITY_BANDS.find((b) => b.band === result.overallBand)?.min}–
                {MATURITY_BANDS.find((b) => b.band === result.overallBand)?.max}). Weakest: {weakest.category} (
                {weakest.percent}). Strongest: {strongest.category} ({strongest.percent}).
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ color: "#94A3B8", fontSize: 8, marginTop: 24 }}>
          {siteConfig.name} · Indicative analysis based on self-reported answers · Page 1 of the report
        </Text>
      </Page>

      <ReportPage logoSrc={logoSrc} company={company}>
        <H2>How to read this report</H2>
        <P>
          Category scores are the sum of multiple-choice points divided by the maximum (3 × number of scored questions),
          as a percentage. Overall score is the equal-weighted average of category scores. Text answers are not scored.
          Answers are self-reported and are not a legal, tax, or statutory audit.
        </P>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}>
          {MATURITY_BANDS.map((b) => (
            <View
              key={b.band}
              style={{
                width: "48%",
                marginRight: "2%",
                marginBottom: 6,
                borderWidth: 1,
                borderColor: reportTheme.line,
                padding: 6,
              }}
            >
              <Text style={{ fontSize: 8, fontWeight: 700, color: BAND_FILL[b.band] }}>
                {bandStatus(b.band)} · {b.band} · {b.min}–{b.max}
              </Text>
              <Text style={{ fontSize: 8, marginTop: 2 }}>
                {b.band === "Critical"
                  ? "Process is mostly manual or missing."
                  : b.band === "Reactive"
                    ? "Work happens after problems appear."
                    : b.band === "Developing"
                      ? "Tools exist but are not joined up."
                      : "Integrated process with a usable trail."}
              </Text>
            </View>
          ))}
        </View>
        <H2>Contents</H2>
        <TocRow href="#exec" label="3  Executive summary" page={3} />
        <TocRow href="#overall" label="4  Overall performance" page={4} />
        <TocRow href="#deep1" label="5  Deep-dive — Hiring and Onboarding" page={5} />
        <TocRow href="#deep3" label="6  Deep-dive — Attendance and Payroll" page={6} />
        <TocRow href="#gaps" label="7  Gap analysis" page={7} />
        <TocRow href="#impact" label="8  Indicative impact" page={8} />
        <TocRow href="#solve" label="9  How Cerity People HRMS solves this" page={9} />
        <TocRow href="#roadmap" label="10  Roadmap and next step" page={10} />
        <TocRow href="#appendix" label="11  Appendix" page={11} />
        <View
          style={{
            marginTop: 8,
            backgroundColor: reportTheme.cream,
            borderWidth: 1,
            borderColor: reportTheme.gold,
            padding: 8,
          }}
        >
          <Text style={{ fontSize: 9, fontWeight: 700 }}>Methodology note</Text>
          <Text style={{ fontSize: 8.5, marginTop: 4, lineHeight: 1.4 }}>
            Four live categories, each 25% of the overall score. Hours-lost estimate uses workforce mid-point of the
            selected size band × (1 − category score / 100) × 0.35 hours per person per month, summed across priority-gap
            categories. Compliance band uses Payroll, Compliance & HR Data only. Print this report at 100% on A4.
          </Text>
        </View>
        <Text style={{ fontSize: 9, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>What a question score means</Text>
        <View wrap={false}>
          <View style={{ flexDirection: "row", backgroundColor: reportTheme.navy, padding: 4 }}>
            <Cell width="14%" color="#fff" bold>
              Points
            </Cell>
            <Cell width="22%" color="#fff" bold>
              Status
            </Cell>
            <Cell width="64%" color="#fff" bold>
              How to read it
            </Cell>
          </View>
          {(
            [
              ["0", "Critical", "The process is missing, paper-only, or lives in personal inboxes."],
              ["1–2", "Needs attention", "Work happens, but after the fact, with spreadsheets or chat."],
              ["3", "Strong", "A joined-up tool with a trail someone else can follow."],
            ] as const
          ).map(([pts, status, how]) => (
            <View
              key={pts}
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                borderBottomWidth: 1,
                borderBottomColor: reportTheme.line,
              }}
            >
              <Cell width="14%">{pts}</Cell>
              <Cell width="22%">{status}</Cell>
              <Cell width="64%">{how}</Cell>
            </View>
          ))}
        </View>
        <P>
          Worked example for this report: overall {result.overall} is the mean of four category percentages (
          {result.categories.map((c) => `${shortCat(c.category)} ${c.percent}`).join("; ")}). Text answers are quoted
          later and never change that number.
        </P>
      </ReportPage>

      <ReportPage logoSrc={logoSrc} company={company}>
        <View id="exec" />
        <H2>Executive summary</H2>
        <P>{verdict}</P>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          <StatTile label="Overall score" value={`${result.overall} / 100`} hint="Indicative" />
          <StatTile label="Maturity band" value={`${bandStatus(result.overallBand)}`} hint={result.overallBand} />
          <StatTile label="Weakest category" value={clipText(shortCat(weakest.category), 22)} hint={`${weakest.percent}`} />
          <StatTile label="Strongest category" value={clipText(shortCat(strongest.category), 22)} hint={`${strongest.percent}`} />
          <StatTile label="Critical categories" value={String(criticalCount)} hint="Score below 40" />
          <StatTile
            label="Hours / month"
            value={String(result.indicativeHoursPerMonth)}
            hint="Indicative, priority gaps"
          />
        </View>
        <H2>{allStrong ? "Top 3 strengths to protect" : "Top 3 priority gaps"}</H2>
        {top3.map((g, i) => (
          <View
            key={g.category}
            wrap={false}
            style={{
              borderWidth: 1,
              borderColor: reportTheme.line,
              padding: 8,
              marginBottom: 6,
              backgroundColor: reportTheme.softWhite,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: 700 }}>
              {i + 1}. {g.category} · {g.percent}% · {bandStatus(g.band)}
            </Text>
            <Text style={{ fontSize: 8.5, marginTop: 3, lineHeight: 1.35 }}>
              {allStrong
                ? `Keep it up: ${g.category} is Optimized at ${g.percent}. Next-level: keep a live report so this trail stays visible to leaders.`
                : g.insights[0]}
            </Text>
          </View>
        ))}
        <P>
          Indicative compliance risk: {result.complianceLevel}. Workforce mid-point used: {result.headcountMidpoint}{" "}
          people. HRMS today: {details.hrmsToday || "Not specified"}.
        </P>
        <Text style={{ fontSize: 9, fontWeight: 700, marginBottom: 4 }}>Category snapshot</Text>
        <View wrap={false}>
          <View style={{ flexDirection: "row", backgroundColor: reportTheme.navy, padding: 4 }}>
            <Cell width="40%" color="#fff" bold>
              Category (25% of overall)
            </Cell>
            <Cell width="16%" color="#fff" bold>
              Score
            </Cell>
            <Cell width="22%" color="#fff" bold>
              Band
            </Cell>
            <Cell width="22%" color="#fff" bold>
              Status
            </Cell>
          </View>
          {result.categories.map((c) => (
            <View
              key={c.category}
              wrap={false}
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                borderBottomWidth: 1,
                borderBottomColor: reportTheme.line,
              }}
            >
              <Cell width="40%">{c.category}</Cell>
              <Cell width="16%">{c.percent}</Cell>
              <Cell width="22%">{c.band}</Cell>
              <Cell width="22%">{bandStatus(c.band)}</Cell>
            </View>
          ))}
        </View>
        <P>
          {allStrong
            ? "This week: keep the trail current and add a leadership extract so Optimized scores stay visible."
            : `This week: pick one owner for ${weakest.category}, freeze a single tracker, and bring that file to the consultation.`}
        </P>
      </ReportPage>

      <ReportPage logoSrc={logoSrc} company={company}>
        <View id="overall" />
        <H2>Overall performance</H2>
        <FigureBlock
          title="Figure 1: Radar of live assessment categories (scale 0–100)"
          howToRead="Each axis is one category. The filled shape is your score. A small shape near the centre is Critical; a shape near the outer ring is Optimized. Ring labels are 25 / 50 / 75 / 100."
        >
          <RadarChart items={radarItems} />
        </FigureBlock>
        <FigureBlock
          title="Figure 2: Category scores, lowest to highest (score 0–100)"
          howToRead="Bar length is the category percentage. Colour and the status word show the band. The dashed line is the Developing threshold (60). Sort is weakest at the top."
        >
          <BarChartH items={sortedBars} />
        </FigureBlock>
        <P>
          Interpretation: {weakest.category} is the lowest at {weakest.percent} ({bandStatus(weakest.band)}).{" "}
          {strongest.category} is the highest at {strongest.percent} ({bandStatus(strongest.band)}).{" "}
          {allStrong
            ? "All categories sit in Optimized. Use the roadmap for next-level reporting rather than remedial rebuilds."
            : "Close the lowest bar first; it drags overall score and indicative hours."}{" "}
          Equal weights mean a 20-point lift in any one category moves overall by 5 points.
        </P>
        <View wrap={false}>
          <View style={{ flexDirection: "row", backgroundColor: reportTheme.navy, padding: 4 }}>
            <Cell width="46%" color="#fff" bold>
              Category
            </Cell>
            <Cell width="18%" color="#fff" bold>
              Score / 100
            </Cell>
            <Cell width="18%" color="#fff" bold>
              vs Developing 60
            </Cell>
            <Cell width="18%" color="#fff" bold>
              Status
            </Cell>
          </View>
          {ranked.map((c) => (
            <View
              key={c.category}
              wrap={false}
              style={{
                flexDirection: "row",
                paddingVertical: 4,
                borderBottomWidth: 1,
                borderBottomColor: reportTheme.line,
              }}
            >
              <Cell width="46%">{c.category}</Cell>
              <Cell width="18%">{c.percent}</Cell>
              <Cell width="18%">{c.percent - 60 >= 0 ? `+${c.percent - 60}` : String(c.percent - 60)}</Cell>
              <Cell width="18%">{bandStatus(c.band)}</Cell>
            </View>
          ))}
        </View>
      </ReportPage>

      {[
        [0, 1] as const,
        [2, 3] as const,
      ].map((pair) => (
        <ReportPage key={pair.join("-")} logoSrc={logoSrc} company={company}>
          <View id={deepIds[pair[0]]} />
          <H2>Category deep-dives</H2>
          {pair.map((ci) => {
            const c = result.categories[ci];
            if (!c) return null;
            const rows = result.mcqRows.filter((r) => r.category === c.category);
            const quote = result.quotedText.find((q) => q.category === c.category)?.answer ?? "";
            const insightB = rows[1]?.gapInsight;
            return (
              <View key={c.category} wrap={false} style={{ marginBottom: 6 }}>
                {ci === pair[1] ? <View id={deepIds[ci]} /> : null}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Text style={{ fontFamily: reportTheme.font.serif, fontSize: 11, maxWidth: 340 }}>{c.category}</Text>
                  <Chip band={c.band} />
                </View>
                <Text style={{ fontSize: 7.5, color: reportTheme.muted, marginVertical: 2 }}>
                  Score {c.percent} / 100 · {c.rawSum} of {c.mcqCount * 3} points · {bandStatus(c.band)}
                </Text>
                <FigureBlock
                  compact
                  title={`Figure ${3 + ci}: ${shortCat(c.category)} vs band thresholds (0–100)`}
                  howToRead="Bar = category %. Dashed line = Developing (60). Status word is for grayscale."
                >
                  <BarChartH
                    compact
                    items={[{ label: shortCat(c.category), percent: c.percent, band: c.band }]}
                    axisLabel="Category score (0–100)"
                  />
                </FigureBlock>
                <McqTable rows={rows} />
                <View
                  style={{
                    marginTop: 4,
                    borderLeftWidth: 3,
                    borderLeftColor: reportTheme.gold,
                    backgroundColor: reportTheme.cream,
                    padding: 5,
                  }}
                >
                  <Text style={{ fontSize: 7.5, fontWeight: 700 }}>Your own words</Text>
                  <Text
                    style={{
                      fontSize: 8,
                      marginTop: 2,
                      lineHeight: 1.3,
                      fontFamily: [reportTheme.font.sans, reportTheme.font.fallback],
                    }}
                  >
                    “{clipText(quote, 180)}”
                  </Text>
                </View>
                <View style={{ marginTop: 4, padding: 5, backgroundColor: reportTheme.softWhite }}>
                  <Text style={{ fontSize: 8, fontWeight: 700 }}>What this tells us</Text>
                  <Text style={{ fontSize: 8, marginTop: 2, lineHeight: 1.3 }}>
                    {rows[0]?.gapInsight ?? "No scored answers in this category."}
                    {insightB && insightB !== rows[0]?.gapInsight ? ` ${insightB}` : ""} {riskLine(c.band)} Mapped
                    module: {moduleCopy(rows[0]?.solvedBy ?? "Employee Management").title}.
                  </Text>
                </View>
              </View>
            );
          })}
        </ReportPage>
      ))}

      <ReportPage logoSrc={logoSrc} company={company}>
        <View id="gaps" />
        <H2>Gap analysis</H2>
        <FigureBlock
          title="Figure 7: Heatmap of scored questions (category × MCQ)"
          howToRead="Each cell is one scored question. 0 is Critical (red), 1–2 Needs attention (amber/blue), 3 is Strong (green). Read across a row to see whether both questions in a category are weak."
        >
          <Heatmap rows={heatRows} />
        </FigureBlock>
        <FigureBlock
          title="Figure 8: Priority matrix (indicative impact vs remaining gap)"
          howToRead="Vertical axis is indicative hours/month for that gap. Horizontal axis is remaining gap points (100 − score). Top-left is higher impact with less remaining work; top-right is a larger programme."
        >
          <PriorityMatrix points={matrixPoints} />
        </FigureBlock>
        <View wrap={false}>
          <Text minPresenceAhead={40} style={{ fontSize: 9, fontWeight: 700, marginBottom: 4 }}>
            Ranked priority gaps
          </Text>
          <View style={{ flexDirection: "row", backgroundColor: reportTheme.navy, padding: 4 }}>
            <Text style={{ width: "8%", color: "#fff", fontSize: 7 }}>#</Text>
            <Text style={{ width: "34%", color: "#fff", fontSize: 7 }}>Area</Text>
            <Text style={{ width: "22%", color: "#fff", fontSize: 7 }}>Severity</Text>
            <Text style={{ width: "36%", color: "#fff", fontSize: 7 }}>Indicative hours/mo</Text>
          </View>
          {result.gaps.map((g, i) => (
            <View key={g.category} style={{ flexDirection: "row", paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: reportTheme.line }}>
              <Text style={{ width: "8%", fontSize: 8 }}>{i + 1}</Text>
              <Text style={{ width: "34%", fontSize: 8 }}>{g.category}</Text>
              <Text style={{ width: "22%", fontSize: 8 }}>{bandStatus(g.band)}</Text>
              <Text style={{ width: "36%", fontSize: 8 }}>{g.indicativeHoursPerMonth}</Text>
            </View>
          ))}
        </View>
      </ReportPage>

      <ReportPage logoSrc={logoSrc} company={company}>
        <View id="impact" />
        <H2>Indicative impact</H2>
        <P>
          These figures are labelled Indicative. They are not a time-and-motion study. They use the published formula
          from this report’s methodology, applied to your scores and size band.
        </P>
        <FigureBlock
          title="Figure 9: Indicative hours/month by priority gap"
          howToRead="Bar length is scaled to the largest gap in this report. The label shows indicative hours/month and the status word so the chart remains readable in grayscale."
        >
          <BarChartH
            items={(() => {
              const maxH = Math.max(1, ...result.gaps.map((g) => g.indicativeHoursPerMonth));
              return result.gaps.map((g) => ({
                label: shortCat(g.category),
                percent: (g.indicativeHoursPerMonth / maxH) * 100,
                band: g.band,
                valueLabel: `${g.indicativeHoursPerMonth} h · ${bandStatus(g.band)}`,
              }));
            })()}
            threshold={0}
            axisLabel="Relative indicative hours (largest gap = 100 on this scale)"
          />
        </FigureBlock>
        <View
          wrap={false}
          style={{
            borderWidth: 1,
            borderColor: reportTheme.gold,
            backgroundColor: reportTheme.cream,
            padding: 8,
            marginTop: 6,
          }}
        >
          <Text style={{ fontSize: 9, fontWeight: 700 }}>Formulas and assumptions</Text>
          {INDICATIVE_ASSUMPTIONS.map((line) => (
            <Text key={line} style={{ fontSize: 8, marginTop: 3, lineHeight: 1.35 }}>
              • {line}
            </Text>
          ))}
          <Text style={{ fontSize: 8, marginTop: 4 }}>
            Worked example for this report: mid-point {result.headcountMidpoint} × (1 − category%/100) × 0.35, then
            summed across {result.gaps.length} priority-gap categories = {result.indicativeHoursPerMonth} hours/month
            (indicative). Compliance level = {result.complianceLevel}.
          </Text>
        </View>
        <Text style={{ fontSize: 9, fontWeight: 700, marginTop: 6, marginBottom: 4 }}>
          Worked hours by gap (indicative)
        </Text>
        <View wrap={false}>
          <View style={{ flexDirection: "row", backgroundColor: reportTheme.navy, padding: 4 }}>
            <Cell width="28%" color="#fff" bold>
              Area
            </Cell>
            <Cell width="14%" color="#fff" bold>
              Score
            </Cell>
            <Cell width="18%" color="#fff" bold>
              1 − score/100
            </Cell>
            <Cell width="18%" color="#fff" bold>
              Mid-point
            </Cell>
            <Cell width="22%" color="#fff" bold>
              Hours / mo
            </Cell>
          </View>
          {result.gaps.map((g) => {
            const factor = Math.round((1 - g.percent / 100) * 100) / 100;
            return (
              <View
                key={g.category}
                wrap={false}
                style={{
                  flexDirection: "row",
                  paddingVertical: 4,
                  borderBottomWidth: 1,
                  borderBottomColor: reportTheme.line,
                }}
              >
                <Cell width="28%">{shortCat(g.category)}</Cell>
                <Cell width="14%">{g.percent}</Cell>
                <Cell width="18%">{factor}</Cell>
                <Cell width="18%">{result.headcountMidpoint}</Cell>
                <Cell width="22%">{g.indicativeHoursPerMonth}</Cell>
              </View>
            );
          })}
        </View>
        <P>
          {allStrong
            ? "Hours are 0 because every live category is Optimized. Treat this page as a keep-it-up record: next-level work is reporting cadence, not a rebuild. Indicative compliance risk remains Low."
            : `Error-prone processes to watch: ${ranked
                .slice(0, 3)
                .map((c) => c.category)
                .join("; ")}. Indicative compliance risk: ${result.complianceLevel}.`}
        </P>
      </ReportPage>

      <ReportPage logoSrc={logoSrc} company={company}>
        <View id="solve" />
        <H2>How Cerity People HRMS solves this</H2>
        <View wrap={false}>
          <View style={{ flexDirection: "row", backgroundColor: reportTheme.navy, padding: 4 }}>
            <Text style={{ width: "22%", color: "#fff", fontSize: 7 }}>Gap</Text>
            <Text style={{ width: "26%", color: "#fff", fontSize: 7 }}>What you told us</Text>
            <Text style={{ width: "22%", color: "#fff", fontSize: 7 }}>Module</Text>
            <Text style={{ width: "30%", color: "#fff", fontSize: 7 }}>What changes</Text>
          </View>
          {result.gaps.map((g) => {
            const title = g.solvedBy[0] ?? "Employee Management";
            const mod = moduleCopy(title);
            return (
              <View
                key={g.category}
                style={{ flexDirection: "row", paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: reportTheme.line }}
              >
                <Text style={{ width: "22%", fontSize: 7.5 }}>{clipText(g.category, 40)}</Text>
                <Text style={{ width: "26%", fontSize: 7.5 }}>{clipText(g.insights[0] ?? "", 70)}</Text>
                <Text style={{ width: "22%", fontSize: 7.5 }}>{mod.title}</Text>
                <Text style={{ width: "30%", fontSize: 7.5 }}>{clipText(mod.description, 80)}</Text>
              </View>
            );
          })}
        </View>
        <Text style={{ fontSize: 9, fontWeight: 700, marginTop: 8, marginBottom: 4 }}>
          Before vs after — top 3
        </Text>
        {top3.map((g) => {
          const mod = moduleCopy(g.solvedBy[0] ?? "Employee Management");
          return (
            <BeforeAfter
              key={g.category}
              title={g.category}
              today={g.insights[0] ?? "Manual process"}
              withCerity={mod.description}
            />
          );
        })}
        <FigureBlock
          title="Figure 10: Process flow — today vs joined-up modules"
          howToRead="Boxes read left to right. The first row is the current hand-off pattern for the weakest category. The second uses only modules listed in the product catalogue."
        >
          <FlowDiagram title={`Today · ${shortCat(weakest.category)}`} steps={todayFlow(weakest.category)} />
          <FlowDiagram
            title="With Cerity People"
            steps={automatedFlow(result.gaps.find((g) => g.category === weakest.category)?.solvedBy ?? [])}
          />
        </FigureBlock>
      </ReportPage>

      <ReportPage logoSrc={logoSrc} company={company}>
        <View id="roadmap" />
        <H2>Recommended roadmap</H2>
        <P>
          Sequence follows your priority gaps. This is a discussion timeline, not a case study or a guaranteed go-live
          date.
        </P>
        <FigureBlock
          title="Figure 11: 30 / 60 / 90 day timeline"
          howToRead="Milestones run left to right. Day 30 stabilises data for the weakest category; day 60 stands up the mapped module; day 90 adds reporting. Adjust with your team in the consultation."
        >
          <Timeline
            milestones={[
              {
                day: "Day 30",
                title: shortCat(weakest.category),
                detail: "Single source of truth for inputs in the weakest category.",
              },
              {
                day: "Day 60",
                title: clipText(moduleCopy(top3[1]?.solvedBy[0] ?? top3[0]?.solvedBy[0] ?? "Onboarding").title, 18),
                detail: "Stand up the mapped module so work leaves inboxes.",
              },
              {
                day: "Day 90",
                title: "HR Analytics",
                detail: "Leaders see headcount without waiting on extracts.",
              },
            ]}
          />
        </FigureBlock>
        <P>
          Day 30: freeze owners and inputs for {weakest.category}. Day 60: turn on{" "}
          {moduleCopy(top3[0]?.solvedBy[0] ?? "Employee Management").title}. Day 90: HR Analytics so leaders do not wait
          on extracts. This timeline is a discussion sequence, not a guaranteed go-live.
        </P>
        <View id="next" />
        <H2>Next step / Book an appointment</H2>
        <View
          wrap={false}
          style={{
            backgroundColor: reportTheme.navy,
            padding: 10,
            marginBottom: 8,
          }}
        >
          <Text style={{ color: reportTheme.white, fontFamily: reportTheme.font.serif, fontSize: 14 }}>
            Book a working session
          </Text>
          <Link src={contactUrl} style={{ color: reportTheme.gold, fontSize: 10, marginTop: 6 }}>
            {contactUrl.replace(/^https?:\/\//, "")}
          </Link>
          <Text style={{ color: reportTheme.cream, fontSize: 9, marginTop: 4 }}>
            {siteConfig.contact.email} · {siteConfig.contact.phone}
          </Text>
        </View>
        <Text style={{ fontSize: 9, fontWeight: 700, marginBottom: 4 }}>What happens in the consultation</Text>
        {[
          "We replay your scorecard and confirm which gaps are operational versus policy.",
          "We map those gaps to live Cerity People modules from the catalogue — not a custom invention.",
          "You leave with a 30 / 60 / 90 discussion sequence. Fees are scoped afterwards, never in this PDF.",
        ].map((step, i) => (
          <View
            key={step}
            wrap={false}
            style={{
              flexDirection: "row",
              marginBottom: 5,
              borderWidth: 1,
              borderColor: reportTheme.line,
              padding: 6,
            }}
          >
            <Text style={{ width: 16, fontFamily: reportTheme.font.serif, fontSize: 13, color: reportTheme.blue }}>
              {i + 1}
            </Text>
            <Text style={{ flex: 1, fontSize: 9, lineHeight: 1.35 }}>{step}</Text>
          </View>
        ))}
      </ReportPage>

      <ReportPage logoSrc={logoSrc} company={company}>
        <View id="appendix" />
        <H2>Appendix: full answers, method, disclaimer</H2>
        <View wrap={false}>
          <View style={{ flexDirection: "row", backgroundColor: reportTheme.navy, padding: 4 }}>
            <Cell width="20%" color="#fff" bold>
              Category
            </Cell>
            <Cell width="36%" color="#fff" bold>
              Question
            </Cell>
            <Cell width="26%" color="#fff" bold>
              Answer
            </Cell>
            <Cell width="8%" color="#fff" bold>
              Score
            </Cell>
            <Cell width="10%" color="#fff" bold>
              Status
            </Cell>
          </View>
        </View>
        {result.mcqRows.map((r) => (
          <View
            key={r.questionId}
            wrap={false}
            style={{ flexDirection: "row", paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: reportTheme.line }}
          >
            <Cell width="20%">{shortCat(r.category)}</Cell>
            <Cell width="36%">{clipText(r.prompt, 80)}</Cell>
            <Cell width="26%">{clipText(r.answerLabel, 60)}</Cell>
            <Cell width="8%">{r.score}</Cell>
            <Cell width="10%">{answerStatus(r.score)}</Cell>
          </View>
        ))}
        <Text style={{ fontSize: 8.5, fontWeight: 700, marginTop: 8 }}>Text answers</Text>
        {result.categories.map((c) => {
          const q = result.quotedText.find((x) => x.category === c.category);
          return (
            <Text key={c.category} style={{ fontSize: 8, marginTop: 3, lineHeight: 1.35 }}>
              {c.category}: “{clipText(q?.answer ?? "", 200)}”
            </Text>
          );
        })}
        <View
          wrap={false}
          style={{ marginTop: 8, padding: 8, backgroundColor: reportTheme.cream, borderWidth: 1, borderColor: reportTheme.gold }}
        >
          <Text style={{ fontSize: 8.5, fontWeight: 700 }}>Scoring bands</Text>
          {MATURITY_BANDS.map((b) => (
            <Text key={b.band} style={{ fontSize: 8, marginTop: 2 }}>
              {b.band} / {bandStatus(b.band)}: {b.min}–{b.max}
            </Text>
          ))}
          <Text style={{ fontSize: 8, marginTop: 6, lineHeight: 1.35 }}>
            Disclaimer: {INDICATIVE_ASSUMPTIONS.join(" ")}
          </Text>
        </View>
      </ReportPage>
    </Document>
  );
}
