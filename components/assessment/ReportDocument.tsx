import {
  Circle,
  Document,
  Font,
  Image,
  Link,
  Page,
  Path,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  BAND_COLORS,
  INDICATIVE_ASSUMPTIONS,
  moduleCopy,
  type AssessmentDetails,
  type MaturityBand,
} from "@/lib/assessment-data";
import type { AssessmentResult } from "@/lib/assessment-scoring";
import { siteConfig } from "@/lib/site-config";

Font.register({
  family: "DM Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@5.2.5/latin-400-normal.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@5.2.5/latin-600-normal.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@5.2.5/latin-700-normal.ttf",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "DM Serif Display",
  src: "https://cdn.jsdelivr.net/fontsource/fonts/dm-serif-display@5.2.5/latin-400-normal.ttf",
});

const NAVY = "#102840";
const BLUE = "#1677E8";
const GOLD = "#F59E0B";
const CREAM = "#FFFBEB";

const styles = StyleSheet.create({
  page: {
    fontFamily: "DM Sans",
    fontSize: 9,
    color: NAVY,
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 40,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 6,
  },
  footerText: {
    fontSize: 7,
    color: "#64748B",
    lineHeight: 1.35,
  },
  h1: { fontFamily: "DM Serif Display", fontSize: 26, color: NAVY },
  h2: { fontFamily: "DM Serif Display", fontSize: 16, color: NAVY, marginBottom: 8 },
  muted: { color: "#64748B", fontSize: 9 },
  card: {
    borderWidth: 1,
    borderColor: "#FDE68A",
    backgroundColor: CREAM,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  row: { flexDirection: "row", gap: 8 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: NAVY,
    color: "#FFFFFF",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
});

function scoreFill(score: 0 | 1 | 2 | 3) {
  if (score === 0) return "#FECACA";
  if (score === 3) return "#BBF7D0";
  return "#FDE68A";
}

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>
        Indicative analysis based on self-reported answers. Not a legal, tax, or statutory audit.
      </Text>
      <Text style={styles.footerText}>{INDICATIVE_ASSUMPTIONS.join(" ")}</Text>
      <Text
        style={[styles.footerText, { marginTop: 3, textAlign: "right" }]}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </View>
  );
}

function HeaderBar({ logoSrc }: { logoSrc: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }      }
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image src={logoSrc} style={{ height: 22, width: 110 }} />
      <Text style={{ fontSize: 8, color: GOLD }}>HR Maturity Assessment</Text>
    </View>
  );
}

function GaugeSvg({ overall, band }: { overall: number; band: MaturityBand }) {
  const color = BAND_COLORS[band];
  const r = 70;
  const cx = 90;
  const cy = 88;
  const start = Math.PI;
  const end = 0;
  const angle = start + (overall / 100) * (end - start);
  const sx = cx + r * Math.cos(start);
  const sy = cy + r * Math.sin(start);
  const ex = cx + r * Math.cos(angle);
  const ey = cy + r * Math.sin(angle);
  const large = overall > 50 ? 1 : 0;
  return (
    <Svg width={180} height={110}>
      <Path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke="#E2E8F0"
        strokeWidth={12}
        fill="none"
      />
      {overall > 0 ? (
        <Path
          d={`M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`}
          stroke={color}
          strokeWidth={12}
          fill="none"
        />
      ) : null}
      <Circle cx={cx} cy={cy} r={4} fill={color} />
    </Svg>
  );
}

function RadarSvg({ values }: { values: number[] }) {
  const cx = 140;
  const cy = 130;
  const r = 95;
  const n = values.length;
  const pt = (i: number, mag: number) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return [cx + mag * Math.cos(a), cy + mag * Math.sin(a)] as const;
  };
  const rings = [0.25, 0.5, 0.75, 1];
  const poly = values
    .map((v, i) => {
      const [x, y] = pt(i, (v / 100) * r);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <Svg width={280} height={260}>
      {rings.map((ring) => {
        const d = Array.from({ length: n }, (_, i) => {
          const [x, y] = pt(i, r * ring);
          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        }).join(" ");
        return <Path key={ring} d={`${d} Z`} stroke="#CBD5E1" strokeWidth={0.6} fill="none" />;
      })}
      {values.map((_, i) => {
        const [x, y] = pt(i, r);
        return <Path key={i} d={`M ${cx} ${cy} L ${x} ${y}`} stroke="#E2E8F0" strokeWidth={0.6} />;
      })}
      <Path
        d={`${poly
          .split(" ")
          .map((p, i) => `${i === 0 ? "M" : "L"} ${p}`)
          .join(" ")} Z`}
        fill={BLUE}
        fillOpacity={0.28}
        stroke={BLUE}
        strokeWidth={1.2}
      />
    </Svg>
  );
}

