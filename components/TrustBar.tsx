import { BrandBackground } from "@/components/BrandBackground";
import { cn } from "@/lib/utils";

function LogoMark({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-navy"
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function TrustBar({
  logos,
  className,
}: {
  logos: readonly string[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-slate-200/80 py-10 sm:py-12",
        className,
      )}
      aria-label="Trusted by"
    >
      <BrandBackground variant="trust" />
      <div className="container relative">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Trusted by growing businesses
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((name) => (
            <li
              key={name}
              className="flex items-center gap-3 rounded-xl border border-[rgba(8,32,56,0.08)] bg-soft-white/80 px-4 py-3 transition-colors hover:border-primary/25 hover:bg-white hover:shadow-sm"
            >
              <LogoMark name={name} />
              <span className="text-sm font-semibold text-slate-600">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
