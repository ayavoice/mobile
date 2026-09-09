import { StyleSheet, ScrollView, View } from "react-native";
import {
  AppText,
  Button,
  Card,
  DetailRow,
  Icon,
  IconWell,
  Screen,
  ScreenFooter,
  ScreenHeader,
} from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import { colors, radii, spacing } from "../theme";

type Props = { onConfirm: () => void; onBack: () => void };

export default function UnderstandingScreen({ onConfirm, onBack }: Props) {
  const { flow } = useAppPrefs();

  return (
    <Screen background={colors.white}>
      <ScreenHeader title="Review" onBack={onBack} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.badge}>
          <Icon name="checkmark-circle" size={20} color={colors.successDark} />
          <AppText variant="labelSM" color={colors.successDark}>
            I understood you
          </AppText>
        </View>

        <AppText variant="titleMD" style={styles.title}>
          Here's what I heard
        </AppText>

        <Card style={styles.summary}>
          <AppText variant="titleSM" color={colors.purple} style={styles.kind}>
            {flow.intentLabel}
          </AppText>
          {flow.details.map((row, i) => (
            <DetailRow
              key={row.label}
              label={row.label}
              value={row.value}
              last={i === flow.details.length - 1}
            />
          ))}
        </Card>

        <View style={styles.note}>
          <IconWell backgroundColor={colors.white} size={36} radius={12}>
            <Icon name="volume-high" size={18} color={colors.purple} />
          </IconWell>
          <AppText variant="bodyXS" style={styles.noteText}>
            Aya will read this aloud. You'll confirm with fingerprint, face, or device unlock, never your PIN.
          </AppText>
        </View>
      </ScrollView>

      <ScreenFooter>
        <Button onPress={onConfirm}>Continue</Button>
        <View style={styles.row}>
          <Button onPress={onBack} variant="outline" style={styles.half}>
            Change
          </Button>
          <Button onPress={onBack} variant="ghost" style={styles.half}>
            Cancel
          </Button>
        </View>
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
  },
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.successSurface,
    borderRadius: radii.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing["2xl"],
  },
  title: {
    marginBottom: spacing["2xl"],
  },
  summary: {
    backgroundColor: colors.surfaceCard,
    marginBottom: spacing.xl,
  },
  kind: {
    letterSpacing: -1,
    marginBottom: spacing.lg,
  },
  note: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.xl,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  noteText: {
    flex: 1,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  half: {
    flex: 1,
  },
});
