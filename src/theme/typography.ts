import { TextStyle } from "react-native";
import { colors } from "./colors";
import { fonts } from "./fonts";

/**
 * Typography scale for the AYA design
 * (Sora for headings/UI, Nunito for body).
 */
export const typography = {
  heroBrand: {
    fontFamily: fonts.display.black,
    fontSize: 52,
    lineHeight: 60,
    letterSpacing: -2,
    color: colors.textInverse,
  } satisfies TextStyle,

  heroAmount: {
    fontFamily: fonts.display.black,
    fontSize: 56,
    letterSpacing: -2,
    lineHeight: 60,
    color: colors.textOnYellow,
  } satisfies TextStyle,

  displayXL: {
    fontFamily: fonts.display.black,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -2,
    color: colors.text,
  } satisfies TextStyle,

  displayLG: {
    fontFamily: fonts.display.black,
    fontSize: 38,
    lineHeight: 46,
    letterSpacing: -1,
    color: colors.text,
  } satisfies TextStyle,

  displayMD: {
    fontFamily: fonts.display.extraBold,
    fontSize: 34,
    lineHeight: 40,
    color: colors.text,
  } satisfies TextStyle,

  titleLG: {
    fontFamily: fonts.display.extraBold,
    fontSize: 30,
    lineHeight: 36,
    color: colors.text,
  } satisfies TextStyle,

  titleMD: {
    fontFamily: fonts.display.extraBold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.text,
  } satisfies TextStyle,

  titleSM: {
    fontFamily: fonts.display.extraBold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.text,
  } satisfies TextStyle,

  heading: {
    fontFamily: fonts.display.bold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.text,
  } satisfies TextStyle,

  headingSM: {
    fontFamily: fonts.display.bold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.text,
  } satisfies TextStyle,

  labelLG: {
    fontFamily: fonts.display.bold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.3,
    color: colors.text,
  } satisfies TextStyle,

  labelMD: {
    fontFamily: fonts.display.bold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.text,
  } satisfies TextStyle,

  labelSM: {
    fontFamily: fonts.display.bold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.text,
  } satisfies TextStyle,

  labelXS: {
    fontFamily: fonts.display.bold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.text,
  } satisfies TextStyle,

  button: {
    fontFamily: fonts.display.bold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.3,
    color: colors.text,
  } satisfies TextStyle,

  bodyLG: {
    fontFamily: fonts.body.regular,
    fontSize: 18,
    lineHeight: 28,
    color: colors.textSecondary,
  } satisfies TextStyle,

  bodyMD: {
    fontFamily: fonts.body.regular,
    fontSize: 17,
    lineHeight: 26,
    color: colors.textSecondary,
  } satisfies TextStyle,

  body: {
    fontFamily: fonts.body.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  } satisfies TextStyle,

  bodySM: {
    fontFamily: fonts.body.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  } satisfies TextStyle,

  bodyXS: {
    fontFamily: fonts.body.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSubtle,
  } satisfies TextStyle,

  caption: {
    fontFamily: fonts.body.semiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSubtle,
  } satisfies TextStyle,

  overline: {
    fontFamily: fonts.body.medium,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.textSubtle,
  } satisfies TextStyle,

  overlineBrand: {
    fontFamily: fonts.body.medium,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: colors.textInverseMuted,
  } satisfies TextStyle,

  tab: {
    fontFamily: fonts.body.semiBold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.textSubtle,
  } satisfies TextStyle,

  amount: {
    fontFamily: fonts.display.bold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.text,
  } satisfies TextStyle,

  tagline: {
    fontFamily: fonts.body.bold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.textInverse,
  } satisfies TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
