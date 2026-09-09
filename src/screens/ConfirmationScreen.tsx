import { useRef, useEffect } from "react";
import { Animated, Easing, ScrollView, StyleSheet, View } from "react-native";
import { AppText, Button, Icon, IconWell, Screen, ScreenFooter, ScreenHeader } from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import { colors, radii, spacing } from "../theme";

type Props = { onConfirm: () => void; onBack: () => void };

export default function ConfirmationScreen({ onConfirm, onBack }: Props) {
  const { flow, accessibility } = useAppPrefs();
  const waves = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    waves.forEach((val, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(val, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, [waves]);

  return (
    <Screen background={colors.white}>
      <ScreenHeader title="Confirm" onBack={onBack} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <AppText variant="bodySM" color={colors.textInverseMuted} align="center">
            {flow.confirmLead}
          </AppText>
          <AppText
            variant="heroAmount"
            align="center"
            style={styles.amount}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
          >
            {flow.confirmHero}
          </AppText>
          <AppText variant="heading" color={colors.textOnYellow} align="center" style={styles.to}>
            {flow.confirmTarget}
          </AppText>
          <AppText variant="bodySM" color={colors.textInverseMuted} align="center">
            {flow.confirmMeta}
          </AppText>
        </View>

        <View style={styles.speak}>
          <IconWell backgroundColor={colors.successSurface} size={44} radius={12}>
            <Icon name="volume-high" size={22} color={colors.successDark} />
          </IconWell>
          <View style={styles.textFlex}>
            <AppText variant="labelSM">
              {accessibility.voiceFirst
                ? "Aya is reading this aloud"
                : "Review before you continue"}
            </AppText>
            <AppText variant="caption">
              {accessibility.captions
                ? "Live captions on"
                : "Turn on captions in Accessibility"}
            </AppText>
          </View>
          {accessibility.voiceFirst ? (
            <View style={styles.bars}>
              {[16, 28, 22, 18].map((h, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.bar,
                    {
                      height: h,
                      transform: [
                        {
                          scaleY: waves[i].interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.6],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              ))}
            </View>
          ) : null}
        </View>

        {accessibility.captions ? (
          <View style={styles.caption}>
            <AppText variant="overline">Caption</AppText>
            <AppText variant="bodySM" style={styles.captionText}>
              {flow.readAloud}
            </AppText>
          </View>
        ) : null}

        <View style={styles.lock}>
          <Icon name="lock-closed" size={22} color={colors.text} />
          <AppText variant="bodySM" style={styles.lockText}>
            Next: private device authentication. Microphone will turn OFF. Never speak your MoMo PIN.
          </AppText>
        </View>
      </ScrollView>

      <ScreenFooter>
        <Button onPress={onConfirm}>Continue</Button>
        <Button onPress={onBack} variant="ghost">
          Cancel
        </Button>
      </ScreenFooter>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    minHeight: 0,
  },
  body: {
    paddingHorizontal: spacing.screenX,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    alignItems: "center",
  },
  hero: {
    width: "100%",
    borderRadius: radii["4xl"],
    backgroundColor: colors.purple,
    paddingVertical: spacing["4xl"],
    paddingHorizontal: spacing["3xl"],
    marginBottom: spacing["2xl"],
  },
  amount: {
    marginTop: spacing.sm,
  },
  to: {
    marginTop: spacing.md,
  },
  speak: {
    width: "100%",
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: spacing.lg,
  },
  textFlex: {
    flex: 1,
    minWidth: 0,
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  bar: {
    width: 3,
    borderRadius: 3,
    backgroundColor: colors.purple,
  },
  caption: {
    width: "100%",
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  captionText: {
    marginTop: spacing.sm,
    color: colors.text,
  },
  lock: {
    width: "100%",
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  lockText: {
    flex: 1,
    color: colors.textSecondary,
  },
});
