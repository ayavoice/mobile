/**
 * AYA palettes — light and dark follow the system appearance.
 * Keep token names in sync so screens can switch without layout changes.
 */

export const lightColors = {
  yellow: "#6D4AFF",
  purple: "#6D4AFF",
  dark: "#1B1433",
  white: "#FFFFFF",

  background: "#FFFFFF",
  backgroundMuted: "#FAFAFC",
  surface: "#FFFFFF",
  surfaceCard: "#F6F5FB",
  surfaceGhost: "#F3F2F8",
  surfaceYellow: "#F3F0FF",
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
  textInverseMuted: "rgba(255,255,255,0.72)",
  textOnYellow: "#FFFFFF",

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
  washYellow: "#F3F0FF",
  washPurple: "#EDE8FF",
  washBlue: "#E8F1FF",
  washRed: "#FDECEC",

  overlayYellow: "rgba(109,74,255,0.16)",
  overlayYellowSoft: "rgba(109,74,255,0.08)",
  overlayYellowMid: "rgba(109,74,255,0.12)",
  overlayWhite: "rgba(255,255,255,0.1)",
  overlayWhiteMuted: "rgba(255,255,255,0.35)",
  overlayDark: "rgba(0,0,0,0.28)",

  toggleOff: "#D8D6E2",
  trackIdle: "#E4E2EE",
} as const;

export const darkColors: { [K in keyof typeof lightColors]: string } = {
  yellow: "#8B74FF",
  purple: "#8B74FF",
  dark: "#07060C",
  white: "#FFFFFF",

  background: "#0B0A10",
  backgroundMuted: "#121018",
  surface: "#14121C",
  surfaceCard: "#1C1928",
  surfaceGhost: "#242132",
  surfaceYellow: "#2A2440",
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
  textInverseMuted: "rgba(255,255,255,0.62)",
  textOnYellow: "#FFFFFF",

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
  washYellow: "#2A2440",
  washPurple: "#2A2440",
  washBlue: "#182338",
  washRed: "#3A1818",

  overlayYellow: "rgba(139,116,255,0.22)",
  overlayYellowSoft: "rgba(139,116,255,0.12)",
  overlayYellowMid: "rgba(139,116,255,0.18)",
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
