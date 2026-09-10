import { Pressable, ScrollView, View } from "react-native";
import {
  AppText,
  Button,
  Card,
  DetailRow,
  Icon,
  Screen,
  ScreenFooter,
  ScreenHeader,
} from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import { fonts, radii, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

type Props = { onConfirm: () => void; onBack: () => void };

export default function UnderstandingScreen({ onConfirm, onBack }: Props) {
  const { flow } = useAppPrefs();
  const colors = useColors();
  const styles = usePaletteStyles(createStyles);

  return (
    <Screen background={colors.background}>
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
          <AppText variant="titleSM" color={colors.text} style={styles.kind}>
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
      </ScrollView>

      <ScreenFooter>
        <Button onPress={onConfirm}>Continue</Button>
        <View style={styles.linkRow}>
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            role="button"
            accessibilityLabel="Change"
            hitSlop={8}
          >
            <AppText variant="bodySM" color={colors.text} style={styles.linkStrong}>
              Change
            </AppText>
          </Pressable>
          <AppText variant="bodySM" color={colors.textSubtle}>
            {" "}
            ·{" "}
          </AppText>
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            role="button"
            accessibilityLabel="Cancel"
            hitSlop={8}
          >
            <AppText variant="bodySM" color={colors.textSecondary}>
              Cancel
            </AppText>
          </Pressable>
        </View>
      </ScreenFooter>
    </Screen>
  );
}

function createStyles(colors: Palette) {
  return {
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
      alignSelf: "flex-start" as const,
      flexDirection: "row" as const,
      alignItems: "center" as const,
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
      marginBottom: spacing.xl,
    },
    kind: {
      letterSpacing: -1,
      marginBottom: spacing.lg,
    },
    linkRow: {
      flexDirection: "row" as const,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      minHeight: 40,
    },
    linkStrong: {
      fontFamily: fonts.body.bold,
    },
  };
}
