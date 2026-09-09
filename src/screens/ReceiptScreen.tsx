import { Pressable, StyleSheet, View } from "react-native";
import { AppText, Icon, Screen, ScreenHeader } from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import { colors, radii, spacing } from "../theme";

type Props = { onBack: () => void };

export default function ReceiptScreen({ onBack }: Props) {
  const { flow } = useAppPrefs();
  const amount = flow.successAmount ?? "$580.00";
  const rows = flow.successDetails.length
    ? flow.successDetails
    : [
        { label: "Recipient", value: "Ricky Martin" },
        { label: "Number", value: "Ac no. 8050530XXX" },
        { label: "Reference", value: "AYA-2609-7K8X" },
        { label: "Date & time", value: "Today, 3:02 PM" },
        { label: "Status", value: "Completed" },
      ];

  return (
    <Screen background={colors.white} scroll>
      <ScreenHeader title="Receipt" onBack={onBack} />
      <View style={styles.body}>
        <View style={styles.card}>
          <View style={styles.hero}>
            <AppText variant="caption" color={colors.textInverseMuted} align="center">
              Amount sent
            </AppText>
            <AppText variant="displayLG" color={colors.white} align="center" style={styles.amount}>
              {amount.startsWith("$") || amount.startsWith("GH") ? amount : `$${amount}`}
            </AppText>
            <AppText variant="body" color={colors.textInverseMuted} align="center">
              {flow.successTitle}
            </AppText>
          </View>
          <View style={styles.rows}>
            {rows.map((row) => (
              <View key={row.label} style={styles.row}>
                <AppText variant="bodySM">{row.label}</AppText>
                <AppText variant="labelSM">{row.value}</AppText>
              </View>
            ))}
          </View>
          <View style={styles.actions}>
            <Pressable style={styles.ghost} accessibilityRole="button" role="button">
              <Icon name="volume-high" size={18} color={colors.purple} />
              <AppText variant="labelSM">Read aloud</AppText>
            </Pressable>
            <Pressable style={styles.primary} accessibilityRole="button" role="button">
              <Icon name="share-outline" size={18} color={colors.white} />
              <AppText variant="labelSM" color={colors.white}>
                Share
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: spacing.screenX,
    paddingBottom: spacing["2xl"],
  },
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii["4xl"],
    overflow: "hidden",
  },
  hero: {
    backgroundColor: colors.purple,
    paddingVertical: spacing["3xl"],
    paddingHorizontal: spacing["2xl"],
  },
  amount: {
    marginTop: 6,
    marginBottom: 4,
  },
  rows: {
    padding: spacing["2xl"],
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: spacing["2xl"],
    paddingBottom: spacing["2xl"],
  },
  ghost: {
    flex: 1,
    height: 52,
    borderRadius: radii["2xl"],
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  primary: {
    flex: 1,
    height: 52,
    borderRadius: radii["2xl"],
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
});
