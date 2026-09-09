import { ComponentProps } from "react";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { useColors } from "../../theme";

type IonName = ComponentProps<typeof Ionicons>["name"];
type MciName = ComponentProps<typeof MaterialCommunityIcons>["name"];
type FeatherName = ComponentProps<typeof Feather>["name"];

type IconProps = {
  name: IonName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

/** Primary app icon set (Ionicons via @expo/vector-icons). */
export default function Icon({
  name,
  size = 24,
  color,
  style,
}: IconProps) {
  const palette = useColors();
  return <Ionicons name={name} size={size} color={color ?? palette.text} style={style} />;
}

export function MciIcon({
  name,
  size = 24,
  color,
  style,
}: {
  name: MciName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  const palette = useColors();
  return (
    <MaterialCommunityIcons name={name} size={size} color={color ?? palette.text} style={style} />
  );
}

export function FeatherIcon({
  name,
  size = 24,
  color,
  style,
}: {
  name: FeatherName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  const palette = useColors();
  return <Feather name={name} size={size} color={color ?? palette.text} style={style} />;
}

/** Circular / rounded icon well used in lists and cards. */
export function IconWell({
  children,
  backgroundColor,
  size = 48,
  radius,
  style,
}: {
  children: React.ReactNode;
  backgroundColor: string;
  size?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        styles.well,
        {
          width: size,
          height: size,
          borderRadius: radius ?? size * 0.3,
          backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  well: {
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
});
