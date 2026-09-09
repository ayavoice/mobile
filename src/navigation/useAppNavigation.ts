import { useCallback, useState } from "react";
import type { ScreenId } from "./types";

/** Simple stack navigation for the static AYA demo. */
export function useAppNavigation(initial: ScreenId = "splash") {
  const [screen, setScreen] = useState<ScreenId>(initial);
  const [history, setHistory] = useState<ScreenId[]>([]);

  const go = useCallback((next: ScreenId) => {
    setHistory((h) => [...h, screen]);
    setScreen(next);
  }, [screen]);

  const back = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setScreen(prev);
      return h.slice(0, -1);
    });
  }, []);

  const resetTo = useCallback((next: ScreenId) => {
    setHistory([]);
    setScreen(next);
  }, []);

  return { screen, go, back, resetTo };
}
