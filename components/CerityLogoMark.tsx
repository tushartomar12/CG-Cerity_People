"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type CerityLogoMarkProps = {
  size?: number;
  className?: string;
  /** true = first load, intro = splash, nav = page change */
  animated?: boolean | "intro" | "nav";
};

export function CerityLogoMark({
  size = 36,
  className,
  animated = false,
}: CerityLogoMarkProps) {
  const uid = useId().replace(/:/g, "");
  const bgId = `cerity-bg-${uid}`;
  const accentId = `cerity-accent-${uid}`;
  const isIntro = animated === "intro";
  const isNav = animated === "nav";
  const motion = animated === true || isIntro || isNav;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        animated === true && "animate-logo-mark-enter",
        isIntro && "animate-logo-mark-intro",
        isNav && "animate-logo-mark-nav",
        className,
      )}
      aria-hidden
    >
      <defs>
        <linearGradient id={bgId} x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f2744" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient
          id={accentId}
          x1="14"
          y1="16"
          x2="34"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill={`url(#${bgId})`}
        className={cn(isIntro && "animate-logo-bg-pulse")}
        style={{ transformOrigin: "center" }}
      />
      {isIntro ? (
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={`url(#${accentId})`}
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeDasharray="4 6"
          fill="none"
          className="animate-logo-orbit opacity-0 [animation-fill-mode:forwards]"
          style={{ transformOrigin: "24px 24px" }}
        />
      ) : null}
      {isNav ? (
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke={`url(#${accentId})`}
          strokeWidth="1.5"
          fill="none"
          className="animate-logo-nav-ring [animation-fill-mode:forwards]"
          style={{ transformOrigin: "24px 24px" }}
        />
      ) : null}
      <g
        className={cn(
          motion && "opacity-0 [animation-fill-mode:forwards]",
          isIntro && "animate-logo-lines-in intro-lines-delay",
          animated === true && "animate-logo-lines-in animation-delay-300",
          isNav && "animate-logo-lines-in nav-lines-delay",
        )}
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.55"
      >
        <line x1="18" y1="26" x2="24" y2="32" />
        <line x1="24" y1="32" x2="30" y2="26" />
        <line x1="30" y1="26" x2="18" y2="26" />
      </g>
      {[
        { cx: 18, cy: 26, delay: "animation-delay-400", navDelay: "animation-delay-100" },
        { cx: 24, cy: 32, delay: "animation-delay-500", navDelay: "animation-delay-180" },
        { cx: 30, cy: 26, delay: "animation-delay-600", navDelay: "animation-delay-260" },
      ].map((dot) => (
        <circle
          key={`${dot.cx}-${dot.cy}`}
          cx={dot.cx}
          cy={dot.cy}
          r="3"
          fill={`url(#${accentId})`}
          className={cn(
            motion && "logo-node [animation-fill-mode:forwards]",
            isIntro && "animate-logo-node-pop",
            animated === true && "animate-logo-node-pop",
            isNav && "animate-logo-node-pop-nav",
            motion && (isNav ? dot.navDelay : dot.delay),
          )}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
      <path
        d="M 32 17 A 11 11 0 1 0 32 31"
        stroke="white"
        strokeWidth="2.75"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        className={cn(
          motion && "logo-draw-stroke",
          isIntro && "animate-logo-stroke-draw intro-stroke-delay",
          animated === true && "animate-logo-stroke-draw",
          isNav && "animate-logo-stroke-draw-nav nav-stroke-delay",
        )}
      />
    </svg>
  );
}
