import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ServiceCard({
  title,
  description,
  href,
  className,
}: {
  title: string;
  description: string;
  href?: string;
  className?: string;
}) {
  const inner = (
    <>
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-navy via-brand to-accent opacity-80"
        aria-hidden
      />
      <h3 className="text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
      {href ? (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">
          Learn more
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      ) : null}
    </>
  );

  const classes = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(8,32,56,0.08)] bg-white p-6 shadow-sm shadow-[rgba(8,32,56,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return <article className={classes}>{inner}</article>;
}
