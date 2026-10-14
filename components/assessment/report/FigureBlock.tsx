import { Text, View } from "@react-pdf/renderer";
import { reportTheme } from "./report-theme";

export function FigureBlock({
  title,
  children,
  howToRead,
  compact,
}: {
  title: string;
  children: React.ReactNode;
  howToRead: string;
  compact?: boolean;
}) {
  return (
    <View wrap={false} style={{ marginBottom: compact ? 4 : 8 }}>
      <Text
        minPresenceAhead={72}
        style={{
          fontFamily: reportTheme.font.serif,
          fontSize: 10,
          color: reportTheme.navy,
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      {children}
      <Text style={{ fontSize: 7.5, color: reportTheme.muted, marginTop: 3 }}>
        Source: Based on your assessment responses.
      </Text>
      <Text style={{ fontSize: 8, color: reportTheme.navy, marginTop: 2, lineHeight: 1.35 }}>
        How to read this: {howToRead}
      </Text>
    </View>
  );
}
