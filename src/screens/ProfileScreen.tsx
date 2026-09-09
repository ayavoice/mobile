import { Alert, Pressable, StyleSheet, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, Avatar, Card, Icon, IconWell, Screen, ScreenHeader } from "../components/ui";
import { brandImages } from "../content/brand";
import { useAppPrefs } from "../context/AppPrefs";
import { languageDisplayName } from "../content/flows";
import type { ScreenId } from "../navigation/types";
import { colors, spacing } from "../theme";

type Props = { onBack: () => void; onNav: (screen: ScreenId) => void; onLogout: () => void };
type IonName = ComponentProps<typeof Ionicons>["name"];

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

export default function ProfileScreen({ onBack, onNav, onLogout }: Props) {
  const { language } = useAppPrefs();

  const confirmLogout = () => {
    Alert.alert("Log out?", "You'll need to sign in again to use Aya.", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: onLogout },
    ]);
  };

  return (
    <Screen background={colors.white} scroll safeBottom={false}>
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

        <View style={styles.links}>
          {LINKS.map((link) => (
            <Pressable
              key={link.screen}
              onPress={() => onNav(link.screen)}
              accessibilityRole="button"
              accessibilityLabel={link.label}
            >
              <Card style={styles.linkRow}>
                <IconWell backgroundColor={colors.washPurple} size={44} radius={14}>
                  <Icon name={link.icon} size={22} color={colors.purple} />
                </IconWell>
                <View style={styles.flex}>
                  <AppText variant="labelMD">{link.label}</AppText>
                  <AppText variant="caption">{link.desc}</AppText>
                </View>
                <Icon name="chevron-forward" size={20} color={colors.textSubtle} />
              </Card>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={confirmLogout} accessibilityRole="button" accessibilityLabel="Log out">
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
