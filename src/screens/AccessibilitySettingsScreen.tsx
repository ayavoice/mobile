import { Pressable, StyleSheet, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, Card, Icon, IconWell, Screen, ScreenHeader, Toggle } from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import type { AccessibilityPrefs } from "../context/AppPrefs";
import { colors, radii, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

type Props = { onBack: () => void };
type ToggleKey = keyof Pick<
  AccessibilityPrefs,
  "highContrast" | "voiceFirst" | "haptics" | "captions" | "screenReader" | "largeText"
>;
type IonName = ComponentProps<typeof Ionicons>["name"];

const TOGGLE_OPTS: { key: ToggleKey; icon: IonName; label: string; desc: string }[] = [
  { key: "voiceFirst", icon: "volume-high", label: "Voice-first mode", desc: "Read all actions aloud" },
  { key: "largeText", icon: "text", label: "Large text", desc: "Bigger fonts throughout" },
  { key: "highContrast", icon: "contrast", label: "High contrast", desc: "Stronger colour differences" },
  { key: "haptics", icon: "phone-portrait-outline", label: "Haptic feedback", desc: "Vibrations for confirmations" },
  { key: "captions", icon: "chatbubble-ellipses-outline", label: "Live captions", desc: "Show text for all speech" },
  { key: "screenReader", icon: "eye-outline", label: "Screen reader", desc: "TalkBack / VoiceOver support" },
];

export default function AccessibilitySettingsScreen({ onBack }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createA11yStyles);
  const { accessibility, setAccessibility, language, setLanguage } = useAppPrefs();

  return (
    <Screen scroll>
      <ScreenHeader title="Accessibility" onBack={onBack} />

      <View style={styles.body}>
        <AppText variant="caption" style={styles.cardTitle}>
          Light and dark appearance follow your phone settings. Logos switch with the mode.
        </AppText>
        <Card>
          <AppText variant="labelMD" style={styles.cardTitle}>
            Language
          </AppText>
          <View style={styles.row}>
            {(
              [
                { code: "tw", label: "Twi" },
                { code: "ee", label: "Ewe" },
                { code: "en", label: "English" },
              ] as const
            ).map((lang) => {
              const on = language === lang.code;
              return (
                <Pressable
                  key={lang.code}
                  onPress={() => setLanguage(lang.code)}
                  style={[styles.choice, on ? styles.choiceOn : styles.choiceOff]}
                  accessibilityRole="button"
                  role="button"
                  accessibilityState={{ selected: on }}
                  accessibilityLabel={lang.label}
                >
                  <AppText variant="labelXS" color={on ? colors.textOnYellow : colors.text}>
                    {lang.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Card>
          <AppText variant="labelMD" style={styles.cardTitle}>
            Text size
          </AppText>
          <View style={styles.row}>
            {[16, 20, 26].map((size, i) => {
              const level = (i + 1) as 1 | 2 | 3;
              const on = accessibility.textSize === level;
              return (
                <Pressable
                  key={size}
                  onPress={() => setAccessibility({ textSize: level, largeText: level > 1 })}
                  style={[styles.choice, on ? styles.choiceOn : styles.choiceOff]}
                >
                  <AppText style={{ fontSize: size, fontWeight: "700", color: on ? colors.textOnYellow : colors.text }}>
                    A
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Card>
          <AppText variant="labelMD" style={styles.cardTitle}>
            Speech speed
          </AppText>
          <View style={styles.row}>
            {(["Slow", "Normal", "Fast"] as const).map((label, i) => {
              const level = (i + 1) as 1 | 2 | 3;
              const on = accessibility.speechSpeed === level;
              return (
                <Pressable
                  key={label}
                  onPress={() => setAccessibility({ speechSpeed: level })}
                  style={[styles.choice, on ? styles.choiceOn : styles.choiceOff]}
                >
                  <AppText variant="labelXS" color={on ? colors.textOnYellow : colors.text}>
                    {label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </Card>

        {TOGGLE_OPTS.map((opt) => (
          <Pressable
            key={opt.key}
            onPress={() =>
              setAccessibility({ [opt.key]: !accessibility[opt.key] })
            }
            accessibilityRole="button"
            role="button"
            accessibilityState={{ selected: accessibility[opt.key] }}
            accessibilityLabel={`${opt.label}: ${accessibility[opt.key] ? "on" : "off"}`}
          >
            <Card>
              <View style={styles.toggleRow}>
                <IconWell backgroundColor={colors.surfaceGhost} size={44} radius={14}>
                  <Icon name={opt.icon} size={22} color={colors.text} />
                </IconWell>
                <View style={styles.flex}>
                  <AppText variant="labelMD">{opt.label}</AppText>
                  <AppText variant="caption">{opt.desc}</AppText>
                </View>
                <View pointerEvents="none">
                  <Toggle
                    value={accessibility[opt.key]}
                    onValueChange={() => {}}
                    accessibilityLabel={opt.label}
                  />
                </View>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

function createA11yStyles(colors: Palette) {
  return {
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  cardTitle: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  choice: {
    flex: 1,
    height: 48,
    borderRadius: radii["2xl"],
    alignItems: "center",
    justifyContent: "center",
  },
  choiceOn: {
    backgroundColor: colors.purple,
  },
  choiceOff: {
    backgroundColor: colors.surfaceCard,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  };
}
