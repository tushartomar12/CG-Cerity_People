import { Font } from "@react-pdf/renderer";

let registered = false;

function fontSrc(file: string, assetBase?: string): string {
  if (typeof window !== "undefined") {
    const root = assetBase?.startsWith("http") ? assetBase.replace(/\/$/, "") : window.location.origin;
    return `${root}/fonts/${file}`;
  }
  const root = (assetBase && !assetBase.startsWith("http") ? assetBase : `${process.cwd()}/public`).replace(
    /[\\/]$/,
    "",
  );
  return `${root.replace(/\\/g, "/")}/fonts/${file}`;
}

export function registerReportFonts(assetBase?: string): void {
  if (registered) return;
  Font.register({
    family: "DM Sans",
    fonts: [
      { src: fontSrc("DMSans-Regular.ttf", assetBase), fontWeight: 400 },
      { src: fontSrc("DMSans-SemiBold.ttf", assetBase), fontWeight: 600 },
      { src: fontSrc("DMSans-Bold.ttf", assetBase), fontWeight: 700 },
    ],
  });
  Font.register({
    family: "DM Serif Display",
    src: fontSrc("DMSerifDisplay-Regular.ttf", assetBase),
  });
  Font.register({
    family: "Noto Sans",
    src: fontSrc("NotoSans-Regular.ttf", assetBase),
  });
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}
