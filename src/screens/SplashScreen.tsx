import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText, BrandLogo } from "../components/ui";
import { spacing, useColors } from "../theme";

type Props = { onNext: () => void };

export default function SplashScreen({ onNext }: Props) {
  const insets = useSafeAreaInsets();
  const colors = useColors();

  useEffect(() => {
    const t = setTimeout(onNext, 2600);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <Pressable
      style={[
        styles.root,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colors.background,
        },
      ]}
      onPress={onNext}
      accessibilityRole="button"
      accessibilityLabel="Continue to Aya"
    >
      <BrandLogo height={92} />

      <AppText variant="overlineBrand" align="center" color={colors.textSubtle}>
        Voice enabled finance
      </AppText>

      <AppText variant="tagline" align="center" color={colors.text} style={styles.tagline}>
        {"Your money.\nYour language.\nYour independence."}
      </AppText>

      <View style={[styles.dots, { bottom: Math.max(insets.bottom, 16) + 24 }]}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === 0
                ? { width: 28, backgroundColor: colors.purple }
                : { width: 8, backgroundColor: colors.trackIdle },
            ]}
          />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["3xl"],
    paddingHorizontal: spacing["5xl"],
  },
  tagline: {
    opacity: 0.92,
  },
  dots: {
    position: "absolute",
    flexDirection: "row",
    gap: spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
