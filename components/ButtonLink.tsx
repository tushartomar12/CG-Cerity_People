import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-md shadow-teal-900/15 hover:bg-teal-700 hover:shadow-lg focus-visible:ring-accent",
  secondary:
    "bg-navy text-white shadow-md shadow-navy/20 hover:bg-slate-900 hover:shadow-lg focus-visible:ring-navy",
  outline:
    "border border-slate-200 bg-white text-navy shadow-sm hover:border-brand/30 hover:bg-blue-50/50 hover:shadow-md",
  ghost: "text-navy hover:bg-slate-100",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
