import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getFlowContent,
  type AppLanguage,
  type FlowContent,
  type FlowId,
} from "../content/flows";

export type AccessibilityPrefs = {
  voiceFirst: boolean;
  largeText: boolean;
  highContrast: boolean;
  haptics: boolean;
  captions: boolean;
  screenReader: boolean;
  textSize: 1 | 2 | 3;
  speechSpeed: 1 | 2 | 3;
};

type AppPrefsValue = {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  accessibility: AccessibilityPrefs;
  setAccessibility: (
    patch: Partial<AccessibilityPrefs> | ((prev: AccessibilityPrefs) => AccessibilityPrefs),
  ) => void;
  activeFlow: FlowId;
  setActiveFlow: (flow: FlowId) => void;
  flow: FlowContent;
  textScale: number;
  highContrast: boolean;
};

const DEFAULT_A11Y: AccessibilityPrefs = {
  voiceFirst: true,
  largeText: true,
  highContrast: false,
  haptics: true,
  captions: true,
  screenReader: false,
  textSize: 2,
  speechSpeed: 2,
};

const AppPrefsContext = createContext<AppPrefsValue | null>(null);

export function AppPrefsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>("tw");
  const [accessibility, setAccessibilityState] =
    useState<AccessibilityPrefs>(DEFAULT_A11Y);
  const [activeFlow, setActiveFlow] = useState<FlowId>("transfer");

  const setAccessibility = useCallback(
    (
      patch:
        | Partial<AccessibilityPrefs>
        | ((prev: AccessibilityPrefs) => AccessibilityPrefs),
    ) => {
      setAccessibilityState((prev) =>
        typeof patch === "function" ? patch(prev) : { ...prev, ...patch },
      );
    },
    [],
  );

  const flow = useMemo(
    () => getFlowContent(activeFlow, language),
    [activeFlow, language],
  );

  const textScale = accessibility.largeText
    ? accessibility.textSize === 1
      ? 1
      : accessibility.textSize === 3
        ? 1.22
        : 1.1
    : accessibility.textSize === 3
      ? 1.12
      : 1;

  const value = useMemo<AppPrefsValue>(
    () => ({
      language,
      setLanguage,
      accessibility,
      setAccessibility,
      activeFlow,
      setActiveFlow,
      flow,
      textScale,
      highContrast: accessibility.highContrast,
    }),
    [
      language,
      accessibility,
      setAccessibility,
      activeFlow,
      flow,
      textScale,
    ],
  );

  return (
    <AppPrefsContext.Provider value={value}>{children}</AppPrefsContext.Provider>
  );
}

export function useAppPrefs() {
  const ctx = useContext(AppPrefsContext);
  if (!ctx) {
    throw new Error("useAppPrefs must be used within AppPrefsProvider");
  }
  return ctx;
}

/** Safe outside provider (e.g. boot splash). */
export function useAppPrefsOptional() {
  return useContext(AppPrefsContext);
}
