import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModuleCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-navy">
        <Layers className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <h3 className="font-semibold text-navy">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </article>
  );
}
