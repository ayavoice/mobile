import { useMemo } from "react";
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from "react-native";
import type { Palette } from "./colors";
import { useColors } from "./ThemeContext";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function usePaletteStyles<T extends NamedStyles<T>>(
  factory: (colors: Palette) => T | NamedStyles<T>,
): T {
  const colors = useColors();
  return useMemo(() => StyleSheet.create(factory(colors)) as T, [colors]);
}
