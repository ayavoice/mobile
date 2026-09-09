/**
 * AYA palettes — light and dark follow the system appearance.
 * Keep token names in sync so screens can switch without layout changes.
 */

export const lightColors = {
  yellow: "#FFCC08",
  purple: "#FFCC08",
  dark: "#1B1433",
  white: "#FFFFFF",

  background: "#FFFFFF",
  backgroundMuted: "#FAFAFC",
  surface: "#FFFFFF",
  surfaceCard: "#F6F5FB",
  surfaceGhost: "#F3F2F8",
  surfaceYellow: "#FFF6D9",
  surfaceWarning: "#FFF4E8",
  surfaceWarningSoft: "#FFF7EE",

  border: "#F0EEF6",
  borderMuted: "#F3F2F8",
  borderSoft: "#F6F5FB",
  divider: "transparent",

  text: "#111111",
  textSecondary: "#5C5C66",
  textMuted: "#7A7A85",
  textSubtle: "#8E8E99",
  textInverse: "#FFFFFF",
  textInverseMuted: "rgba(0,0,0,0.65)",
  textOnYellow: "#000000",

  success: "#2E7D32",
  successDark: "#1B5E20",
  successMid: "#388E3C",
  successBright: "#4CAF50",
  successSurface: "#EAF7EC",

  danger: "#D32F2F",
  dangerDark: "#8A1F1F",
  dangerSurface: "#FDECEC",
  dangerSurfaceSoft: "#FAD9D9",
  dangerOnDark: "#FFD6D6",

  warning: "#F5A524",
  warningDark: "#8A5A10",
  warningText: "#6B4508",

  washGreen: "#EAF7EC",
  washYellow: "#FFF6D9",
  washPurple: "#FFF6D9",
  washBlue: "#E8F1FF",
  washRed: "#FDECEC",

  overlayYellow: "rgba(255,204,8,0.18)",
  overlayYellowSoft: "rgba(255,204,8,0.10)",
  overlayYellowMid: "rgba(255,204,8,0.14)",
  overlayWhite: "rgba(255,255,255,0.1)",
  overlayWhiteMuted: "rgba(255,255,255,0.35)",
  overlayDark: "rgba(0,0,0,0.28)",

  toggleOff: "#D8D6E2",
  trackIdle: "#E4E2EE",
} as const;

export const darkColors: { [K in keyof typeof lightColors]: string } = {
  yellow: "#FFCC08",
  purple: "#FFCC08",
  dark: "#07060C",
  white: "#FFFFFF",

  background: "#0B0A10",
  backgroundMuted: "#121018",
  surface: "#14121C",
  surfaceCard: "#1C1928",
  surfaceGhost: "#242132",
  surfaceYellow: "#3A3218",
  surfaceWarning: "#2C2318",
  surfaceWarningSoft: "#2A241C",

  border: "#2A2736",
  borderMuted: "#242132",
  borderSoft: "#1C1928",
  divider: "transparent",

  text: "#F5F4FA",
  textSecondary: "#C5C2D1",
  textMuted: "#9B98A8",
  textSubtle: "#7E7B8C",
  textInverse: "#FFFFFF",
  textInverseMuted: "rgba(0,0,0,0.6)",
  textOnYellow: "#000000",

  success: "#81C784",
  successDark: "#A5D6A7",
  successMid: "#66BB6A",
  successBright: "#81C784",
  successSurface: "#16301C",

  danger: "#EF9A9A",
  dangerDark: "#FFCDD2",
  dangerSurface: "#3A1818",
  dangerSurfaceSoft: "#4A2020",
  dangerOnDark: "#FFD6D6",

  warning: "#FFB74D",
  warningDark: "#FFCC80",
  warningText: "#FFE0B2",

  washGreen: "#16301C",
  washYellow: "#3A3218",
  washPurple: "#3A3218",
  washBlue: "#182338",
  washRed: "#3A1818",

  overlayYellow: "rgba(255,204,8,0.26)",
  overlayYellowSoft: "rgba(255,204,8,0.14)",
  overlayYellowMid: "rgba(255,204,8,0.20)",
  overlayWhite: "rgba(255,255,255,0.08)",
  overlayWhiteMuted: "rgba(255,255,255,0.28)",
  overlayDark: "rgba(0,0,0,0.45)",

  toggleOff: "#3A3648",
  trackIdle: "#3A3648",
};

/** Default (light) snapshot — prefer `useColors()` so UI follows the system. */
export const colors = lightColors;

export type ColorToken = keyof typeof lightColors;
export type Palette = { [K in ColorToken]: string };
