import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import type { ScreenId } from "./types";

const isWeb = Platform.OS === "web";

type NavHistoryState = { screen: ScreenId; history: ScreenId[] };

/** Simple stack navigation for the static AYA demo. On web, the stack is
 * mirrored into the browser's History API so the browser back/forward
 * buttons drive the same navigation as in-app back buttons. */
export function useAppNavigation(initial: ScreenId = "splash") {
  const [screen, setScreen] = useState<ScreenId>(initial);
  const [history, setHistory] = useState<ScreenId[]>([]);

  useEffect(() => {
    if (!isWeb) return;
    window.history.replaceState({ screen: initial, history: [] }, "");

    const onPopState = (e: PopStateEvent) => {
      const state = e.state as NavHistoryState | null;
      if (!state) return;
      setScreen(state.screen);
      setHistory(state.history);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = useCallback(
    (next: ScreenId) => {
      const nextHistory = [...history, screen];
      if (isWeb) {
        window.history.pushState({ screen: next, history: nextHistory } satisfies NavHistoryState, "");
      }
      setHistory(nextHistory);
      setScreen(next);
    },
    [screen, history],
  );

  const back = useCallback(() => {
    if (isWeb) {
      window.history.back();
      return;
    }
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setScreen(prev);
      return h.slice(0, -1);
    });
  }, []);

  const resetTo = useCallback((next: ScreenId) => {
    if (isWeb) {
      window.history.pushState({ screen: next, history: [] } satisfies NavHistoryState, "");
    }
    setHistory([]);
    setScreen(next);
  }, []);

  return { screen, go, back, resetTo };
}
