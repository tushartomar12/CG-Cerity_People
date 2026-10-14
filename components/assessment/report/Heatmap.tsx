import { G, Rect, Svg, Text as SvgText } from "@react-pdf/renderer";
import { reportTheme } from "./report-theme";

const cellFill = ["#FECACA", "#FDE68A", "#BFDBFE", "#BBF7D0"] as const;

export function Heatmap({
  rows,
  width = 523,
}: {
  rows: { category: string; cells: { label: string; score: 0 | 1 | 2 | 3 }[] }[];
  width?: number;
}) {
  const left = 150;
  const top = 22;
  const cellW = (width - left - 8) / 2;
  const cellH = 28;
  const h = top + rows.length * cellH + 28;
  return (
    <Svg width={width} height={h}>
      <SvgText x={left + cellW / 2} y={12} textAnchor="middle" style={{ fontSize: 7.5, fill: reportTheme.muted }}>
        MCQ 1 (score 0–3)
      </SvgText>
      <SvgText x={left + cellW + cellW / 2} y={12} textAnchor="middle" style={{ fontSize: 7.5, fill: reportTheme.muted }}>
        MCQ 2 (score 0–3)
      </SvgText>
      {rows.map((row, ri) => {
        const y = top + ri * cellH;
        return (
          <G key={row.category}>
            <SvgText x={4} y={y + 16} style={{ fontSize: 7.5, fill: reportTheme.navy }}>
              {row.category.length > 26 ? `${row.category.slice(0, 25)}…` : row.category}
            </SvgText>
            {row.cells.map((cell, ci) => (
              <G key={`${row.category}-${ci}`}>
                <Rect
                  x={left + ci * cellW}
                  y={y}
                  width={cellW - 4}
                  height={cellH - 4}
                  fill={cellFill[cell.score]}
                />
                <SvgText
                  x={left + ci * cellW + (cellW - 4) / 2}
                  y={y + 16}
                  textAnchor="middle"
                  style={{ fontSize: 8, fill: reportTheme.navy }}
                >
                  {`${cell.score} · ${cell.score === 0 ? "Critical" : cell.score === 3 ? "Strong" : "Needs attention"}`}
                </SvgText>
              </G>
            ))}
          </G>
        );
      })}
      {[
        { s: 0 as const, t: "0 Critical" },
        { s: 1 as const, t: "1–2 Needs attention" },
        { s: 3 as const, t: "3 Strong" },
      ].map((leg, i) => (
        <G key={leg.t}>
          <Rect x={8 + i * 120} y={h - 16} width={10} height={10} fill={cellFill[leg.s]} />
          <SvgText x={22 + i * 120} y={h - 8} style={{ fontSize: 7, fill: reportTheme.navy }}>
            {leg.t}
          </SvgText>
        </G>
      ))}
    </Svg>
  );
}
