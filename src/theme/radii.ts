/** Corner radii from the web AYA UI. */
export const radii = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
  "5xl": 36,
  "6xl": 40,
  pill: 20,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radii;
