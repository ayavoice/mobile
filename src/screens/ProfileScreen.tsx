import { Alert, Platform, Pressable, StyleSheet, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, Avatar, Card, Icon, IconWell, Screen, ScreenHeader, Toggle } from "../components/ui";
import { brandImages } from "../content/brand";
import { useAppPrefs } from "../context/AppPrefs";
import { languageDisplayName } from "../content/flows";
import type { ScreenId } from "../navigation/types";
import { colors, spacing, useColors, type Palette } from "../theme";

type Props = { onBack: () => void; onNav: (screen: ScreenId) => void; onLogout: () => void };
type IonName = ComponentProps<typeof Ionicons>["name"];

function badgesFor(
  palette: Palette,
): { icon: IonName; label: string; desc: string; color: string; earned: boolean }[] {
  return [
    { icon: "mic", label: "First voice command", desc: "Completed a spoken flow with Aya", color: palette.washYellow, earned: true },
    { icon: "shield-checkmark", label: "PIN never spoken", desc: "Confirmed with biometrics, not your voice", color: palette.washGreen, earned: true },
    { icon: "swap-horizontal", label: "Code-switch pro", desc: "Mixed Akan/Ewe/English in one sentence", color: palette.washPurple, earned: true },
    { icon: "trending-up", label: "5 flows in a week", desc: "Used Aya for money 5 times this week", color: palette.washBlue, earned: false },
  ];
}

const LINKS: { icon: IonName; label: string; desc: string; screen: ScreenId }[] = [
  {
    icon: "time-outline",
    label: "Transaction History",
    desc: "Everything you've sent, received, and bought",
    screen: "history",
  },
  {
    icon: "options-outline",
    label: "Accessibility",
    desc: "Voice, text size, contrast, captions",
    screen: "accessibility-settings",
  },
  {
    icon: "shield-checkmark-outline",
    label: "Security & Privacy",
    desc: "Biometrics, PIN safety, how Aya protects you",
    screen: "security",
  },
  {
    icon: "help-circle-outline",
    label: "Help & Support",
    desc: "FAQs and talk to a support agent",
    screen: "help",
  },
];

const ACCESSIBILITY_MODE_KEYS = ["voiceFirst", "largeText", "highContrast", "captions"] as const;

