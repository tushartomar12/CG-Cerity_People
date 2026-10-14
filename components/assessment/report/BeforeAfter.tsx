import { Text, View } from "@react-pdf/renderer";
import { reportTheme } from "./report-theme";

export function BeforeAfter({
  title,
  today,
  withCerity,
}: {
  title: string;
  today: string;
  withCerity: string;
}) {
  return (
    <View wrap={false} style={{ marginBottom: 8 }}>
      <Text style={{ fontSize: 9, fontWeight: 700, color: reportTheme.navy, marginBottom: 4 }}>{title}</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#FECACA",
            backgroundColor: "#FEF2F2",
            padding: 8,
          }}
        >
          <Text style={{ fontSize: 8, fontWeight: 700, color: reportTheme.critical }}>Today</Text>
          <Text style={{ fontSize: 8.5, marginTop: 4, lineHeight: 1.35 }}>{today}</Text>
        </View>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#BBF7D0",
            backgroundColor: "#F0FDF4",
            padding: 8,
          }}
        >
          <Text style={{ fontSize: 8, fontWeight: 700, color: reportTheme.optimized }}>With Cerity People</Text>
          <Text style={{ fontSize: 8.5, marginTop: 4, lineHeight: 1.35 }}>{withCerity}</Text>
        </View>
      </View>
    </View>
  );
}
