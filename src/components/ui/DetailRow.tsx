import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { spacing, useColors } from "../../theme";

type DetailRowProps = {
  label: string;
  value: string;
  last?: boolean;
  valueColor?: string;
};

export default function DetailRow({
  label,
  value,
  last = false,
  valueColor,
}: DetailRowProps) {
  const colors = useColors();
  return (
    <View style={[styles.row, last && styles.last]}>
      <AppText variant="bodySM" color={colors.textMuted}>
        {label}
      </AppText>
      <AppText variant="labelSM" color={valueColor ?? colors.text} style={styles.value}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: spacing.md,
    marginBottom: spacing.sm,
  },
  last: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  value: {
    textAlign: "right",
    flexShrink: 1,
    marginLeft: spacing.md,
  },
});
