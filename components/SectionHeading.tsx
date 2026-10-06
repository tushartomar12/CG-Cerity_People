import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-accent/40" aria-hidden />
          {eyebrow}
          {align === "center" ? (
            <span className="h-px w-8 bg-accent/40" aria-hidden />
          ) : null}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
