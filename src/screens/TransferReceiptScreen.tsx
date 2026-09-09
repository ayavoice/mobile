import { Image, Pressable, View } from "react-native";
import { AppText, Avatar, Button, Icon, Screen, ScreenFooter } from "../components/ui";
import { brandImages } from "../content/brand";
import { useAppPrefs } from "../context/AppPrefs";
import { radii, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

type Props = { onHome: () => void; onTransferMore: () => void; onBack: () => void };

export default function TransferReceiptScreen({ onHome, onTransferMore, onBack }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createReceiptStyles);
  const { flow } = useAppPrefs();
  const name = flow.details.find((d) => d.label === "To")?.value ?? "Ricky Martin";
  const number = flow.details.find((d) => d.label === "Number")?.value ?? "Ac no. 8050530XXX";
  const amount = flow.successAmount ?? "$580.00";

  return (
    <Screen>
      <View style={styles.top}>
        <Pressable onPress={onBack} accessibilityLabel="Go back" hitSlop={8} style={styles.topBtn}>
          <Icon name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <AppText variant="headingSM">Transfer Receipt</AppText>
        <View style={styles.topBtn} />
      </View>

      <View style={styles.body}>
        <Image
          source={brandImages.successSpiral}
          style={styles.spiral}
          resizeMode="contain"
          accessibilityLabel="Transfer success"
        />
        <AppText variant="displayMD" align="center" color={colors.text}>
          Transfer Success
        </AppText>
        <AppText variant="body" align="center" style={styles.sub}>
          Your money has been successfully sent to {name}.
        </AppText>

        <AppText variant="caption" align="center" style={styles.totalLabel}>
          Total Transfer amount
        </AppText>
        <AppText variant="displayLG" align="center" color={colors.text} style={styles.total}>
          {amount.startsWith("$") ? amount : `$${amount}`}
        </AppText>

        <View style={styles.card}>
          <Avatar source={brandImages.ricky} size={48} />
          <View style={styles.cardText}>
            <AppText variant="labelSM">{name}</AppText>
            <AppText variant="caption">{number}</AppText>
          </View>
          <AppText variant="caption">3:02 PM</AppText>
        </View>
      </View>

      <ScreenFooter>
        <Button onPress={onHome} variant="purple">
          Back to Home
        </Button>
        <Pressable onPress={onTransferMore} accessibilityRole="button" style={styles.more}>
          <AppText variant="labelSM" color={colors.text} style={styles.moreText}>
            Transfer more money
          </AppText>
        </Pressable>
      </ScreenFooter>
    </Screen>
  );
}

function createReceiptStyles(colors: Palette) {
  return {
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
    minHeight: 52,
  },
  topBtn: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.screenX,
    alignItems: "center",
  },
  spiral: {
    width: 220,
    height: 160,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sub: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  totalLabel: {
    marginTop: spacing["2xl"],
  },
  total: {
    marginTop: 4,
    letterSpacing: -1,
  },
  card: {
    marginTop: spacing["2xl"],
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: radii["2xl"],
    backgroundColor: colors.surfaceCard,
  },
  cardText: {
    flex: 1,
    minWidth: 0,
  },
  more: {
    alignItems: "center",
    paddingVertical: 8,
  },
  moreText: {
    textDecorationLine: "underline" as const,
  },
  };
}
