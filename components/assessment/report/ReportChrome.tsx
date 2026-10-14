import { Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { siteConfig } from "@/lib/site-config";
import { clipText, reportTheme } from "./report-theme";

const pageStyle = {
  fontFamily: [reportTheme.font.sans, reportTheme.font.fallback],
  fontSize: reportTheme.size.body,
  color: reportTheme.navy,
  paddingTop: reportTheme.page.padTop,
  paddingBottom: reportTheme.page.padBottom,
  paddingHorizontal: reportTheme.page.padX,
  backgroundColor: reportTheme.white,
};

export function ReportPage({
  logoSrc,
  company,
  children,
}: {
  logoSrc: string;
  company: string;
  children: React.ReactNode;
}) {
  return (
    <Page size="A4" style={pageStyle} wrap>
      <View
        fixed
        style={{
          position: "absolute",
          top: 14,
          left: reportTheme.page.padX,
          right: reportTheme.page.padX,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: reportTheme.gold,
          paddingBottom: 6,
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src={logoSrc} style={{ height: 22, maxWidth: 140, objectFit: "contain" }} />
        <Text style={{ fontSize: 8, color: reportTheme.navy }}>HR Health Assessment Report</Text>
        <Text style={{ fontSize: 8, color: reportTheme.muted, maxWidth: 180 }}>
          {clipText(company || "Organisation", 36)}
        </Text>
      </View>
      {children}
      <View
        fixed
        style={{
          position: "absolute",
          bottom: 14,
          left: reportTheme.page.padX,
          right: reportTheme.page.padX,
          borderTopWidth: 1,
          borderTopColor: reportTheme.line,
          paddingTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 7, color: reportTheme.muted, width: "70%" }}>
          Indicative analysis based on self-reported answers. {siteConfig.name}.
        </Text>
        <Text
          style={{ fontSize: 7, color: reportTheme.muted }}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </View>
    </Page>
  );
}

export function H2({ children }: { children: string }) {
  return (
    <Text
      minPresenceAhead={64}
      style={{
        fontFamily: reportTheme.font.serif,
        fontSize: reportTheme.size.h2,
        color: reportTheme.navy,
        marginBottom: 6,
        marginTop: 2,
      }}
    >
      {children}
    </Text>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ fontSize: 9.5, lineHeight: 1.4, marginBottom: 6, color: reportTheme.navy }}>{children}</Text>
  );
}

export function TocRow({ label, page, href }: { label: string; page: number; href: string }) {
  return (
    <Link src={href} style={{ marginBottom: 4, textDecoration: "none" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 10, color: reportTheme.blue }}>{label}</Text>
        <Text style={{ fontSize: 10, color: reportTheme.navy }}>{page}</Text>
      </View>
    </Link>
  );
}
