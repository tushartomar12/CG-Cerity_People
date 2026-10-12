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
  size?: "default" | "compact";
  inverted?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        size === "default" ? "py-16 sm:py-24" : "py-12 sm:py-16",
        className,
      )}
    >
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className={cn(
              "text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-tight",
              inverted ? "text-white" : "text-navy",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                "mt-6 text-lg leading-relaxed sm:text-xl",
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
