import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BrandBackgroundVariant =
  | "hero"
  | "default"
  | "about"
  | "tech"
  | "consulting"
  | "people"
  | "solutions"
  | "trust"
  | "testimonials"
  | "cta"
  | "footer"
  | "hrTech"
  | "consultingPage"
  | "solutionsPage"
  | "contactPage";

const BLUE = "#1677E8";
const GOLD = "#F59E0B";
const GOLD_LIGHT = "#FDE68A";

type Corner = "tl" | "tr" | "bl" | "br" | "ml" | "mr";
type Tone = "blue" | "gold" | "goldLight" | "blueDeep" | "goldDeep";

const toneFill: Record<Tone, string> = {
  blue: `radial-gradient(circle at 42% 42%, rgba(22,119,232,0.18) 0%, rgba(22,119,232,0.07) 46%, transparent 70%)`,
  gold: `radial-gradient(circle at 42% 42%, rgba(245,158,11,0.16) 0%, rgba(253,230,138,0.22) 38%, transparent 70%)`,
  goldLight: `radial-gradient(circle at 42% 42%, rgba(253,230,138,0.42) 0%, rgba(245,158,11,0.10) 48%, transparent 72%)`,
  blueDeep: `radial-gradient(circle at 42% 42%, rgba(22,119,232,0.58) 0%, rgba(22,119,232,0.22) 48%, transparent 72%)`,
  goldDeep: `radial-gradient(circle at 42% 42%, rgba(245,158,11,0.42) 0%, rgba(90,70,20,0.38) 42%, transparent 74%)`,
};

function compactCorner(corner: Corner): Corner {
  if (corner === "ml") return "tl";
  if (corner === "mr") return "tr";
  return corner;
}

const cornerPos: Record<Corner, string> = {
  tl: "top-[-28%] left-[-18%]",
  tr: "top-[-30%] right-[-20%]",
  bl: "bottom-[-36%] left-[-22%]",
  br: "bottom-[-30%] right-[-18%]",
  ml: "top-1/2 left-[-32%] -translate-y-1/2",
  mr: "top-1/2 right-[-32%] -translate-y-1/2",
};

