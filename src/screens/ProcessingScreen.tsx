import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { AppText, Icon, Screen } from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import { colors, radii, spacing } from "../theme";

type Props = { onDone: () => void };

export default function ProcessingScreen({ onDone }: Props) {
  const { flow, activeFlow } = useAppPrefs();
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    return () => clearTimeout(t);
  }, [onDone, spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const iconName =
    activeFlow === "airtime"
      ? "phone-portrait"
      : activeFlow === "balance"
        ? "wallet"
        : "paper-plane";

  return (
    <Screen background={colors.background}>
      <View style={styles.body}>
        <View style={styles.spinnerWrap}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Svg width={120} height={120} viewBox="0 0 120 120">
              <Circle cx={60} cy={60} r={52} fill="none" stroke="#F0F0F0" strokeWidth={8} />
              <Circle
                cx={60}
                cy={60}
                r={52}
                fill="none"
                stroke={colors.purple}
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray="326"
                strokeDashoffset="80"
              />
            </Svg>
          </Animated.View>
          <View style={styles.iconWrap}>
            <Icon name={iconName} size={36} color={colors.purple} />
          </View>
        </View>

        <View>
          <AppText variant="titleLG" align="center">
            Processing…
          </AppText>
          <AppText variant="bodyMD" align="center" style={styles.wait}>
            Please wait. Do not close the app.
          </AppText>
        </View>

        <View style={styles.summary}>
          <AppText variant="bodyXS" align="center" color={colors.textSubtle}>
            {flow.processingLabel}
          </AppText>
          <AppText variant="caption" align="center" style={styles.step}>
            {flow.processingStep}
          </AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["4xl"],
    paddingHorizontal: spacing["6xl"],
  },
  spinnerWrap: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  wait: {
    marginTop: spacing.md,
  },
  summary: {
    width: "100%",
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    gap: 6,
  },
  step: {
    marginTop: 4,
  },
});
