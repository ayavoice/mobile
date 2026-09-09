import { ViewStyle } from "react-native";

/** Shadows disabled across AYA — keep tokens flat for compatibility. */
export const shadows = {
  card: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } satisfies ViewStyle,

  mic: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } satisfies ViewStyle,

  soft: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } satisfies ViewStyle,
} as const;

export type ShadowToken = keyof typeof shadows;
