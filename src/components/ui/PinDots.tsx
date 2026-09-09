import { View } from "react-native";
import { spacing, useColors, usePaletteStyles, type Palette } from "../../theme";

type PinDotsProps = {
  length: number;
  filled: number;
  error?: boolean;
};

export default function PinDots({ length, filled, error = false }: PinDotsProps) {
  const colors = useColors();
  const styles = usePaletteStyles(createStyles);

  return (
    <View style={styles.row} accessibilityElementsHidden>
      {Array.from({ length }).map((_, i) => {
        const isFilled = i < filled;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              isFilled && { backgroundColor: error ? colors.danger : colors.purple },
              !isFilled && { borderColor: error ? colors.danger : colors.border },
            ]}
          />
        );
      })}
    </View>
  );
}

function createStyles(colors: Palette) {
  return {
    row: {
      flexDirection: "row" as const,
      justifyContent: "center" as const,
      gap: spacing.lg,
    },
    dot: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: "transparent",
    },
  };
}
