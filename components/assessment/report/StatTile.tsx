import { Text, View } from "@react-pdf/renderer";
import { reportTheme } from "./report-theme";

export function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <View
      style={{
        width: "32%",
        borderWidth: 1,
        borderColor: reportTheme.gold,
        backgroundColor: reportTheme.cream,
        padding: 7,
        borderRadius: 4,
        marginBottom: 6,
      }}
    >
      <Text style={{ fontSize: 7.5, color: reportTheme.muted, textTransform: "uppercase" }}>{label}</Text>
      <Text style={{ fontFamily: reportTheme.font.serif, fontSize: 12, color: reportTheme.navy, marginTop: 3 }}>
        {value}
      </Text>
      {hint ? (
        <Text style={{ fontSize: 7.5, color: reportTheme.muted, marginTop: 2 }}>{hint}</Text>
      ) : null}
    </View>
  );
}
