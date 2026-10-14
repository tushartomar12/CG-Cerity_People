import { Circle, G, Line, Rect, Svg, Text as SvgText } from "@react-pdf/renderer";
import { reportTheme } from "./report-theme";

export function PriorityMatrix({
  points,
  width = 523,
}: {
  points: { label: string; impact: number; effort: number }[];
  width?: number;
}) {
  const left = 48;
  const top = 18;
  const plotW = width - 70;
  const plotH = 168;
  const maxI = Math.max(1, ...points.map((p) => p.impact), 1);
  const maxE = Math.max(1, ...points.map((p) => p.effort), 1);
  const xOf = (e: number) => left + (e / maxE) * plotW;
  const yOf = (i: number) => top + plotH - (i / maxI) * plotH;
  const midX = left + plotW / 2;
  const midY = top + plotH / 2;
  return (
    <Svg width={width} height={plotH + 40}>
      <Rect x={left} y={top} width={plotW / 2} height={plotH / 2} fill="#FEF3C7" fillOpacity={0.55} />
      <Rect x={midX} y={top} width={plotW / 2} height={plotH / 2} fill="#FECACA" fillOpacity={0.45} />
      <Rect x={left} y={midY} width={plotW / 2} height={plotH / 2} fill="#BBF7D0" fillOpacity={0.4} />
      <Rect x={midX} y={midY} width={plotW / 2} height={plotH / 2} fill="#BFDBFE" fillOpacity={0.4} />
      <Line x1={left} y1={top + plotH} x2={left + plotW} y2={top + plotH} stroke={reportTheme.navy} strokeWidth={1} />
      <Line x1={left} y1={top} x2={left} y2={top + plotH} stroke={reportTheme.navy} strokeWidth={1} />
      <Line x1={midX} y1={top} x2={midX} y2={top + plotH} stroke={reportTheme.line} strokeWidth={0.8} />
      <Line x1={left} y1={midY} x2={left + plotW} y2={midY} stroke={reportTheme.line} strokeWidth={0.8} />
      <SvgText x={left + 6} y={top + 12} style={{ fontSize: 7, fill: reportTheme.navy }}>
        Quick win
      </SvgText>
      <SvgText x={midX + 6} y={top + 12} style={{ fontSize: 7, fill: reportTheme.navy }}>
        Major programme
      </SvgText>
      <SvgText x={left + 6} y={top + plotH - 8} style={{ fontSize: 7, fill: reportTheme.navy }}>
        Maintain
      </SvgText>
      <SvgText x={midX + 6} y={top + plotH - 8} style={{ fontSize: 7, fill: reportTheme.navy }}>
        Plan later
      </SvgText>
      {points.map((p, i) => {
        const x = xOf(p.effort);
        const y = yOf(p.impact);
        const ox = (i % 2 === 0 ? 8 : -8) + (i > 1 ? 4 : 0);
        return (
          <G key={p.label}>
            <Circle cx={x} cy={y} r={4.5} fill={reportTheme.blue} />
            <SvgText x={x + ox} y={y - 7} textAnchor="middle" style={{ fontSize: 7, fill: reportTheme.navy }}>
              {p.label.length > 18 ? `${p.label.slice(0, 17)}…` : p.label}
            </SvgText>
          </G>
        );
      })}
      <SvgText x={left + plotW / 2} y={plotH + 34} textAnchor="middle" style={{ fontSize: 7.5, fill: reportTheme.muted }}>
        Effort (remaining gap points) →
      </SvgText>
      <SvgText
        x={12}
        y={top + plotH / 2}
        style={{ fontSize: 7.5, fill: reportTheme.muted }}
        transform={`rotate(-90, 12, ${top + plotH / 2})`}
      >
        Indicative impact (hours/month)
      </SvgText>
    </Svg>
  );
}
