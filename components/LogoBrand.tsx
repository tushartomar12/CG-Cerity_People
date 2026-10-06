import { CerityLogoMark } from "@/components/CerityLogoMark";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Shared logo + wordmark — used in header and flying transition clone */
export function LogoBrand({
  layout = "header",
  markSize = 38,
  markAnimated = false,
  showTagline = true,
  className,
}: {
  layout?: "header" | "splash";
  markSize?: number;
  markAnimated?: boolean | "intro" | "nav";
  showTagline?: boolean;
  className?: string;
}) {
  const isSplash = layout === "splash";

  return (
    <div
      className={cn(
        "flex items-center",
        isSplash ? "flex-col gap-5 text-center" : "gap-2.5",
        className,
      )}
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center",
          !isSplash && "h-[38px] w-[38px]",
        )}
      >
        <CerityLogoMark size={markSize} animated={markAnimated} />
      </span>
      <span className={cn("flex flex-col leading-tight", isSplash && "items-center")}>
        <span
          className={cn(
            "flex items-baseline gap-1 font-semibold tracking-tight",
            isSplash ? "text-4xl sm:text-5xl" : "text-base",
          )}
        >
          <span className="text-navy">Cerity</span>
          <span className="text-accent">People</span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              "font-medium text-slate-500",
              isSplash ? "mt-1 max-w-xs text-sm sm:text-base" : "hidden text-[11px] sm:block",
            )}
          >
            {siteConfig.tagline}
          </span>
        ) : null}
      </span>
    </div>
  );
}
