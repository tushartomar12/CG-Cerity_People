"use client";

import Link from "next/link";
import { LogoBrand } from "@/components/LogoBrand";
import { useLogoTransition } from "@/components/LogoTransitionContext";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const { setBrandAnchor, isTransitioning, justLanded } = useLogoTransition();

  return (
    <Link
      ref={setBrandAnchor}
      href="/"
      className={cn(
        "group outline-none transition-all duration-500 ease-out",
        isTransitioning && "pointer-events-none invisible",
        !isTransitioning && "visible opacity-100",
        justLanded && "animate-logo-header-land",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <LogoBrand
        layout="header"
        showTagline
        inverted={inverted}
        className="transition-transform duration-300 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
      />
    </Link>
  );
}
