import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function IndustryCard({
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
        "rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <Building2 className="mb-3 h-6 w-6 text-accent" aria-hidden />
      <h3 className="font-semibold text-navy">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-600">{description}</p>
    </article>
  );
}
