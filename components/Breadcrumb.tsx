import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumb({
  items,
  inverted = false,
}: {
  items: { label: string; href?: string }[];
  inverted?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="container py-4">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1 text-sm",
          inverted ? "text-slate-400" : "text-slate-500",
        )}
      >
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 ? (
              <ChevronRight
                className={cn(
                  "h-4 w-4 shrink-0",
                  inverted ? "text-slate-500" : "text-slate-400",
                )}
                aria-hidden
              />
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "font-medium",
                  inverted
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-600 hover:text-navy",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn("font-medium", inverted ? "text-white" : "text-navy")}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
