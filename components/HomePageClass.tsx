"use client";

import { useEffect } from "react";

/** Turns off the fixed body photo on routes that use scrolling section motifs. */
export function HomePageClass({ name = "home-page" }: { name?: string }) {
  useEffect(() => {
    document.body.classList.add(name);
    return () => {
      document.body.classList.remove(name);
    };
  }, [name]);

  return null;
}
