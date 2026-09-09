import { ReactNode } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing, useColors } from "../../theme";
import { lightColors } from "../../theme/colors";
import { useAppPrefsOptional } from "../../context/AppPrefs";

type ScreenProps = {
  children: ReactNode;
  background?: string;
  scroll?: boolean;
  padded?: boolean;
  safeBottom?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export default function Screen({
  children,
  background,
  scroll = false,
  padded = false,
  safeBottom = true,
  style,
  contentStyle,
}: ScreenProps) {
  const colors = useColors();
  const prefs = useAppPrefsOptional();
  const highContrast = prefs?.highContrast ?? false;

  const pageBg =
    !background ||
    background === lightColors.white ||
    background === lightColors.background
      ? colors.background
      : background === lightColors.backgroundMuted
        ? colors.backgroundMuted
        : background;

  const resolvedBg = highContrast ? colors.background : pageBg;

  const padStyle = padded ? { paddingHorizontal: spacing.screenX } : undefined;

  const edges =
    Platform.OS === "web"
      ? []
      : safeBottom
        ? (["top", "left", "right", "bottom"] as const)
        : (["top", "left", "right"] as const);

  const body = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.scrollContent, padStyle, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, padStyle, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: resolvedBg }, style]}
      edges={[...edges]}
    >
      {body}
    </SafeAreaView>
  );
}

export function ScreenFooter({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: spacing.screenX,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: spacing.md,
    flexShrink: 0,
  },
});