function BrandGrid({ density = "default" }: { density?: "hero" | "default" | "faint" | "navy" }) {
  const navy = density === "navy";
  const a = navy ? 0.1 : density === "hero" ? 0.05 : density === "faint" ? 0.035 : 0.045;
  const b = navy ? 0.06 : density === "faint" ? 0.018 : 0.025;
  const lineA = navy ? `rgba(255,255,255,${a})` : `rgba(22,119,232,${a})`;
  const lineB = navy ? `rgba(22,119,232,${b})` : `rgba(8,32,56,${b})`;
  return (
    <div
      className="brand-grid absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to right, ${lineA} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineA} 1px, transparent 1px),
          linear-gradient(to right, ${lineB} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineB} 1px, transparent 1px)`,
        backgroundSize: "88px 88px, 88px 88px, 176px 176px, 176px 176px",
      }}
    />
  );
}

function CornerArc({
  corner,
  tone,
  size = "58%",
  drift,
  secondary,
}: {
  corner: Corner;
  tone: Tone;
  size?: string;
  drift?: "normal" | "slow";
  secondary?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute aspect-square rounded-full",
        cornerPos[corner],
        drift === "slow" ? "brand-arc-drift-slow" : "brand-arc-drift",
        secondary && "brand-motif-secondary",
      )}
      style={{ width: size, background: toneFill[tone] }}
    />
  );
}

function BrandGlow({
  corner,
  tone,
  secondary,
}: {
  corner: Corner;
  tone: Tone;
  secondary?: boolean;
}) {
  const color =
    tone === "blueDeep"
      ? "rgba(22,119,232,0.28)"
      : tone === "goldDeep"
        ? "rgba(245,158,11,0.2)"
        : tone === "blue"
          ? "rgba(22,119,232,0.12)"
          : "rgba(245,158,11,0.10)";
  return (
    <div
      className={cn(
        "absolute h-[55%] w-[55%] rounded-full blur-3xl",
        cornerPos[corner],
        secondary && "brand-motif-secondary",
      )}
      style={{ background: color }}
    />
  );
}

function DotMatrix({ corner }: { corner: Corner }) {
  const pos: Record<Corner, string> = {
    tl: "top-[12%] left-[6%]",
    tr: "top-[18%] right-[8%]",
    bl: "bottom-[10%] left-[7%]",
    br: "bottom-[14%] right-[9%]",
    ml: "top-1/2 left-[6%] -translate-y-1/2",
    mr: "top-1/2 right-[8%] -translate-y-1/2",
  };
  return (
    <div
      className={cn(
        "brand-motif-secondary absolute h-28 w-24 opacity-[0.12] sm:h-36 sm:w-28",
        pos[corner],
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(22,119,232,1) 1px, transparent 1.2px)",
        backgroundSize: "12px 12px",
      }}
    />
  );
}

function MotifSvg({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function Ring({
  cx,
  cy,
  r,
  stroke,
  width,
  opacity,
}: {
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  width: number;
  opacity: number;
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      stroke={stroke}
      strokeWidth={width}
      opacity={opacity}
    />
  );
}

type Motifs = {
  grid?: "hero" | "default" | "faint" | "navy";
  wash?: string;
  glows?: { corner: Corner; tone: Tone; secondary?: boolean }[];
  arcs?: {
    corner: Corner;
    tone: Tone;
    size?: string;
    drift?: "normal" | "slow";
    secondary?: boolean;
  }[];
  rings?: { cx: number; cy: number; r: number; stroke: string; width: number; opacity: number }[];
  lines?: { d: string; stroke: string; opacity?: number }[];
  dots?: Corner[];
};

const motifs: Record<BrandBackgroundVariant, Motifs> = {
  hero: {
    grid: "hero",
    wash: "radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, rgba(255,255,255,0.86) 42%, transparent 70%)",
    glows: [
      { corner: "bl", tone: "blue" },
      { corner: "tr", tone: "gold" },
      { corner: "br", tone: "blue", secondary: true },
    ],
    arcs: [
      { corner: "tl", tone: "blue", size: "48%" },
      { corner: "tr", tone: "goldLight", size: "56%", drift: "slow" },
      { corner: "tr", tone: "blue", size: "38%", secondary: true },
      { corner: "bl", tone: "blue", size: "68%" },
      { corner: "bl", tone: "gold", size: "46%", drift: "slow", secondary: true },
      { corner: "br", tone: "goldLight", size: "52%" },
      { corner: "br", tone: "blue", size: "40%", secondary: true },
    ],
    rings: [
      { cx: 80, cy: 920, r: 430, stroke: BLUE, width: 150, opacity: 0.13 },
      { cx: 220, cy: 980, r: 340, stroke: GOLD, width: 90, opacity: 0.11 },
      { cx: 1380, cy: 40, r: 380, stroke: GOLD_LIGHT, width: 110, opacity: 0.28 },
      { cx: 1320, cy: 120, r: 260, stroke: BLUE, width: 70, opacity: 0.12 },
      { cx: 1420, cy: 860, r: 360, stroke: GOLD, width: 100, opacity: 0.12 },
      { cx: 1360, cy: 900, r: 250, stroke: BLUE, width: 80, opacity: 0.14 },
    ],
    lines: [
      {
        d: "M 980 40 C 1180 180, 1280 420, 1220 680",
        stroke: GOLD,
        opacity: 0.28,
      },
    ],
    dots: ["bl", "tr"],
  },
  default: {
    grid: "faint",
    arcs: [
      { corner: "tr", tone: "blue", size: "36%", secondary: true },
      { corner: "bl", tone: "goldLight", size: "32%", secondary: true },
    ],
    rings: [{ cx: 1420, cy: 80, r: 260, stroke: BLUE, width: 70, opacity: 0.08 }],
  },
  about: {
    grid: "default",
    glows: [{ corner: "tr", tone: "blue" }],
    arcs: [
      { corner: "tr", tone: "blue", size: "50%" },
      { corner: "tl", tone: "goldLight", size: "28%", secondary: true },
    ],
    rings: [{ cx: 1480, cy: 200, r: 340, stroke: BLUE, width: 90, opacity: 0.1 }],
    lines: [{ d: "M 1100 80 C 1280 220, 1360 400, 1300 560", stroke: GOLD, opacity: 0.18 }],
  },
  tech: {
    grid: "default",
    glows: [{ corner: "bl", tone: "blue" }],
    arcs: [
      { corner: "bl", tone: "blue", size: "62%" },
      { corner: "br", tone: "blue", size: "34%", secondary: true },
    ],
    rings: [
      { cx: -40, cy: 860, r: 420, stroke: BLUE, width: 140, opacity: 0.14 },
      { cx: 1400, cy: 820, r: 240, stroke: BLUE, width: 60, opacity: 0.08 },
    ],
    dots: ["br"],
  },
  hrTech: {
    grid: "default",
    glows: [
      { corner: "ml", tone: "blue" },
      { corner: "mr", tone: "blue" },
    ],
    arcs: [
      { corner: "ml", tone: "blue", size: "68%" },
      { corner: "ml", tone: "blue", size: "48%", drift: "slow", secondary: true },
      { corner: "mr", tone: "blue", size: "64%" },
      { corner: "mr", tone: "blue", size: "44%", drift: "slow", secondary: true },
    ],
  },
  consultingPage: {
    grid: "default",
    glows: [
      { corner: "ml", tone: "gold" },
      { corner: "mr", tone: "gold" },
    ],
    arcs: [
      { corner: "ml", tone: "gold", size: "68%" },
      { corner: "ml", tone: "goldLight", size: "48%", drift: "slow", secondary: true },
      { corner: "mr", tone: "gold", size: "64%" },
      { corner: "mr", tone: "goldLight", size: "44%", drift: "slow", secondary: true },
    ],
  },
  consulting: {
    grid: "default",
    glows: [
      { corner: "tr", tone: "gold" },
      { corner: "bl", tone: "blue", secondary: true },
    ],
    arcs: [
      { corner: "tr", tone: "goldLight", size: "50%" },
      { corner: "bl", tone: "blue", size: "44%" },
    ],
    rings: [
      { cx: 1400, cy: 60, r: 320, stroke: GOLD, width: 80, opacity: 0.12 },
      { cx: 80, cy: 880, r: 300, stroke: BLUE, width: 90, opacity: 0.11 },
    ],
    lines: [{ d: "M 1080 60 C 1240 200, 1320 380, 1260 540", stroke: GOLD, opacity: 0.22 }],
  },
  people: {
    grid: "faint",
    wash: "linear-gradient(180deg, rgba(255,251,235,0.7) 0%, rgba(255,255,255,0.4) 48%, transparent 100%)",
    glows: [{ corner: "tr", tone: "gold" }],
    arcs: [
      { corner: "tr", tone: "goldLight", size: "54%" },
      { corner: "bl", tone: "blue", size: "36%", secondary: true },
    ],
    rings: [{ cx: 1380, cy: 40, r: 340, stroke: GOLD_LIGHT, width: 100, opacity: 0.32 }],
  },
  solutions: {
    grid: "default",
    glows: [
      { corner: "tl", tone: "blue" },
      { corner: "br", tone: "gold", secondary: true },
    ],
    arcs: [
      { corner: "tl", tone: "blue", size: "42%" },
      { corner: "br", tone: "goldLight", size: "48%" },
      { corner: "br", tone: "blue", size: "32%", secondary: true },
    ],
    rings: [
      { cx: 80, cy: -40, r: 300, stroke: BLUE, width: 80, opacity: 0.1 },
      { cx: 1400, cy: 900, r: 340, stroke: GOLD, width: 90, opacity: 0.11 },
    ],
  },
  solutionsPage: {
    grid: "default",
    dots: ["bl", "tr"],
  },
  contactPage: {
    grid: "navy",
    wash: "#082038",
    glows: [
      { corner: "ml", tone: "blueDeep" },
      { corner: "mr", tone: "goldDeep" },
    ],
    arcs: [
      { corner: "tl", tone: "blueDeep", size: "58%" },
      { corner: "ml", tone: "blueDeep", size: "72%" },
      { corner: "ml", tone: "blueDeep", size: "52%", drift: "slow", secondary: true },
      { corner: "tr", tone: "goldDeep", size: "56%" },
      { corner: "mr", tone: "goldDeep", size: "70%" },
      { corner: "mr", tone: "goldDeep", size: "48%", drift: "slow", secondary: true },
    ],
  },
  trust: {
    grid: "faint",
    wash: "linear-gradient(180deg, rgba(22,119,232,0.03) 0%, #FFFFFF 100%)",
    arcs: [{ corner: "tl", tone: "blue", size: "28%", secondary: true }],
  },
  testimonials: {
    grid: "faint",
    glows: [{ corner: "tr", tone: "blue", secondary: true }],
    arcs: [{ corner: "tr", tone: "goldLight", size: "30%", secondary: true }],
    lines: [{ d: "M 1180 80 C 1300 180, 1340 300, 1280 400", stroke: GOLD, opacity: 0.16 }],
  },
  cta: {
    grid: "faint",
    arcs: [
      { corner: "bl", tone: "blue", size: "58%" },
      { corner: "tr", tone: "goldLight", size: "42%" },
    ],
    rings: [
      { cx: -20, cy: 200, r: 280, stroke: BLUE, width: 90, opacity: 0.28 },
      { cx: 1460, cy: 40, r: 260, stroke: GOLD, width: 70, opacity: 0.22 },
    ],
    lines: [{ d: "M 900 40 C 1100 160, 1240 320, 1180 520", stroke: GOLD_LIGHT, opacity: 0.35 }],
  },
  footer: {
    grid: "faint",
    arcs: [
      { corner: "br", tone: "blue", size: "40%" },
      { corner: "bl", tone: "gold", size: "28%", secondary: true },
    ],
    rings: [{ cx: 1400, cy: 860, r: 280, stroke: BLUE, width: 70, opacity: 0.1 }],
    lines: [{ d: "M 200 820 C 480 760, 820 840, 1100 780", stroke: GOLD, opacity: 0.2 }],
  },
};

export function BrandBackground({
  variant = "default",
  compact = false,
  className,
}: {
  variant?: BrandBackgroundVariant;
  compact?: boolean;
  className?: string;
}) {
  const m = motifs[variant];
  const corner = (c: Corner) => (compact ? compactCorner(c) : c);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {m.wash ? (
        <div className="absolute inset-0" style={{ background: m.wash }} />
      ) : null}
      <BrandGrid density={m.grid ?? "default"} />
      {m.glows?.map((g, i) => (
        <BrandGlow key={`g-${i}`} {...g} corner={corner(g.corner)} />
      ))}
      {m.arcs?.map((a, i) => (
        <CornerArc key={`a-${i}`} {...a} corner={corner(a.corner)} />
      ))}
      {m.rings || m.lines ? (
        <MotifSvg className="max-sm:opacity-35">
          {m.rings?.map((r, i) => (
            <Ring key={`r-${i}`} {...r} />
          ))}
          {m.lines?.map((line, i) => (
            <path
              key={`l-${i}`}
              d={line.d}
              stroke={line.stroke}
              strokeWidth="1.25"
              opacity={line.opacity ?? 0.22}
            />
          ))}
        </MotifSvg>
      ) : null}
      {m.dots?.map((dotCorner) => (
        <DotMatrix key={dotCorner} corner={corner(dotCorner)} />
      ))}
    </div>
  );
}
