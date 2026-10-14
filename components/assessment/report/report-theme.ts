import type { MaturityBand } from "@/lib/assessment-data";

export const reportTheme = {
  blue: "#1677E8",
  gold: "#F59E0B",
  navy: "#102840",
  cream: "#FFFBEB",
  white: "#FFFFFF",
  softWhite: "#F8F8F8",
  muted: "#5B6B7C",
  line: "#E2E8F0",
  critical: "#DC2626",
  reactive: "#D97706",
  developing: "#1677E8",
  optimized: "#059669",
  page: { width: 595.28, height: 841.89, padX: 36, padTop: 52, padBottom: 48 },
  font: { sans: "DM Sans", serif: "DM Serif Display", fallback: "Noto Sans" },
  size: { body: 9.5, small: 8, caption: 8, h1: 22, h2: 14, h3: 11 },
} as const;

export const BAND_FILL: Record<MaturityBand, string> = {
  Critical: reportTheme.critical,
  Reactive: reportTheme.reactive,
  Developing: reportTheme.developing,
  Optimized: reportTheme.optimized,
};

export function bandStatus(band: MaturityBand): string {
  if (band === "Critical") return "Critical";
  if (band === "Reactive") return "Needs attention";
  if (band === "Developing") return "Developing";
  return "Strong";
}

export function answerStatus(score: 0 | 1 | 2 | 3): string {
  if (score === 0) return "Critical";
  if (score === 3) return "Strong";
  return "Needs attention";
}

export function clipText(value: string, max = 160): string {
  const t = value.replace(/\s+/g, " ").trim();
  if (!t) return "No response provided";
  if (t.length <= max) return t;
  return `${t.slice(0, Math.max(1, max - 1))}…`;
}
