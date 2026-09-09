import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, Button, Icon, IconWell, Screen, ScreenFooter, Toggle } from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import type { AccessibilityPrefs } from "../context/AppPrefs";
import { colors, radii, spacing } from "../theme";

type IonName = ComponentProps<typeof Ionicons>["name"];
type PrefKey = keyof Pick<
  AccessibilityPrefs,
  "voiceFirst" | "largeText" | "highContrast" | "haptics" | "captions" | "screenReader"
>;

const OPTIONS: {
  id: PrefKey;
  icon: IonName;
  label: string;
  desc: string;
}[] = [
  { id: "voiceFirst", icon: "mic", label: "Voice-first mode", desc: "Aya speaks all actions aloud" },
  { id: "largeText", icon: "text", label: "Large text", desc: "Bigger fonts throughout the app" },
  { id: "highContrast", icon: "contrast", label: "High contrast", desc: "Stronger colour differences" },
  { id: "haptics", icon: "phone-portrait-outline", label: "Haptic feedback", desc: "Feel vibrations for confirmations" },
  { id: "captions", icon: "chatbubble-ellipses-outline", label: "Live captions", desc: "Show text for spoken prompts" },
  { id: "screenReader", icon: "eye-outline", label: "Screen reader", desc: "Works with TalkBack / VoiceOver" },
];

type Props = { onNext: () => void };

export default function AccessibilitySetupScreen({ onNext }: Props) {
  const { accessibility, setAccessibility } = useAppPrefs();

  return (
    <Screen background={colors.white}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <AppText variant="titleLG">Set up accessibility</AppText>
          <AppText variant="body" style={styles.sub}>
            Turn on what helps you. These settings change how Aya looks and speaks.
          </AppText>
        </View>

        <View style={styles.list}>
          {OPTIONS.map((opt) => {
            const on = accessibility[opt.id];
            return (
              <Pressable
                key={opt.id}
                onPress={() => setAccessibility({ [opt.id]: !on })}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                accessibilityLabel={`${opt.label}: ${on ? "on" : "off"}`}
                style={[styles.row, on && styles.rowOn]}
              >
                <IconWell
                  backgroundColor={on ? colors.white : colors.washPurple}
                  size={44}
                  radius={14}
                >
                  <Icon name={opt.icon} size={22} color={colors.purple} />
                </IconWell>
                <View style={styles.meta}>
                  <AppText variant="labelMD">{opt.label}</AppText>
                  <AppText variant="bodyXS" style={styles.desc}>
                    {opt.desc}
                  </AppText>
                </View>
                <View pointerEvents="none">
                  <Toggle value={on} onValueChange={() => {}} accessibilityLabel={opt.label} />
                </View>
              </Pressable>
            );
          })}
        </View>

        <ScreenFooter>
          <Button onPress={onNext}>Continue to Aya</Button>
        </ScreenFooter>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    minHeight: 0,
  },
  scroll: {
    paddingBottom: spacing.lg,
  },
  header: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.screenX,
  },
  sub: {
    marginTop: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.screenX,
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  row: {
    width: "100%",
    borderRadius: radii.xl,
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surfaceCard,
  },
  rowOn: {
    backgroundColor: colors.washPurple,
  },
  meta: {
    flex: 1,
    minWidth: 0,
  },
  desc: {
    marginTop: 2,
  },
});
