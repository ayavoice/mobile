import { useFonts } from "expo-font";
import { fontAssets } from "../theme";

/** Loads Sora + Nunito faces used across the app. */
export function useAppFonts() {
  return useFonts(fontAssets);
}
