import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, Icon, IconWell, Screen, ScreenHeader } from "../components/ui";
import { radii, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

type Props = { onBack: () => void };
type IonName = ComponentProps<typeof Ionicons>["name"];

function txHistory(colors: Palette) {
  return [
    { icon: "arrow-up" as const, label: "Sent to Ricky Martin", sub: "Wallet", amount: "-$580.00", date: "Today, 3:02 PM", type: "sent", color: colors.washPurple },
    { icon: "musical-notes" as const, label: "Spotify", sub: "Subscription", amount: "-$14.90", date: "Yesterday", type: "bills", color: colors.washGreen },
    { icon: "arrow-down" as const, label: "Received from Abena Mensah", sub: "Wallet", amount: "+$300.00", date: "Yesterday, 4:20pm", type: "received", color: colors.washBlue },
    { icon: "phone-portrait" as const, label: "Airtime", sub: "Self recharge", amount: "-$10.00", date: "6 Sep, 10:00am", type: "airtime", color: colors.washPurple },
    { icon: "wifi" as const, label: "Data bundle", sub: "2GB, 30 days", amount: "-$25.00", date: "5 Sep, 2:15pm", type: "data", color: colors.washBlue },
    { icon: "flash" as const, label: "Electricity", sub: "Bills", amount: "-$85.00", date: "3 Sep, 9:00am", type: "bills", color: colors.washYellow },
  ];
}

const FILTERS = ["all", "sent", "received", "airtime", "data", "bills"];

export default function HistoryScreen({ onBack }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createHistoryStyles);
  const [filter, setFilter] = useState("all");
  const items = txHistory(colors).filter((t) => filter === "all" || t.type === filter);

  return (
    <Screen style={styles.root}>
      <ScreenHeader title="Transactions" onBack={onBack} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {FILTERS.map((f) => {
          const on = filter === f;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.chip, on ? styles.chipOn : styles.chipOff]}
            >
              <AppText variant="labelXS" color={on ? colors.white : colors.text}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.table}>
          {items.map((tx, i) => (
            <View
              key={`${tx.label}-${tx.date}`}
              style={[styles.row, i < items.length - 1 && styles.rowDivider]}
            >
              <IconWell backgroundColor={tx.color} size={44} radius={14}>
                <Icon name={tx.icon} size={20} color={colors.purple} />
              </IconWell>
              <View style={styles.flex}>
                <AppText variant="labelSM" numberOfLines={1}>
                  {tx.label}
                </AppText>
                <AppText variant="caption" numberOfLines={1}>
                  {tx.sub} · {tx.date}
                </AppText>
              </View>
              <AppText variant="amount" color={tx.type === "received" ? colors.success : colors.text}>
                {tx.amount}
              </AppText>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

function createHistoryStyles(colors: Palette) {
  return {
  root: { flex: 1 },
  filters: {
    paddingHorizontal: spacing.screenX,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: 18,
    borderRadius: radii.pill,
  },
  chipOn: {
    backgroundColor: colors.purple,
  },
  chipOff: {
    backgroundColor: colors.surfaceCard,
  },
  list: {
    padding: spacing.xl,
  },
  table: {
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.lg,
  },
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 14,
    paddingVertical: spacing.lg,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderMuted,
  },
  flex: { flex: 1, minWidth: 0 },
  };
}
