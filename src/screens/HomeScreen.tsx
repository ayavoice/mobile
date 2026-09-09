import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { AppText, Avatar, Icon, MciIcon, Screen } from "../components/ui";
import { ACCENT, brandImages } from "../content/brand";
import type { FlowId } from "../content/flows";
import { formatCurrency } from "../lib/currency";
import type { ScreenId } from "../navigation/types";
import { radii, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

type BannerIllustration = "voice" | "gift" | "shield" | "trophy";

const ART_SIZE = 148;

function VoiceIllustration() {
  return (
    <Svg width={ART_SIZE} height={ART_SIZE} viewBox="0 0 148 148">
      <Circle cx={104} cy={40} r={54} fill="rgba(255,255,255,0.22)" />
      <Circle cx={40} cy={108} r={30} fill="rgba(255,255,255,0.18)" />
      <Circle cx={112} cy={118} r={9} fill="rgba(255,255,255,0.5)" />
      <Circle cx={30} cy={40} r={5} fill="rgba(255,255,255,0.6)" />
      <Circle cx={98} cy={98} r={44} fill="#FFFFFF" opacity={0.92} />
      <Rect x={68} y={78} width={9} height={18} rx={4.5} fill={ACCENT} />
      <Rect x={83} y={62} width={9} height={50} rx={4.5} fill={ACCENT} />
      <Rect x={98} y={70} width={9} height={34} rx={4.5} fill={ACCENT} />
      <Rect x={113} y={82} width={9} height={10} rx={4.5} fill={ACCENT} />
    </Svg>
  );
}

function GiftIllustration() {
  return (
    <Svg width={ART_SIZE} height={ART_SIZE} viewBox="0 0 148 148">
      <Circle cx={100} cy={38} r={50} fill="rgba(255,255,255,0.2)" />
      <Circle cx={36} cy={112} r={24} fill="rgba(255,255,255,0.18)" />
      <Circle cx={124} cy={110} r={6} fill="rgba(255,255,255,0.55)" />
      <Circle cx={26} cy={44} r={4} fill="rgba(255,255,255,0.6)" />
      <Rect x={54} y={78} width={64} height={48} rx={8} fill="#FFFFFF" opacity={0.92} />
      <Rect x={54} y={64} width={64} height={20} rx={8} fill={ACCENT} />
      <Rect x={82} y={60} width={12} height={70} fill="rgba(255,255,255,0.6)" />
      <Path d="M82 64c-9-4-15-19-5-22 9-2 12 13 5 22z" fill={ACCENT} />
      <Path d="M94 64c9-4 15-19 5-22-9-2-12 13-5 22z" fill={ACCENT} />
    </Svg>
  );
}

function ShieldIllustration() {
  return (
    <Svg width={ART_SIZE} height={ART_SIZE} viewBox="0 0 148 148">
      <Circle cx={102} cy={40} r={52} fill="rgba(255,255,255,0.2)" />
      <Circle cx={34} cy={110} r={26} fill="rgba(255,255,255,0.18)" />
      <Circle cx={30} cy={40} r={5} fill="rgba(255,255,255,0.6)" />
      <Circle cx={122} cy={104} r={7} fill="rgba(255,255,255,0.5)" />
      <Path
        d="M84 46 L118 60 V88 C118 112 102 128 84 135 C66 128 50 112 50 88 V60 Z"
        fill="#FFFFFF"
        opacity={0.92}
      />
      <Path
        d="M84 58 L108 68 V88 C108 105 96 116 84 122 C72 116 60 105 60 88 V68 Z"
        fill={ACCENT}
      />
      <Path
        d="M74 89l7 7 15-16"
        stroke="#FFFFFF"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function TrophyIllustration() {
  return (
    <Svg width={ART_SIZE} height={ART_SIZE} viewBox="0 0 148 148">
      <Circle cx={102} cy={40} r={52} fill="rgba(255,255,255,0.2)" />
      <Circle cx={34} cy={110} r={26} fill="rgba(255,255,255,0.18)" />
      <Circle cx={30} cy={40} r={5} fill="rgba(255,255,255,0.6)" />
      <Circle cx={122} cy={104} r={7} fill="rgba(255,255,255,0.5)" />
      <Rect x={66} y={112} width={36} height={10} rx={3} fill="#FFFFFF" opacity={0.92} />
      <Rect x={76} y={98} width={16} height={18} fill="#FFFFFF" opacity={0.92} />
      <Path
        d="M58 52h48v20c0 15-11 27-24 27s-24-12-24-27z"
        fill="#FFFFFF"
        opacity={0.92}
      />
      <Path
        d="M58 56c-10 0-16 6-16 14s7 13 15 13"
        stroke="#FFFFFF"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        opacity={0.92}
      />
      <Path
        d="M106 56c10 0 16 6 16 14s-7 13-15 13"
        stroke="#FFFFFF"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        opacity={0.92}
      />
      <Path d="M82 66l3.6 7.4 8.2 1.2-5.9 5.7 1.4 8.1L82 84.5l-7.3 3.9 1.4-8.1-5.9-5.7 8.2-1.2z" fill={ACCENT} />
    </Svg>
  );
}

function BannerArt({ kind }: { kind: BannerIllustration }) {
  if (kind === "voice") return <VoiceIllustration />;
  if (kind === "gift") return <GiftIllustration />;
  if (kind === "trophy") return <TrophyIllustration />;
  return <ShieldIllustration />;
}

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

const BANNER_WIDTH = 280;
const BANNER_HEIGHT = 112;
const BANNER_GAP = 12;

function bannersFor(
  colors: Palette,
  onNav: (screen: ScreenId) => void,
): {
  illustration: BannerIllustration;
  title: string;
  bg: string;
  accessibilityLabel: string;
  onPress?: () => void;
}[] {
  return [
    {
      illustration: "voice",
      title: "Send with just your voice",
      bg: colors.washPurple,
      accessibilityLabel: "Send with just your voice",
    },
    {
      illustration: "gift",
      title: "Invite friends, earn GH₵20",
      bg: colors.washBlue,
      accessibilityLabel: "Invite friends, earn GH₵20",
    },
    {
      illustration: "trophy",
      title: "See who's top of the leaderboard",
      bg: colors.washYellow,
      accessibilityLabel: "Open leaderboard",
      onPress: () => onNav("leaderboard"),
    },
    {
      illustration: "shield",
      title: "Your PIN stays yours",
      bg: colors.washGreen,
      accessibilityLabel: "Your PIN stays yours",
    },
  ];
}

const MIC_WAVE_BARS = [
  { h: 16, delay: 0, color: "#B57CFF" },
  { h: 32, delay: 90, color: "#9B5CFF" },
  { h: 48, delay: 40, color: "#7B4DFF" },
  { h: 28, delay: 130, color: "#E14BFF" },
  { h: 16, delay: 60, color: "#C45CFF" },
];

function MicWaveBar({ height, delay, color }: { height: number; delay: number; color: string }) {
  const scale = useSharedValue(0.45);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 340, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.45, { duration: 340, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      ),
    );
  }, [delay, scale]);

  const style = useAnimatedStyle(() => ({ transform: [{ scaleY: scale.value }] }));

  return <Animated.View style={[micWaveStyles.bar, { height, backgroundColor: color }, style]} />;
}