export default function ProfileScreen({ onBack, onNav, onLogout }: Props) {
  const colors = useColors();
  const { language, accessibility, setAccessibility } = useAppPrefs();
  const badges = badgesFor(colors);
  const earnedCount = badges.filter((b) => b.earned).length;

  const accessibilityModeOn = ACCESSIBILITY_MODE_KEYS.every((key) => accessibility[key]);
  const toggleAccessibilityMode = () => {
    const next = !accessibilityModeOn;
    setAccessibility({
      voiceFirst: next,
      largeText: next,
      highContrast: next,
      captions: next,
    });
  };

  const confirmLogout = () => {
    // react-native-web's Alert.alert() is a no-op, so its buttons (and
    // onLogout) never fire on web — fall back to the browser's own confirm.
    if (Platform.OS === "web") {
      if (window.confirm("Log out?\n\nYou'll need to sign in again to use Aya.")) {
        onLogout();
      }
      return;
    }
    Alert.alert("Log out?", "You'll need to sign in again to use Aya.", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: onLogout },
    ]);
  };

  return (
    <Screen scroll safeBottom={false}>
      <ScreenHeader title="Profile" onBack={onBack} />

      <View style={styles.body}>
        <Card style={styles.profileCard}>
          <Avatar source={brandImages.pratik} size={64} />
          <View style={styles.flex}>
            <AppText variant="labelLG" numberOfLines={1}>
              Pratik
            </AppText>
            <AppText variant="bodySM" numberOfLines={1}>
              Ac no. 8050530XXX
            </AppText>
            <AppText variant="caption" style={styles.langTag}>
              Speaking {languageDisplayName(language)}
            </AppText>
          </View>
        </Card>

        <Pressable
          onPress={toggleAccessibilityMode}
          accessibilityRole="button"
          role="button"
          accessibilityState={{ selected: accessibilityModeOn }}
          accessibilityLabel={`Accessibility mode: ${accessibilityModeOn ? "on" : "off"}`}
        >
          <Card style={styles.a11yRow}>
            <IconWell backgroundColor={colors.washPurple} size={44} radius={14}>
              <Icon name="accessibility" size={22} color={colors.text} />
            </IconWell>
            <View style={styles.flex}>
              <AppText variant="labelMD">Accessibility mode</AppText>
              <AppText variant="caption">Voice-first, large text, high contrast, captions</AppText>
            </View>
            <View pointerEvents="none">
              <Toggle
                value={accessibilityModeOn}
                onValueChange={() => {}}
                accessibilityLabel="Accessibility mode"
              />
            </View>
          </Card>
        </Pressable>

        <Card style={styles.streakCard}>
          <IconWell backgroundColor={colors.washPurple} size={56} radius={20}>
            <Icon name="flame" size={26} color={colors.text} />
          </IconWell>
          <View style={styles.flex}>
            <AppText variant="labelLG">5-day practice streak</AppText>
            <AppText variant="bodySM">
              {earnedCount} of {badges.length} badges earned
            </AppText>
          </View>
        </Card>

        <AppText variant="headingSM" style={styles.section}>
          Badges
        </AppText>
        <View style={styles.badgeList} role="list" accessibilityLabel="Badges">
          {badges.map((badge) => (
            <Card
              key={badge.label}
              role="listitem"
              style={[styles.badgeRow, !badge.earned && styles.badgeRowLocked]}
            >
              <IconWell backgroundColor={badge.earned ? badge.color : colors.surfaceGhost} size={44} radius={14}>
                <Icon
                  name={badge.earned ? badge.icon : "lock-closed"}
                  size={20}
                  color={badge.earned ? colors.text : colors.textSubtle}
                />
              </IconWell>
              <View style={styles.flex}>
                <AppText variant="labelMD" color={badge.earned ? colors.text : colors.textMuted}>
                  {badge.label}
                </AppText>
                <AppText variant="caption">{badge.desc}</AppText>
              </View>
              {badge.earned ? (
                <Icon name="checkmark-circle" size={22} color={colors.successDark} />
              ) : null}
            </Card>
          ))}
        </View>

        <View style={styles.links} role="list" accessibilityLabel="More options">
          {LINKS.map((link) => (
            <View key={link.screen} role="listitem">
              <Pressable
                onPress={() => onNav(link.screen)}
                accessibilityRole="button"
                role="button"
                accessibilityLabel={link.label}
              >
                <Card style={styles.linkRow}>
                  <IconWell backgroundColor={colors.washPurple} size={44} radius={14}>
                    <Icon name={link.icon} size={22} color={colors.text} />
                  </IconWell>
                  <View style={styles.flex}>
                    <AppText variant="labelMD">{link.label}</AppText>
                    <AppText variant="caption">{link.desc}</AppText>
                  </View>
                  <Icon name="chevron-forward" size={20} color={colors.textSubtle} />
                </Card>
              </Pressable>
            </View>
          ))}
        </View>

        <Pressable onPress={confirmLogout} accessibilityRole="button" role="button" accessibilityLabel="Log out">
          <Card style={styles.linkRow}>
            <IconWell backgroundColor={colors.dangerSurface} size={44} radius={14}>
              <Icon name="log-out-outline" size={22} color={colors.danger} />
            </IconWell>
            <View style={styles.flex}>
              <AppText variant="labelMD" color={colors.danger}>
                Log out
              </AppText>
              <AppText variant="caption">Sign out of this account</AppText>
            </View>
          </Card>
        </Pressable>

        <AppText variant="caption" align="center" style={styles.version}>
          Aya · Version 1.0.0
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  langTag: {
    marginTop: 4,
  },
  a11yRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  streakCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  section: {
    marginTop: spacing.sm,
  },
  badgeList: {
    gap: spacing.sm,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  badgeRowLocked: {
    opacity: 0.6,
  },
  links: {
    gap: spacing.sm,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  version: {
    marginTop: spacing.md,
  },
});
