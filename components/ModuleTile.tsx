import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tileAccents = [
  "from-blue-500/10 to-blue-600/5 text-brand",
  "from-teal-500/10 to-teal-600/5 text-accent",
  "from-indigo-500/10 to-indigo-600/5 text-indigo-600",
  "from-sky-500/10 to-sky-600/5 text-sky-600",
] as const;

export function ModuleTile({
  title,
  description,
  index = 0,
  className,
}: {
  title: string;
  description: string;
  index?: number;
  className?: string;
}) {
  const accent = tileAccents[index % tileAccents.length];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg",
        className,
      )}
    >
      <div
        className={cn(
          "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br",
          accent,
        )}
      >
        <span className="text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="font-semibold text-navy">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
      <ArrowUpRight
        className="mt-4 h-4 w-4 text-slate-300 transition-colors group-hover:text-accent"
        aria-hidden
      />
    </article>
  );
}