function MicWave() {
  return (
    <View style={micWaveStyles.row}>
      {MIC_WAVE_BARS.map((bar, i) => (
        <MicWaveBar key={i} height={bar.h} delay={bar.delay} color={bar.color} />
      ))}
    </View>
  );
}

const micWaveStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    height: 50,
  },
  bar: {
    width: 6,
    borderRadius: 3,
  },
});

export default function HomeScreen({ onNav, onStartFlow }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createHomeStyles);
  const [selectedSend, setSelectedSend] = useState("Mansi");
  const BANNERS = bannersFor(colors, onNav);

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
            accessibilityRole="button"
            role="button"
            accessibilityLabel="Open your profile, Pratik"
            hitSlop={8}
            style={styles.profileRow}
          >
            <Avatar source={brandImages.pratik} size={42} />
            <View style={styles.hello}>
              <AppText variant="headingSM" color={colors.text} heading={1}>
                Hello, <Text style={styles.helloName}>Pratik!</Text>
              </AppText>
            </View>
          </Pressable>
          <View style={styles.headerActions}>
            <Pressable
              onPress={() =>
                Alert.alert("Notifications", "You're all caught up, no new notifications.")
              }
              accessibilityRole="button"
              role="button"
              accessibilityLabel="Notifications"
              hitSlop={8}
              style={styles.iconBtn}
            >
              <Icon name="notifications-outline" size={22} color={colors.text} />
            </Pressable>
            <Pressable
              onPress={() => onNav("services")}
              accessibilityRole="button"
              role="button"
              accessibilityLabel="Open menu"
              hitSlop={8}
              style={styles.iconBtn}
            >
              <Icon name="grid-outline" size={22} color={colors.text} />
            </Pressable>
          </View>
        </View>

        <AppText variant="labelSM" align="center" color={colors.text} style={styles.balanceLabel}>
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
          {formatCurrency(2648.34)}
        </AppText>

        <View style={styles.stage}>
          <Image
            source={brandImages.cardStack}
            style={styles.cardStack}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
          <View style={styles.micWrap}>
            <Pressable
              onPress={() => onStartFlow("transfer")}
              accessibilityRole="button"
              role="button"
              accessibilityLabel="Talk to send money"
              style={({ pressed }) => [styles.micButton, pressed && styles.micPressed]}
            >
              <MicWave />
            </Pressable>
          </View>
        </View>

        <AppText variant="headingSM" style={styles.sectionTitle}>
          Recipients
        </AppText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
          role="list"
          accessibilityLabel="Recipients"
        >
          {RECIPIENTS.map((src, i) => (
            <View key={i} role="listitem">
              <Pressable
                onPress={() => onStartFlow("transfer")}
                accessibilityRole="button"
                role="button"
                accessibilityLabel="Send money to recipient"
              >
                <Avatar source={src} size={58} />
              </Pressable>
            </View>
          ))}
          <View role="listitem">
            <Pressable
              onPress={() => onStartFlow("transfer")}
              accessibilityRole="button"
              role="button"
              accessibilityLabel="5 more recipients"
              style={styles.moreCircle}
            >
              <AppText variant="labelSM" color={colors.white}>
                5+
              </AppText>
            </Pressable>
          </View>
        </ScrollView>

        <AppText variant="caption" style={styles.lastLabel}>
          Last actions
        </AppText>
        <Pressable
          onPress={() => onNav("history")}
          accessibilityRole="button"
          role="button"
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
          <AppText variant="amount">-{formatCurrency(14.9)}</AppText>
        </Pressable>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={BANNER_WIDTH + BANNER_GAP}
          snapToAlignment="start"
          contentContainerStyle={styles.bannerRow}
          role="list"
          accessibilityLabel="Promotions"
        >
          {BANNERS.map((banner, i) => (
            <View key={i} role="listitem">
              <Pressable
                onPress={banner.onPress}
                disabled={!banner.onPress}
                accessibilityRole={banner.onPress ? "button" : undefined}
                role={banner.onPress ? "button" : undefined}
                accessibilityLabel={banner.accessibilityLabel}
                style={[styles.bannerCard, { backgroundColor: banner.bg }]}
              >
                <View style={styles.bannerText}>
                  <AppText variant="labelLG" color={colors.text}>
                    {banner.title}
                  </AppText>
                </View>
                <View style={styles.bannerArt}>
                  <BannerArt kind={banner.illustration} />
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        <View style={styles.quickHead}>
          <AppText variant="headingSM">Quick send </AppText>
          <AppText variant="headingSM" color={colors.text}>
            6
          </AppText>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}
          role="list"
          accessibilityLabel="Quick send"
        >
          {QUICK_SEND.map((person) => {
            const selected = person.name === selectedSend;
            return (
              <View key={person.name} role="listitem">
                <Pressable
                  onPress={() => {
                    setSelectedSend(person.name);
                    onStartFlow("transfer");
                  }}
                  accessibilityRole="button"
                  role="button"
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
              </View>
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
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  cardStack: {
    position: "absolute",
    width: 345,
    height: 240,
  },
  micWrap: {
    width: MIC,
    height: MIC,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -130,
    zIndex: 2,
  },
  micButton: {
    width: MIC,
    height: MIC,
    borderRadius: MIC / 2,
    backgroundColor: "rgba(228,228,235,0.92)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4A2DBA",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 14,
  },
  micPressed: {
    opacity: 0.88,
  },
  bannerRow: {
    gap: BANNER_GAP,
    paddingRight: 8,
    marginBottom: spacing["2xl"],
  },
  bannerCard: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: radii["2xl"],
    overflow: "hidden",
  },
  bannerText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    maxWidth: BANNER_WIDTH - 70,
  },
  bannerArt: {
    position: "absolute",
    right: -28,
    bottom: -30,
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
    gap: spacing.xs,
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
