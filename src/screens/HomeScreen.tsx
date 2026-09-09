import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { AppText, Avatar, Icon, MciIcon, Screen } from "../components/ui";
import { ACCENT, brandImages } from "../content/brand";
import type { FlowId } from "../content/flows";
import type { ScreenId } from "../navigation/types";
import { spacing, useColors, usePaletteStyles, type Palette } from "../theme";

type Props = {
  onNav: (screen: ScreenId) => void;
  onStartFlow: (flow: FlowId) => void;
};

const RECIPIENTS = [
  brandImages.sonya,
  brandImages.mansi,
  brandImages.palak,
  brandImages.sourabh,
];

const QUICK_SEND = [
  { name: "Sonya", image: brandImages.sonya },
  { name: "Mansi", image: brandImages.mansi },
  { name: "palak", image: brandImages.palak },
  { name: "Sandeepa", image: brandImages.sandeepa },
  { name: "Sourabh", image: brandImages.sourabh },
  { name: "Aisha", image: brandImages.aisha },
];

export default function HomeScreen({ onNav, onStartFlow }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createHomeStyles);
  const [selectedSend, setSelectedSend] = useState("Mansi");

  return (
    <Screen style={styles.root} safeBottom={false}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => onNav("profile")}
            accessibilityLabel="Open your profile, Pratik"
            hitSlop={8}
            style={styles.profileRow}
          >
            <Avatar source={brandImages.pratik} size={42} />
            <View style={styles.hello}>
              <AppText variant="headingSM" color={colors.text}>
                Hello,{" "}
              </AppText>
              <AppText variant="headingSM" color={colors.text} style={styles.helloName}>
                Pratik!
              </AppText>
            </View>
          </Pressable>
          <View style={styles.headerActions}>
            <Pressable
              onPress={() =>
                Alert.alert("Notifications", "You're all caught up — no new notifications.")
              }
              accessibilityLabel="Notifications"
              hitSlop={8}
              style={styles.iconBtn}
            >
              <Icon name="notifications-outline" size={22} color={colors.text} />
            </Pressable>
            <Pressable
              onPress={() => onNav("services")}
              accessibilityLabel="Open menu"
              hitSlop={8}
              style={styles.iconBtn}
            >
              <Icon name="grid-outline" size={22} color={colors.text} />
            </Pressable>
          </View>
        </View>

        <AppText variant="labelSM" align="center" color={ACCENT} style={styles.balanceLabel}>
          Your balance
        </AppText>
        <AppText
          variant="displayLG"
          align="center"
          color={colors.text}
          style={styles.balance}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          $2648.34
        </AppText>

        <View style={styles.stage}>
          <Image
            source={brandImages.cardStack}
            style={styles.cardStack}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
          <Pressable
            onPress={() => onStartFlow("transfer")}
            accessibilityLabel="Talk to send money"
            style={({ pressed }) => [styles.micButton, pressed && styles.micPressed]}
          >
            <Icon name="mic" size={34} color={ACCENT} />
          </Pressable>
        </View>

        <AppText variant="headingSM" style={styles.sectionTitle}>
          Recipients
        </AppText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {RECIPIENTS.map((src, i) => (
            <Pressable
              key={i}
              onPress={() => onStartFlow("transfer")}
              accessibilityLabel="Send money to recipient"
            >
              <Avatar source={src} size={58} />
            </Pressable>
          ))}
          <Pressable
            onPress={() => onStartFlow("transfer")}
            accessibilityLabel="5 more recipients"
            style={styles.moreCircle}
          >
            <AppText variant="labelSM" color={colors.white}>
              5+
            </AppText>
          </Pressable>
        </ScrollView>

        <AppText variant="caption" style={styles.lastLabel}>
          Last actions
        </AppText>
        <Pressable
          onPress={() => onNav("history")}
          accessibilityLabel="Spotify, yesterday, minus 14 dollars 90"
          style={styles.actionRow}
        >
          <View style={styles.spotifyMark}>
            <MciIcon name="spotify" size={22} color={colors.white} />
          </View>
          <View style={styles.flex}>
            <AppText variant="labelSM">Spotify</AppText>
            <AppText variant="caption">Yesterday</AppText>
          </View>
          <AppText variant="amount">-$14.90</AppText>
        </Pressable>

        <View style={styles.quickHead}>
          <AppText variant="headingSM">Quick send </AppText>
          <AppText variant="headingSM" color={ACCENT}>
            6
          </AppText>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
        >
          {QUICK_SEND.map((person) => {
            const selected = person.name === selectedSend;
            return (
              <Pressable
                key={person.name}
                onPress={() => {
                  setSelectedSend(person.name);
                  onStartFlow("transfer");
                }}
                accessibilityLabel={`Quick send to ${person.name}`}
                accessibilityState={{ selected }}
                style={styles.quickItem}
              >
                <Avatar source={person.image} size={58} />
                <AppText variant="caption" numberOfLines={1} style={styles.quickName}>
                  {person.name}
                </AppText>
                <View style={[styles.caret, !selected && styles.caretHidden]} />
              </Pressable>
            );
          })}
        </ScrollView>
      </ScrollView>
    </Screen>
  );
}

const MIC = 92;

function createHomeStyles(colors: Palette) {
  return {
  root: { flex: 1 },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing["5xl"],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing["2xl"],
  },
  profileRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: spacing.md,
    minWidth: 0,
  },
  hello: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  helloName: {
    fontWeight: "800",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  balanceLabel: {
    marginBottom: 6,
  },
  balance: {
    letterSpacing: -1.2,
    fontWeight: "800",
  },
  stage: {
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  cardStack: {
    position: "absolute",
    width: 300,
    height: 210,
  },
  micButton: {
    width: MIC,
    height: MIC,
    borderRadius: MIC / 2,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    shadowColor: "#4A2DBA",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 14,
  },
  micPressed: {
    opacity: 0.88,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  hRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingRight: 8,
    marginBottom: spacing["2xl"],
  },
  moreCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#3A3A3A",
    alignItems: "center",
    justifyContent: "center",
  },
  lastLabel: {
    marginBottom: spacing.md,
    color: colors.textMuted,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: spacing["2xl"],
  },
  spotifyMark: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
  },
  quickHead: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: spacing.md,
  },
  quickItem: {
    width: 64,
    alignItems: "center",
    gap: 6,
  },
  quickName: {
    textAlign: "center",
    color: colors.text,
  },
  caret: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: ACCENT,
    marginTop: 2,
  },
  caretHidden: {
    opacity: 0,
  },
  };
}
