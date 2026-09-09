/** Spacing scale aligned with the web app's 8px rhythm. */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
  "5xl": 40,
  "6xl": 48,
  screenX: 24,
  screenY: 32,
} as const;

export type SpacingToken = keyof typeof spacing;
