import { cn } from "@/lib/utils";

export function HeroSection({
  title,
  description,
  children,
  className,
  size = "default",
  inverted = false,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "default" | "compact" | "display";
  inverted?: boolean;
}) {
  const display = size === "display";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        size === "default" && "py-16 sm:py-24",
        size === "compact" && "py-12 sm:py-16",
        display && "py-0",
        className,
      )}
    >
      <div className="container relative">
        <div className={cn("mx-auto text-center", display ? "max-w-4xl" : "max-w-3xl")}>
          <h1
            className={cn(
              "font-bold tracking-tight",
              display
                ? "text-5xl leading-[1.12] sm:text-6xl lg:text-[4.15rem] lg:leading-[1.1]"
                : "text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-tight",
              inverted ? "text-white" : "text-navy",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                "leading-relaxed",
                display
                  ? "mt-7 text-xl sm:text-2xl lg:text-[1.65rem] lg:leading-[1.55]"
                  : "mt-6 text-lg sm:text-xl",
                inverted ? "text-slate-300" : "text-slate-600",
              )}
            >
              {description}
            </p>
          ) : null}
          {children ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
