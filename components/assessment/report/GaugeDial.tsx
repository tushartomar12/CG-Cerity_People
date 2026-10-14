import { Circle, G, Path, Svg, Text as SvgText } from "@react-pdf/renderer";
import type { MaturityBand } from "@/lib/assessment-data";
import { BAND_FILL, bandStatus, reportTheme } from "./report-theme";

export function GaugeDial({
  score,
  band,
  width = 220,
}: {
  score: number;
  band: MaturityBand;
  width?: number;
}) {
  const h = 128;
  const cx = width / 2;
  const cy = 102;
  const r = 72;
  const clamped = Math.max(0, Math.min(100, score));
  const start = Math.PI;
  const sweep = (clamped / 100) * Math.PI;
  const a = start + sweep;
  const sx = cx + r * Math.cos(start);
  const sy = cy + r * Math.sin(start);
  const ex = cx + r * Math.cos(a);
  const ey = cy + r * Math.sin(a);
  const large = clamped > 50 ? 1 : 0;
  const color = BAND_FILL[band];
  return (
    <Svg width={width} height={h}>
      <Path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke={reportTheme.line}
        strokeWidth={14}
        fill="none"
      />
      {clamped > 0 ? (
        <Path
          d={`M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`}
          stroke={color}
          strokeWidth={14}
          fill="none"
        />
      ) : (
        <Circle cx={cx - r} cy={cy} r={7} fill={color} />
      )}
      <G>
        <SvgText x={cx} y={78} textAnchor="middle" style={{ fontFamily: reportTheme.font.serif, fontSize: 22, fill: reportTheme.navy }}>
          {clamped.toFixed(clamped % 1 ? 1 : 0)}
        </SvgText>
        <SvgText x={cx} y={94} textAnchor="middle" style={{ fontSize: 9, fill: color }}>
          {bandStatus(band)} · {band}
        </SvgText>
        <SvgText x={cx - r} y={118} textAnchor="middle" style={{ fontSize: 7, fill: reportTheme.muted }}>
          0
        </SvgText>
        <SvgText x={cx} y={122} textAnchor="middle" style={{ fontSize: 7, fill: reportTheme.muted }}>
          Score (0–100)
        </SvgText>
        <SvgText x={cx + r} y={118} textAnchor="middle" style={{ fontSize: 7, fill: reportTheme.muted }}>
          100
        </SvgText>
      </G>
    </Svg>
  );
}