function BarSvg({
  items,
}: {
  items: { label: string; percent: number; band: MaturityBand }[];
}) {
  const w = 515;
  const h = 200;
  const barW = 36;
  const gap = 14;
  const base = 160;
  return (
    <Svg width={w} height={h}>
      <Path d={`M 0 ${base} L ${w} ${base}`} stroke="#E2E8F0" strokeWidth={1} />
      {items.map((item, i) => {
        const x = 8 + i * (barW + gap);
        const bh = (item.percent / 100) * 140;
        return (
          <Rect
            key={item.label}
            x={x}
            y={base - bh}
            width={barW}
            height={bh}
            fill={BAND_COLORS[item.band]}
          />
        );
      })}
    </Svg>
  );
}

export function ReportDocument({
  details,
  result,
  logoSrc,
}: {
  details: AssessmentDetails;
  result: AssessmentResult;
  logoSrc: string;
}) {
  const top3 = result.gaps.slice(0, 3);
  const radarValues = result.categories.map((c) => c.percent);
  const bars = result.categories.map((c) => ({
    label: c.category,
    percent: c.percent,
    band: c.band,
  }));

  return (
    <Document title={`HR Assessment — ${details.company || "Cerity People"}`}>
      <Page size="A4" style={styles.page}>
        <HeaderBar logoSrc={logoSrc} />
        <Text style={styles.h1}>HR Maturity Assessment</Text>
        <Text style={{ marginTop: 8, fontSize: 12 }}>{details.company || "Your organisation"}</Text>
        <Text style={styles.muted}>
          Prepared for {details.name || details.email} · {details.industry || "Industry not specified"} ·{" "}
          {details.companySize || "Size not specified"}
        </Text>
        <View style={[styles.card, { marginTop: 20 }]}>
          <Text style={{ fontSize: 11, fontWeight: 700 }}>Overall score (indicative)</Text>
          <Text style={{ fontFamily: "DM Serif Display", fontSize: 32, marginTop: 4 }}>
            {result.overall} · {result.overallBand}
          </Text>
          <Text style={styles.muted}>
            HRMS today: {details.hrmsToday || "—"} · HR headcount: {details.hrHeadcount || "—"}
          </Text>
        </View>
        <Text style={[styles.h2, { marginTop: 12 }]}>What this briefing covers</Text>
        <Text>
          Category scores, priority gaps, indicative hours and compliance banding, mapped to existing
          Cerity People modules. Figures are indicative only.
        </Text>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <HeaderBar logoSrc={logoSrc} />
        <Text style={styles.h2}>Executive summary</Text>
        <View style={styles.row}>
          <View style={[styles.card, { flex: 1 }]}>
            <Text style={{ fontWeight: 700 }}>Scorecard</Text>
            <Text style={{ marginTop: 4 }}>
              {result.overall} / 100 · {result.overallBand}
            </Text>
            <Text style={styles.muted}>
              Indicative hours/month (priority gaps): {result.indicativeHoursPerMonth}
            </Text>
            <Text style={styles.muted}>Indicative compliance risk: {result.complianceLevel}</Text>
          </View>
        </View>
        <Text style={[styles.h2, { marginTop: 10 }]}>Top gaps</Text>
        {top3.map((g) => (
          <View key={g.category} style={styles.card}>
            <Text style={{ fontWeight: 700 }}>
              {g.category} · {g.percent}% · {g.band}
            </Text>
            <Text style={{ marginTop: 3 }}>{g.insights[0]}</Text>
          </View>
        ))}
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <HeaderBar logoSrc={logoSrc} />
        <Text style={styles.h2}>Score visuals (same series as on-screen)</Text>
        <View style={styles.row}>
          <View>
            <Text style={{ fontWeight: 700, marginBottom: 4 }}>Overall</Text>
            <GaugeSvg overall={result.overall} band={result.overallBand} />
            <Text>
              {result.overall} · {result.overallBand}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: 700, marginBottom: 4 }}>Radar (categories)</Text>
            <RadarSvg values={radarValues} />
          </View>
        </View>
        <Text style={{ fontWeight: 700, marginTop: 8, marginBottom: 4 }}>Bars by band colour</Text>
        <BarSvg items={bars} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
          {result.categories.map((c) => (
            <Text key={c.category} style={{ fontSize: 7, width: "48%" }}>
              {c.category}: {c.percent}% ({c.band})
            </Text>
          ))}
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <HeaderBar logoSrc={logoSrc} />
        <Text style={styles.h2}>Question responses</Text>
        <View style={styles.tableHeader}>
          <Text style={{ width: "22%", color: "#fff", fontSize: 8 }}>Category</Text>
          <Text style={{ width: "38%", color: "#fff", fontSize: 8 }}>Question</Text>
          <Text style={{ width: "32%", color: "#fff", fontSize: 8 }}>Answer</Text>
          <Text style={{ width: "8%", color: "#fff", fontSize: 8 }}>Score</Text>
        </View>
        {result.mcqRows.map((row) => (
          <View key={row.questionId} style={[styles.tableRow, { backgroundColor: scoreFill(row.score) }]}>
            <Text style={{ width: "22%", fontSize: 7 }}>{row.category}</Text>
            <Text style={{ width: "38%", fontSize: 7 }}>{row.prompt}</Text>
            <Text style={{ width: "32%", fontSize: 7 }}>{row.answerLabel}</Text>
            <Text style={{ width: "8%", fontSize: 7 }}>{row.score}</Text>
          </View>
        ))}
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <HeaderBar logoSrc={logoSrc} />
        <Text style={styles.h2}>Priority gaps (indicative)</Text>
        {result.gaps.map((g) => (
          <View key={g.category} style={styles.card} wrap={false}>
            <Text style={{ fontWeight: 700 }}>
              {g.category} · {g.percent}% · {g.band}
            </Text>
            {g.insights.map((ins) => (
              <Text key={ins} style={{ marginTop: 3 }}>
                {ins}
              </Text>
            ))}
            <Text style={{ marginTop: 4, fontSize: 8, color: "#64748B" }}>
              Indicative hours/month: {g.indicativeHoursPerMonth} (headcount mid-point{" "}
              {result.headcountMidpoint} × (1 − score/100) × 0.35)
            </Text>
          </View>
        ))}
        <View style={styles.card}>
          <Text style={{ fontWeight: 700 }}>Indicative compliance risk: {result.complianceLevel}</Text>
          <Text style={styles.muted}>
            High if Payroll, Compliance & HR Data is below 40; Medium if below 60; otherwise Low.
          </Text>
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <HeaderBar logoSrc={logoSrc} />
        <Text style={styles.h2}>What you told us</Text>
        {result.quotedText.length === 0 ? (
          <Text style={styles.muted}>No optional comments were provided.</Text>
        ) : (
          result.quotedText.map((q) => (
            <View key={q.questionId} style={styles.card} wrap={false}>
              <Text style={{ fontWeight: 700 }}>{q.category}</Text>
              <Text style={styles.muted}>{q.prompt}</Text>
              <Text style={{ marginTop: 4 }}>You told us: “{q.answer}”</Text>
            </View>
          ))
        )}
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <HeaderBar logoSrc={logoSrc} />
        <Text style={styles.h2}>How we address these gaps</Text>
        {result.gaps.map((g) =>
          g.solvedBy.map((title) => {
            const mod = moduleCopy(title);
            return (
              <View key={`${g.category}-${title}`} style={styles.card} wrap={false}>
                <Text style={{ fontWeight: 700 }}>
                  {g.category} → {mod.title}
                </Text>
                <Text style={{ marginTop: 3 }}>Before: {g.insights[0]}</Text>
                <Text style={{ marginTop: 3 }}>After: {mod.description}</Text>
              </View>
            );
          }),
        )}
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <HeaderBar logoSrc={logoSrc} />
        <Text style={styles.h2}>30 / 60 / 90 day sequence</Text>
        <View style={styles.card}>
          <Text style={{ fontWeight: 700 }}>First 30 days</Text>
          <Text>
            Confirm people master data, attendance, and payroll inputs for the lowest-scoring
            categories. Agree owners and a single source of truth.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={{ fontWeight: 700 }}>By 60 days</Text>
          <Text>
            Stand up the mapped modules for your priority gaps so routine requests, leave, and
            hiring stages leave email and spreadsheets.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={{ fontWeight: 700 }}>By 90 days</Text>
          <Text>
            Turn on reporting and self-service so leaders see headcount and attrition without waiting
            on extracts, and HR is not the bottleneck for letters and balances.
          </Text>
        </View>
        <Text style={styles.muted}>Generic sequencing for discussion — not a case study or guarantee.</Text>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <HeaderBar logoSrc={logoSrc} />
        <Text style={styles.h1}>Book a working session</Text>
        <Text style={{ marginTop: 10 }}>
          Walk through this briefing with Cerity People. We will map the indicative gaps to a
          practical sequence — no public pricing on this report.
        </Text>
        <View style={[styles.card, { marginTop: 16 }]}>
          <Text>
            Web:{" "}
            <Link src={`${siteConfig.url}/contact`}>
              {siteConfig.url.replace(/^https?:\/\//, "")}/contact
            </Link>
          </Text>
          <Text style={{ marginTop: 4 }}>Email: {siteConfig.contact.email}</Text>
          <Text style={{ marginTop: 4 }}>Phone: {siteConfig.contact.phone}</Text>
        </View>
        <Footer />
      </Page>
    </Document>
  );
}