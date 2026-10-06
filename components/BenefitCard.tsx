import { cn } from "@/lib/utils";

export function BenefitCard({
  index,
  title,
  description,
  className,
}: {
  index: number;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute -right-2 -top-4 text-7xl font-bold text-slate-100"
        aria-hidden
      >
        {index + 1}
      </span>
      <div className="relative">
        <div className="mb-3 h-1 w-10 rounded-full bg-accent" aria-hidden />
        <h3 className="text-lg font-semibold text-navy">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </article>
  );
}
