import { G, Line, Rect, Svg, Text as SvgText } from "@react-pdf/renderer";
import type { MaturityBand } from "@/lib/assessment-data";
import { BAND_FILL, bandStatus, reportTheme } from "./report-theme";

export function BarChartH({
  items,
  width = 523,
  threshold = 60,
  axisLabel = "Category score (0–100)",
  compact,
}: {
  items: { label: string; percent: number; band: MaturityBand; valueLabel?: string }[];
  width?: number;
  threshold?: number;
  axisLabel?: string;
  compact?: boolean;
}) {
  const rowH = compact ? 20 : 28;
  const top = compact ? 4 : 8;
  const left = 132;
  const right = 70;
  const barW = width - left - right;
  const h = top + items.length * rowH + (compact ? 18 : 28);
  const xOf = (p: number) => left + (Math.max(0, Math.min(100, p)) / 100) * barW;
  return (
    <Svg width={width} height={h}>
      <Line x1={left} y1={4} x2={left} y2={h - 24} stroke={reportTheme.line} strokeWidth={1} />
      {[0, 40, 60, 80, 100].map((tick) => (
        <SvgText
          key={tick}
          x={xOf(tick)}
          y={h - 14}
          textAnchor="middle"
          style={{ fontSize: 7, fill: reportTheme.muted }}
        >
          {String(tick)}
        </SvgText>
      ))}
      {threshold > 0 ? (
        <G>
          <Line
            x1={xOf(threshold)}
            y1={4}
            x2={xOf(threshold)}
            y2={h - 24}
            stroke={reportTheme.navy}
            strokeWidth={0.8}
            strokeDasharray="3,2"
          />
          <SvgText x={xOf(threshold) + 4} y={12} style={{ fontSize: 6.5, fill: reportTheme.navy }}>
            Developing 60
          </SvgText>
        </G>
      ) : null}
      {items.map((item, i) => {
        const y = top + i * rowH;
        const w = (Math.max(0, Math.min(100, item.percent)) / 100) * barW;
        return (
          <G key={item.label}>
            <SvgText x={4} y={y + 12} style={{ fontSize: 7.5, fill: reportTheme.navy }}>
              {item.label.length > 22 ? `${item.label.slice(0, 21)}…` : item.label}
            </SvgText>
            <Rect x={left} y={y} width={barW} height={16} fill={reportTheme.softWhite} />
            <Rect x={left} y={y} width={Math.max(w, 2)} height={16} fill={BAND_FILL[item.band]} />
            <SvgText
              x={w > 88 ? left + w - 6 : left + w + 4}
              y={y + 12}
              textAnchor={w > 88 ? "end" : "start"}
              style={{ fontSize: 7.5, fill: w > 88 ? reportTheme.white : reportTheme.navy }}
            >
              {item.valueLabel ?? `${item.percent} · ${bandStatus(item.band)}`}
            </SvgText>
          </G>
        );
      })}
      <SvgText x={left + barW / 2} y={h - 3} textAnchor="middle" style={{ fontSize: 7, fill: reportTheme.muted }}>
        {axisLabel}
      </SvgText>
    </Svg>
  );
}
