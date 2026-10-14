import { Circle, Line, Svg } from "@react-pdf/renderer";
import { Text, View } from "@react-pdf/renderer";
import { reportTheme } from "./report-theme";

export function Timeline({
  milestones,
  width = 523,
}: {
  milestones: { day: string; title: string; detail: string }[];
  width?: number;
}) {
  const y = 18;
  const pad = 28;
  const span = width - pad * 2;
  return (
    <View wrap={false}>
      <Svg width={width} height={36}>
        <Line x1={pad} y1={y} x2={pad + span} y2={y} stroke={reportTheme.blue} strokeWidth={3} />
        {milestones.map((m, i) => {
          const x = pad + (i / Math.max(milestones.length - 1, 1)) * span;
          return <Circle key={m.day} cx={x} cy={y} r={7} fill={reportTheme.gold} />;
        })}
      </Svg>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {milestones.map((m) => (
          <View
            key={m.day}
            style={{
              width: "32%",
              backgroundColor: reportTheme.cream,
              borderWidth: 1,
              borderColor: reportTheme.gold,
              padding: 6,
            }}
          >
            <Text style={{ fontSize: 8, fontWeight: 700, color: reportTheme.navy }}>{m.day}</Text>
            <Text style={{ fontSize: 8.5, fontWeight: 700, marginTop: 3 }}>{m.title}</Text>
            <Text style={{ fontSize: 8, marginTop: 3, lineHeight: 1.35, color: reportTheme.navy }}>{m.detail}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
