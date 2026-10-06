import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="container py-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 ? (
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="font-medium text-slate-600 hover:text-navy"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-navy" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
