import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { AppText, Button, Icon, IconWell, Screen, ScreenFooter, ScreenHeader } from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import { colors, radii, spacing } from "../theme";

type Props = { onBack: () => void };

export default function BalanceScreen({ onBack }: Props) {
  const { flow } = useAppPrefs();
  const [revealed, setRevealed] = useState(false);
  const amount = flow.successAmount ?? "$2648.34";

  return (
    <Screen background={colors.white}>
      <ScreenHeader title="Balance" onBack={onBack} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.thread}>
          <View style={styles.messageCard}>
            <View style={styles.metaRow}>
              <IconWell backgroundColor={colors.washPurple} size={36} radius={12}>
                <Icon name="mic" size={18} color={colors.purple} />
              </IconWell>
              <View style={styles.flex}>
                <AppText variant="labelXS">You said</AppText>
                <AppText variant="caption">{flow.utterance.languageLabel}</AppText>
              </View>
              <View style={styles.chip}>
                <AppText variant="caption" color={colors.purple}>
                  Voice
                </AppText>
              </View>
            </View>
            <AppText variant="headingSM" style={styles.quote}>
              {flow.utterance.transcript}
            </AppText>
            <AppText variant="bodyXS" style={styles.gloss}>
              {flow.utterance.gloss}
            </AppText>
          </View>

          <View style={styles.messageCard}>
            <View style={styles.metaRow}>
              <IconWell backgroundColor={colors.washPurple} size={36} radius={12}>
                <Icon name="volume-high" size={18} color={colors.purple} />
              </IconWell>
              <AppText variant="labelXS" color={colors.purple}>
                Aya
              </AppText>
            </View>
            <AppText variant="body" color={colors.text} style={styles.ayaLine}>
              {`Your current balance is ${amount}`}
            </AppText>
          </View>
        </View>

        <View style={styles.wallet}>
          <AppText variant="caption" color={colors.textInverseMuted}>
            Your balance
          </AppText>
          <AppText
            variant="displayLG"
            color={colors.white}
            style={styles.amount}
            accessibilityLiveRegion="polite"
          >
            {revealed ? amount : "••••••"}
          </AppText>

          <Pressable
            onPress={() => setRevealed((v) => !v)}
            style={styles.reveal}
            accessibilityRole="button"
            accessibilityLabel={revealed ? "Hide balance" : "Reveal balance"}
            accessibilityState={{ selected: revealed }}
          >
            <Icon
              name={revealed ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={colors.purple}
            />
            <AppText variant="labelXS" color={colors.purple}>
              {revealed ? "Hide balance" : "Reveal balance"}
            </AppText>
          </Pressable>

          <AppText variant="caption" color={colors.textInverseMuted} style={styles.asOf}>
            {flow.successSubtitle}
          </AppText>
        </View>
      </ScrollView>

      <ScreenFooter>
        <Button onPress={onBack}>Back to home</Button>
      </ScreenFooter>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  body: {
    paddingHorizontal: spacing.screenX,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    gap: spacing.xl,
  },
  thread: {
    gap: spacing.md,
  },
  messageCard: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii["3xl"],
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  chip: {
    backgroundColor: colors.white,
    borderRadius: radii.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  quote: {
    marginTop: spacing.lg,
  },
  gloss: {
    marginTop: spacing.xs,
    fontStyle: "italic",
  },
  ayaLine: {
    marginTop: spacing.md,
  },
  wallet: {
    backgroundColor: colors.purple,
    borderRadius: radii["3xl"],
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  amount: {
    marginTop: spacing.sm,
  },
  reveal: {
    marginTop: spacing.lg,
    alignSelf: "flex-start",
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.full,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  asOf: {
    marginTop: spacing.md,
  },
});
