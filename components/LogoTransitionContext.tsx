"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LogoPageTransition } from "@/components/LogoPageTransition";

type LogoTransitionContextValue = {
  setBrandAnchor: (node: HTMLAnchorElement | null) => void;
  isTransitioning: boolean;
  justLanded: boolean;
};

const LogoTransitionContext = createContext<LogoTransitionContextValue | null>(null);

export function LogoTransitionProvider({ children }: { children: ReactNode }) {
  const [brandAnchor, setBrandAnchorState] = useState<HTMLAnchorElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [justLanded, setJustLanded] = useState(false);

  const setBrandAnchor = useCallback((node: HTMLAnchorElement | null) => {
    setBrandAnchorState(node);
  }, []);

  const value = useMemo(
    () => ({ setBrandAnchor, isTransitioning, justLanded }),
    [setBrandAnchor, isTransitioning, justLanded],
  );

  return (
    <LogoTransitionContext.Provider value={value}>
      <LogoPageTransition
        brandAnchor={brandAnchor}
        onTransitioning={setIsTransitioning}
        onLanded={() => {
          setJustLanded(true);
          window.setTimeout(() => setJustLanded(false), 600);
        }}
      />
      {children}
    </LogoTransitionContext.Provider>
  );
}

export function useLogoTransition() {
  const ctx = useContext(LogoTransitionContext);
  if (!ctx) {
    throw new Error("useLogoTransition must be used within LogoTransitionProvider");
  }
  return ctx;
}
