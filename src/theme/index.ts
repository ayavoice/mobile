import { colors } from "./colors";
import type { ColorToken, Palette } from "./colors";
import { fonts, fontAssets } from "./fonts";
import { typography } from "./typography";
import type { TypographyVariant } from "./typography";
import { spacing } from "./spacing";
import { radii } from "./radii";
import { shadows } from "./shadows";
import { ThemeProvider, useTheme, useColors } from "./ThemeContext";
import { usePaletteStyles } from "./usePaletteStyles";

export const theme = {
  colors,
  fonts,
  fontAssets,
  typography,
  spacing,
  radii,
  shadows,
} as const;

export type Theme = typeof theme;

export {
  colors,
  fonts,
  fontAssets,
  typography,
  spacing,
  radii,
  shadows,
  ThemeProvider,
  useTheme,
  useColors,
  usePaletteStyles,
};

export type { TypographyVariant, ColorToken, Palette };
export type { FontFamily } from "./fonts";
export type { SpacingToken } from "./spacing";
export type { RadiusToken } from "./radii";
export type { ShadowToken } from "./shadows";
