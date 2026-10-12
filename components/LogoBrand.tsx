import { cn } from "@/lib/utils";

const LOGO_SRC = "/cerity-logo.png";

/** Official CerityPeople lockup — used in header, footer, and splash. */
export function LogoBrand({
  layout = "header",
  inverted = false,
  className,
}: {
  layout?: "header" | "splash";
  markSize?: number;
  markAnimated?: boolean | "intro" | "nav";
  showTagline?: boolean;
  inverted?: boolean;
  className?: string;
}) {
  const isSplash = layout === "splash";

  return (
    <img
      src={inverted ? "/cerity-logo-contact.png" : LOGO_SRC}
      alt="CerityPeople"
      className={cn(
        "h-auto object-contain",
        isSplash ? "w-[min(28rem,82vw)]" : "h-12 w-auto max-w-[230px] sm:h-[3.25rem] sm:max-w-[270px]",
        className,
      )}
    />
  );
}
