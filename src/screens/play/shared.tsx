import { Pressable, View } from "react-native";
import { AppText, Icon } from "../../components/ui";
import { radii, spacing } from "../../theme";
import type { IonName } from "../../content/play";

export function darken(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/** Picks black or white text for legibility on an arbitrary fill color. */
export function contrastColor(hex: string): string {
  const clean = hex.replace("#", "");
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const r = toLinear(parseInt(clean.slice(0, 2), 16) / 255);
  const g = toLinear(parseInt(clean.slice(2, 4), 16) / 255);
  const b = toLinear(parseInt(clean.slice(4, 6), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

export function starsFor(score: number, total: number): number {
  if (total === 0) return 0;
  const pct = score / total;
  if (pct >= 1) return 3;
  if (pct >= 0.6) return 2;
  if (score > 0) return 1;
  return 0;
}

export function StarRow({
  count,
  size = 16,
  filledColor,
  emptyColor,
}: {
  count: number;
  size?: number;
  filledColor: string;
  emptyColor: string;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[0, 1, 2].map((i) => (
        <Icon
          key={i}
          name={i < count ? "star" : "star-outline"}
          size={size}
          color={i < count ? filledColor : emptyColor}
        />
      ))}
    </View>
  );
}

/** Layered "chunky" 3D-press button used throughout AYA Learn. */
export function ChunkyButton({
  label,
  icon,
  iconTrailing = false,
  color,
  textColor,
  onPress,
  disabled,
}: {
  label: string;
  icon?: IonName;
  iconTrailing?: boolean;
  color: string;
  textColor?: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const resolvedTextColor = textColor ?? contrastColor(color);
  return (
    <View style={{ borderRadius: radii["2xl"], backgroundColor: darken(color, 40), opacity: disabled ? 0.5 : 1 }}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        accessibilityRole="button"
        role="button"
        accessibilityLabel={label}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing.sm,
          borderRadius: radii["2xl"],
          paddingVertical: 14,
          backgroundColor: color,
          marginBottom: pressed ? 0 : 4,
          marginTop: pressed ? 4 : 0,
        })}
      >
        {icon && !iconTrailing ? <Icon name={icon} size={18} color={resolvedTextColor} /> : null}
        <AppText variant="labelMD" color={resolvedTextColor}>
          {label}
        </AppText>
        {icon && iconTrailing ? <Icon name={icon} size={18} color={resolvedTextColor} /> : null}
      </Pressable>
    </View>
  );
}
