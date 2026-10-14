import { Circle, G, Line, Path, Svg, Text as SvgText } from "@react-pdf/renderer";
import { BAND_FILL, reportTheme } from "./report-theme";

export function RadarChart({
  items,
  width = 520,
}: {
  items: { label: string; percent: number }[];
  width?: number;
}) {
  const h = 250;
  const cx = width / 2;
  const cy = 128;
  const r = 88;
  const n = Math.max(items.length, 1);
  const pt = (i: number, mag: number) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return [cx + mag * Math.cos(a), cy + mag * Math.sin(a)] as const;
  };
  const poly = items
    .map((item, i) => {
      const [x, y] = pt(i, (Math.max(0, Math.min(100, item.percent)) / 100) * r);
      return `${x},${y}`;
    })
    .join(" ");
  const d = poly
    .split(" ")
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p}`)
    .join(" ");
  return (
    <Svg width={width} height={h}>
      {[0.25, 0.5, 0.75, 1].map((ring) => {
        const rd = Array.from({ length: n }, (_, i) => {
          const [x, y] = pt(i, r * ring);
          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        }).join(" ");
        return <Path key={ring} d={`${rd} Z`} stroke={reportTheme.line} strokeWidth={0.7} fill="none" />;
      })}
      {items.map((item, i) => {
        const [x, y] = pt(i, r);
        return (
          <Line key={`a-${item.label}`} x1={cx} y1={cy} x2={x} y2={y} stroke={reportTheme.line} strokeWidth={0.7} />
        );
      })}
      {items.length ? (
        <Path d={`${d} Z`} fill={reportTheme.blue} fillOpacity={0.28} stroke={reportTheme.blue} strokeWidth={1.4} />
      ) : null}
      {items.map((item, i) => {
        const [px, py] = pt(i, (Math.max(0, Math.min(100, item.percent)) / 100) * r);
        const [lx, ly] = pt(i, r + 22);
        return (
          <G key={item.label}>
            <Circle cx={px} cy={py} r={2.4} fill={BAND_FILL.Developing} />
            <SvgText x={lx} y={ly} textAnchor="middle" style={{ fontSize: 7.5, fill: reportTheme.navy }}>
              {`${item.label} ${item.percent}`}
            </SvgText>
          </G>
        );
      })}
      {[25, 50, 75, 100].map((ring) => (
        <SvgText
          key={ring}
          x={cx + 6}
          y={cy - (ring / 100) * r + 3}
          style={{ fontSize: 6.5, fill: reportTheme.muted }}
        >
          {String(ring)}
        </SvgText>
      ))}
    </Svg>
  );
}
