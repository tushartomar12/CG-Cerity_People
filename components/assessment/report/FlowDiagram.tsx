import { G, Path, Rect, Svg, Text as SvgText } from "@react-pdf/renderer";
import { reportTheme } from "./report-theme";

export function FlowDiagram({
  title,
  steps,
  width = 523,
}: {
  title: string;
  steps: string[];
  width?: number;
}) {
  const boxW = Math.min(110, (width - 40) / Math.max(steps.length, 1) - 12);
  const h = 78;
  const y = 28;
  const gap = 16;
  const total = steps.length * boxW + (steps.length - 1) * gap;
  const startX = (width - total) / 2;
  return (
    <Svg width={width} height={h}>
      <SvgText x={4} y={12} style={{ fontSize: 8, fill: reportTheme.navy }}>
        {title}
      </SvgText>
      {steps.map((step, i) => {
        const x = startX + i * (boxW + gap);
        return (
          <G key={`${title}-${i}`}>
            <Rect x={x} y={y} width={boxW} height={36} fill={reportTheme.cream} stroke={reportTheme.blue} />
            <SvgText x={x + boxW / 2} y={y + 16} textAnchor="middle" style={{ fontSize: 7, fill: reportTheme.navy }}>
              {step.slice(0, 18)}
            </SvgText>
            <SvgText x={x + boxW / 2} y={y + 26} textAnchor="middle" style={{ fontSize: 7, fill: reportTheme.navy }}>
              {step.slice(18, 36)}
            </SvgText>
            {i < steps.length - 1 ? (
              <Path
                d={`M ${x + boxW + 2} ${y + 18} L ${x + boxW + gap - 2} ${y + 18}`}
                stroke={reportTheme.gold}
                strokeWidth={1.4}
              />
            ) : null}
            {i < steps.length - 1 ? (
              <Path
                d={`M ${x + boxW + gap - 6} ${y + 14} L ${x + boxW + gap - 2} ${y + 18} L ${x + boxW + gap - 6} ${y + 22}`}
                stroke={reportTheme.gold}
                strokeWidth={1.4}
                fill="none"
              />
            ) : null}
          </G>
        );
      })}
    </Svg>
  );
}
