"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { LogoBrand } from "@/components/LogoBrand";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

const INTRO_MS = 1900;
const NAV_INTRO_MS = 850;
const MORPH_MS = 1050;

type Phase = "intro" | "morph" | "done";

export function LogoPageTransition({
  brandAnchor,
  onTransitioning,
  onLanded,
}: {
  brandAnchor: HTMLAnchorElement | null;
  onTransitioning: (active: boolean) => void;
  onLanded: () => void;
}) {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [splashVariant, setSplashVariant] = useState<"full" | "quick">("full");
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [flyTransform, setFlyTransform] = useState("translate(-50%, -50%) scale(1)");
  const [flyPosition, setFlyPosition] = useState<React.CSSProperties>({
    position: "fixed",
    left: "50%",
    top: "44%",
    zIndex: 101,
  });
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const finish = () => {
    setVisible(false);
    setPhase("done");
    onTransitioning(false);
    onLanded();
    document.body.style.overflow = "";
  };

  const runSequence = (isInitial: boolean) => {
    clearTimers();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onTransitioning(false);
      setVisible(false);
      document.body.style.overflow = "";
      return;
    }

    const anchor = brandAnchor;
    if (!anchor) return;

    setSplashVariant(isInitial ? "full" : "quick");
    onTransitioning(true);
    setVisible(true);
    setPhase("intro");
    setOverlayOpacity(1);
    setFlyPosition({
      position: "fixed",
      left: "50%",
      top: "44%",
      zIndex: 101,
      transition: "none",
    });
    setFlyTransform("translate(-50%, -50%) scale(1)");
    document.body.style.overflow = "hidden";

    const introMs = isInitial ? INTRO_MS : NAV_INTRO_MS;

    schedule(() => {
      const target = brandAnchor;
      if (!target) {
        finish();
        return;
      }

      const rect = target.getBoundingClientRect();
      const startCenterX = window.innerWidth / 2;
      const startCenterY = window.innerHeight * 0.44;
      const endCenterX = rect.left + rect.width / 2;
      const endCenterY = rect.top + rect.height / 2;
      const dx = startCenterX - endCenterX;
      const dy = startCenterY - endCenterY;
      const scaleFrom = isInitial ? 1.15 : 1.05;

      setPhase("morph");
      setOverlayOpacity(0);

      setFlyPosition({
        position: "fixed",
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        zIndex: 101,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        transition: "none",
      });
      setFlyTransform(`translate(${dx}px, ${dy}px) scale(${scaleFrom})`);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlyTransform("translate(0, 0) scale(1)");
          setFlyPosition((prev) => ({
            ...prev,
            transition: `left ${MORPH_MS}ms cubic-bezier(0.22, 1, 0.36, 1), top ${MORPH_MS}ms cubic-bezier(0.22, 1, 0.36, 1), width ${MORPH_MS}ms cubic-bezier(0.22, 1, 0.36, 1), height ${MORPH_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }));
        });
      });
    }, introMs);

    schedule(finish, introMs + MORPH_MS + 120);
  };

  useEffect(() => {
    if (!mounted || !brandAnchor) return;

    const isInitial = prevPath.current === null;
    if (!isInitial && prevPath.current === pathname) return;

    prevPath.current = pathname;
    runSequence(isInitial);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pathname + anchor ready
  }, [pathname, mounted, brandAnchor]);

  if (!mounted || !visible) return null;

  const markAnim =
    phase === "intro" ? (splashVariant === "full" ? "intro" : "nav") : false;

  return createPortal(
    <>
      <div
        className={cn(
          "fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm transition-opacity duration-[900ms] ease-out",
          phase === "morph" && "pointer-events-none",
        )}
        style={{ opacity: overlayOpacity }}
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-logo-bg-drift absolute -left-24 top-[20%] h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="animate-logo-bg-drift-reverse absolute -right-20 bottom-[18%] h-72 w-72 rounded-full bg-gold-light/40 blur-3xl" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgb(22 119 232 / 0.12) 0%, transparent 55%)`,
          }}
        />
      </div>

      <div
        className="logo-fly-brand pointer-events-none will-change-transform"
        style={{
          ...flyPosition,
          transform: flyTransform,
          transition:
            phase === "morph"
              ? `transform ${MORPH_MS}ms cubic-bezier(0.34, 1.25, 0.64, 1)`
              : "none",
        }}
      >
        <div
          className={cn(
            phase === "intro" && splashVariant === "full" && "animate-logo-splash-float",
          )}
        >
          <LogoBrand
            layout={phase === "intro" ? "splash" : "header"}
            markSize={phase === "intro" ? (splashVariant === "full" ? 120 : 88) : 38}
            markAnimated={markAnim || false}
            showTagline={phase === "intro" || splashVariant === "full"}
          />
        </div>
      </div>

      {phase === "morph" ? (
        <div
          className="pointer-events-none fixed inset-0 z-[99] animate-logo-morph-flash"
          aria-hidden
        />
      ) : null}
    </>,
    document.body,
  );
}
