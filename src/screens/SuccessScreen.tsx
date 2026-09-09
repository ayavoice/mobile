import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { AppText, Button, Card, DetailRow, Icon, Screen, ScreenFooter } from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import { colors, radii, spacing } from "../theme";

type Props = { onDone: () => void; onReceipt: () => void };

export default function SuccessScreen({ onDone, onReceipt }: Props) {
  const { flow, activeFlow, accessibility } = useAppPrefs();
  const [revealed, setRevealed] = useState(activeFlow !== "balance");
  const isBalance = activeFlow === "balance";

  return (
    <Screen background={colors.white}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.check}>
          <Icon name="checkmark" size={40} color={colors.white} />
        </View>

        <View>
          <AppText variant="displayMD" align="center">
            {flow.successTitle}
          </AppText>
          {flow.successAmount ? (
            <AppText
              variant="displayXL"
              align="center"
              color={isBalance && !revealed ? colors.trackIdle : colors.text}
              style={styles.amount}
            >
              {isBalance && !revealed ? "••••••" : flow.successAmount}
            </AppText>
          ) : null}
          <AppText variant="bodyLG" align="center">
            {flow.successSubtitle}
          </AppText>
        </View>

        {isBalance ? (
          <Pressable
            onPress={() => setRevealed((v) => !v)}
            style={styles.reveal}
            accessibilityRole="button"
            role="button"
            accessibilityLabel={revealed ? "Hide balance" : "Reveal balance"}
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
        ) : null}

        {accessibility.voiceFirst ? (
          <View style={styles.aya}>
            <Icon name="volume-high" size={20} color={colors.purple} />
            <AppText variant="bodySM" style={styles.textFlex}>
              {isBalance
                ? `Aya says: "Your current balance is ${flow.successAmount}"`
                : `Aya says: "${flow.successTitle}"`}
            </AppText>
          </View>
        ) : null}

        <Card style={styles.card}>
          {flow.successDetails.map((row, i) => (
            <DetailRow
              key={row.label}
              label={row.label}
              value={
                isBalance && !revealed && row.label === "Available" ? "••••••" : row.value
              }
              last={i === flow.successDetails.length - 1}
            />
          ))}
        </Card>
      </ScrollView>

      <ScreenFooter>
        {flow.receiptAvailable ? (
          <Button onPress={onReceipt} accessibilityLabel="View Receipt">
            View Receipt
          </Button>
        ) : null}
        <Button onPress={onDone} variant={flow.receiptAvailable ? "ghost" : "primary"}>
          Done
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
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing["4xl"],
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing["2xl"],
  },
  check: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  amount: {
    marginTop: spacing.sm,
  },
  reveal: {
    paddingVertical: 10,
    paddingHorizontal: spacing["2xl"],
    borderRadius: radii.full,
    backgroundColor: colors.washPurple,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  aya: {
    width: "100%",
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  textFlex: {
    flex: 1,
    minWidth: 0,
  },
  card: {
    width: "100%",
  },
});
