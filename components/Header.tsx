"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  BrandBackground,
  type BrandBackgroundVariant,
} from "./BrandBackground";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

function headerMotif(pathname: string): {
  variant: BrandBackgroundVariant | null;
  compact: boolean;
  fill: "white" | "cream" | "navy";
} {
  if (pathname === "/contact" || pathname.startsWith("/contact/")) {
    return { variant: null, compact: false, fill: "navy" };
  }
  if (pathname === "/solutions" || pathname.startsWith("/solutions/")) {
    return { variant: "solutionsPage", compact: false, fill: "cream" };
  }
  if (pathname === "/hr-tech" || pathname.startsWith("/hr-tech/")) {
    return { variant: "hrTech", compact: true, fill: "white" };
  }
  if (pathname === "/consulting" || pathname.startsWith("/consulting/")) {
    return { variant: "consultingPage", compact: true, fill: "white" };
  }
  if (pathname === "/about" || pathname.startsWith("/about/")) {
    return { variant: "about", compact: false, fill: "white" };
  }
  if (pathname === "/") {
    return { variant: "hero", compact: false, fill: "white" };
  }
  if (pathname === "/assessment" || pathname.startsWith("/assessment/")) {
    return { variant: "hero", compact: false, fill: "white" };
  }
  return { variant: "default", compact: false, fill: "white" };
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isContact = pathname === "/contact" || pathname.startsWith("/contact/");
  const motif = headerMotif(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled && "overflow-hidden shadow-sm",
        scrolled && motif.fill === "navy" && "border-white/10 bg-navy/90 backdrop-blur-md",
        scrolled && motif.fill === "cream" && "border-slate-200/60 bg-cream",
        scrolled && motif.fill === "white" && "border-slate-200/60 bg-white",
        !scrolled && "border-transparent bg-transparent",
      )}
    >
      {scrolled && motif.variant ? (
        <BrandBackground variant={motif.variant} compact={motif.compact} />
      ) : null}
      <div className="container relative z-10 flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo inverted={isContact} />
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navLinks.filter((link) => !link.navHidden).map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  isContact
                    ? active
                      ? "bg-cream text-navy"
                      : "text-white hover:bg-white/10"
                    : active
                      ? "bg-cream text-navy"
                      : "text-navy hover:bg-cream/70",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" variant="accent" className="hidden px-5 py-2.5 sm:inline-flex">
            Book a Consultation
          </ButtonLink>
          <button
            type="button"
            className={cn(
              "inline-flex rounded-lg p-2 lg:hidden",
              isContact ? "text-white hover:bg-white/10" : "text-navy hover:bg-slate-100",
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
