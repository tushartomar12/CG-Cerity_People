import Link from "next/link";
import { cn } from "@/lib/utils";

export type PlanComparisonRow = {
  feature: string;
  basic: boolean;
  executive: boolean;
  professional: boolean;
};

const COLUMNS = [
  {
    key: "basic" as const,
    name: "Basic",
    eyebrow: "For growing teams",
    featured: false,
  },
  {
    key: "executive" as const,
    name: "Executive",
    eyebrow: "Most Popular",
    featured: true,
  },
  {
    key: "professional" as const,
    name: "Professional",
    eyebrow: "For complex needs",
    featured: false,
  },
];

function Mark({ on, featured }: { on: boolean; featured?: boolean }) {
  if (!on) {
    return <span className="text-[15px] font-medium text-[rgba(8,32,56,0.28)]">—</span>;
  }
  return (
    <span
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold",
        featured
          ? "bg-gold text-white shadow-[0_6px_16px_rgba(245,158,11,0.28)]"
          : "bg-gold/15 text-gold",
      )}
      aria-label="Included"
    >
      ✓
    </span>
  );
}

export function PlanComparisonTable({ rows }: { rows: PlanComparisonRow[] }) {
  return (
    <div className="mt-12 w-full">
      {/* Desktop — overlay glass columns */}
      <div className="relative hidden pt-3 md:block">
        <div
          className="pointer-events-none absolute inset-0 grid grid-cols-[minmax(200px,1.35fr)_1fr_1fr_1fr] gap-x-3 lg:gap-x-4"
          aria-hidden
        >
          <div />
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className={cn(
                "h-full rounded-[22px] border backdrop-blur-xl",
                col.featured
                  ? "-translate-y-2 border-gold/35 bg-cream/55 shadow-[0_22px_50px_rgba(245,158,11,0.14)]"
                  : "border-white/60 bg-white/50 shadow-[0_12px_36px_rgba(8,32,56,0.06)]",
              )}
            />
          ))}
        </div>

        <div className="relative grid grid-cols-[minmax(200px,1.35fr)_1fr_1fr_1fr] gap-x-3 lg:gap-x-4">
          <div className="flex items-end pb-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[rgba(8,32,56,0.45)]">
              Capabilities
            </span>
          </div>
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className={cn(
                "relative flex flex-col items-center justify-end px-3 pb-4 pt-7 text-center",
                col.featured && "pt-9",
              )}
            >
              {col.featured ? (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_6px_16px_rgba(245,158,11,0.35)]">
                  Most Popular
                </span>
              ) : null}
              <p
                className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.18em]",
                  col.featured ? "text-gold" : "text-[rgba(8,32,56,0.45)]",
                )}
              >
                {col.eyebrow}
              </p>
              <h4 className="mt-1.5 text-lg font-semibold tracking-tight text-navy">{col.name}</h4>
            </div>
          ))}

          {rows.map((item, index) => (
            <div key={item.feature} className="contents">
              <div
                className={cn(
                  "flex items-center border-b border-dashed border-[rgba(245,158,11,0.28)] py-3.5 pr-3",
                  index === rows.length - 1 && "border-transparent",
                )}
              >
                <span className="text-sm font-semibold leading-6 text-navy sm:text-[15px]">
                  {item.feature}
                </span>
              </div>
              {COLUMNS.map((col) => (
                <div
                  key={`${col.key}-${item.feature}`}
                  className={cn(
                    "flex items-center justify-center border-b border-dashed py-3.5",
                    col.featured ? "border-[rgba(245,158,11,0.22)]" : "border-[rgba(8,32,56,0.08)]",
                    index === rows.length - 1 && "border-transparent",
                  )}
                >
                  <Mark on={item[col.key]} featured={col.featured} />
                </div>
              ))}
            </div>
          ))}

          <div />
          {COLUMNS.map((col) => (
            <div key={`${col.key}-cta`} className="px-3 pb-5 pt-4">
              <Link
                href="/contact"
                className={cn(
                  "flex items-center justify-center rounded-full px-3 py-2.5 text-center text-[12px] font-bold transition-colors",
                  col.featured
                    ? "bg-gold text-white shadow-[0_8px_20px_rgba(245,158,11,0.28)] hover:bg-gold-hover"
                    : "border border-gold/40 bg-white/40 text-navy hover:bg-cream",
                )}
              >
                Talk to an Expert
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="mb-4 grid grid-cols-3 gap-2">
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className={cn(
                "rounded-xl border px-1.5 py-3 text-center backdrop-blur-xl",
                col.featured
                  ? "border-gold/35 bg-cream/60"
                  : "border-white/60 bg-white/50",
              )}
            >
              {col.featured ? (
                <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.12em] text-gold">
                  Popular
                </p>
              ) : null}
              <p className="text-[11px] font-bold text-navy">{col.name}</p>
            </div>
          ))}
        </div>

        <ul className="space-y-3">
          {rows.map((item) => (
            <li
              key={item.feature}
              className="rounded-2xl border border-white/60 bg-white/40 px-4 py-4 backdrop-blur-xl"
            >
              <p className="text-[13px] font-semibold leading-5 text-navy">{item.feature}</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {COLUMNS.map((col) => (
                  <div
                    key={col.key}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl border py-2.5",
                      col.featured
                        ? "border-gold/25 bg-cream/50"
                        : "border-white/70 bg-white/50",
                    )}
                  >
                    <p
                      className={cn(
                        "mb-1.5 text-[8px] font-bold uppercase tracking-[0.1em]",
                        col.featured ? "text-gold" : "text-[rgba(8,32,56,0.45)]",
                      )}
                    >
                      {col.name}
                    </p>
                    <Mark on={item[col.key]} featured={col.featured} />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {COLUMNS.map((col) => (
            <Link
              key={col.key}
              href="/contact"
              className={cn(
                "rounded-full px-2 py-2.5 text-center text-[10px] font-bold",
                col.featured
                  ? "bg-gold text-white"
                  : "border border-gold/35 bg-white/50 text-navy",
              )}
            >
              Talk to an Expert
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
