/**
 * Font face map for expo-font.
 * Keys become React Native `fontFamily` values after loading.
 */
export const fontAssets = {
  "Sora-Regular": require("../../assets/fonts/Sora-Regular.ttf"),
  "Sora-Medium": require("../../assets/fonts/Sora-Medium.ttf"),
  "Sora-SemiBold": require("../../assets/fonts/Sora-SemiBold.ttf"),
  "Sora-Bold": require("../../assets/fonts/Sora-Bold.ttf"),
  "Sora-ExtraBold": require("../../assets/fonts/Sora-ExtraBold.ttf"),
  "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
  "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
  "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
  "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
  "Nunito-ExtraBold": require("../../assets/fonts/Nunito-ExtraBold.ttf"),
} as const;

export type FontFamily = keyof typeof fontAssets;

/** Display / UI labels — Sora (MTN MoMo-style geometric sans) */
export const fonts = {
  display: {
    regular: "Sora-Regular",
    medium: "Sora-Medium",
    semiBold: "Sora-SemiBold",
    bold: "Sora-Bold",
    extraBold: "Sora-ExtraBold",
    black: "Sora-ExtraBold",
  },
  /** Body / supporting copy — Nunito */
  body: {
    regular: "Nunito-Regular",
    medium: "Nunito-Medium",
    semiBold: "Nunito-SemiBold",
    bold: "Nunito-Bold",
    extraBold: "Nunito-ExtraBold",
  },
} as const;
