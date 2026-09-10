import { Text, TextProps, StyleSheet } from "react-native";
import { typography, TypographyVariant, useColors } from "../../theme";
import type { Palette } from "../../theme";
import { useAppPrefsOptional } from "../../context/AppPrefs";

type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: string;
  align?: "left" | "center" | "right";
  /**
   * Marks this text as a page/section heading. On web this renders a real
   * `<h1>`-`<h6>` (via `role="heading"` + `aria-level`) so screen-reader users
   * can jump between headings; on native it sets the "header" accessibility
   * trait. Use exactly one `heading={1}` per screen.
   */
  heading?: 1 | 2 | 3 | 4 | 5 | 6;
};

// Sora has no glyph for the Cedi sign (₵) — browsers silently substitute a
// mismatched fallback font for just that character, which looks broken next
// to the surrounding bold digits. Render ₵ in the weight-matched Nunito cut
// instead, which does have the glyph.
const SORA_TO_NUNITO_CEDI: Record<string, string> = {
  "Sora-Regular": "Nunito-Regular",
  "Sora-Medium": "Nunito-Medium",
  "Sora-SemiBold": "Nunito-SemiBold",
  "Sora-Bold": "Nunito-Bold",
  "Sora-ExtraBold": "Nunito-ExtraBold",
};

function renderWithCediFix(text: string, soraFontFamily: string) {
  const cediFont = SORA_TO_NUNITO_CEDI[soraFontFamily];
  const parts = text.split("₵");
  return parts.map((part, i) => (
    <Text key={i}>
      {part}
      {i < parts.length - 1 ? <Text style={{ fontFamily: cediFont }}>₵</Text> : null}
    </Text>
  ));
}

function colorForVariant(variant: TypographyVariant, colors: Palette) {
  if (variant === "heroAmount") {
    return colors.textOnYellow;
  }
  if (
    variant === "heroBrand" ||
    variant === "overlineBrand" ||
    variant === "tagline"
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
  heading,
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

  const headingProps = heading
    ? {
        accessibilityRole: "header" as const,
        role: "heading" as const,
        "aria-level": heading,
      }
    : null;

  const soraFontFamily = typeof typeStyle.fontFamily === "string" ? typeStyle.fontFamily : null;
  const content =
    typeof children === "string" &&
    children.includes("₵") &&
    soraFontFamily &&
    soraFontFamily.startsWith("Sora")
      ? renderWithCediFix(children, soraFontFamily)
      : children;

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
      {...headingProps}
      {...rest}
    >
      {content}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
