import { Text, TextProps, StyleSheet } from "react-native";
import { typography, TypographyVariant, useColors } from "../../theme";
import type { Palette } from "../../theme";
import { useAppPrefsOptional } from "../../context/AppPrefs";

type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: string;
  align?: "left" | "center" | "right";
};

function colorForVariant(variant: TypographyVariant, colors: Palette) {
  if (
    variant === "heroBrand" ||
    variant === "overlineBrand" ||
    variant === "tagline" ||
    variant === "heroAmount"
  ) {
    return colors.text;
  }
  if (
    variant.startsWith("body") ||
    variant === "caption" ||
    variant === "overline" ||
    variant === "tab"
  ) {
    return colors.textSecondary;
  }
  return colors.text;
}

export default function AppText({
  variant = "body",
  color,
  align,
  style,
  children,
  ...rest
}: AppTextProps) {
  const colors = useColors();
  const prefs = useAppPrefsOptional();
  const textScale = prefs?.textScale ?? 1;
  const highContrast = prefs?.highContrast ?? false;

  const base = typography[variant] as {
    fontSize?: number;
    lineHeight?: number;
    color?: string;
    [key: string]: unknown;
  };
  const { color: _ignored, ...typeStyle } = base;
  const scaled =
    textScale !== 1 && typeof base.fontSize === "number"
      ? {
          fontSize: Math.round(base.fontSize * textScale),
          lineHeight:
            typeof base.lineHeight === "number"
              ? Math.round(base.lineHeight * textScale)
              : undefined,
        }
      : null;

  const resolvedColor =
    color ??
    (highContrast &&
    (variant.startsWith("body") ||
      variant === "caption" ||
      variant === "overline" ||
      variant === "tab")
      ? colors.text
      : colorForVariant(variant, colors));

  return (
    <Text
      style={[
        styles.base,
        typeStyle,
        scaled,
        { color: resolvedColor },
        align ? { textAlign: align } : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
