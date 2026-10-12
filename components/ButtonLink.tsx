import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-[rgba(22,119,232,0.18)] hover:from-primary-hover hover:to-gold-hover hover:shadow-lg focus-visible:ring-primary",
  accent:
    "bg-accent text-white shadow-md shadow-[rgba(245,158,11,0.25)] hover:bg-gold-hover hover:shadow-lg focus-visible:ring-accent",
  secondary:
    "bg-accent text-white shadow-md shadow-[rgba(245,158,11,0.25)] hover:bg-gold-hover hover:shadow-lg focus-visible:ring-accent",
  outline:
    "border-2 border-accent bg-white/90 text-navy shadow-sm hover:bg-cream hover:shadow-md focus-visible:ring-accent",
  ghost: "text-navy hover:bg-cream hover:text-navy",
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
        "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
