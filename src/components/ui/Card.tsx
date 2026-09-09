import { View, StyleSheet, ViewProps, StyleProp, ViewStyle, Platform } from "react-native";
import { radii, spacing, useColors } from "../../theme";

type CardProps = ViewProps & {
  children: React.ReactNode;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, padded = true, style, ...rest }: CardProps) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surfaceCard },
        padded && styles.padded,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii["3xl"],
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
    ...(Platform.OS === "web"
      ? ({ boxShadow: "none", border: "none" } as ViewStyle)
      : null),
  },
  padded: {
    padding: spacing.xl,
  },
});
