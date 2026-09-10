import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppText, Card, Icon, IconWell } from "../../components/ui";
import { radii, spacing, useColors, usePaletteStyles, type Palette } from "../../theme";
import { buildLeague, type GameProgress } from "../../content/play";
import { darken, StarRow, starsFor } from "./shared";

type Props = {
  xp: number;
  streak: number;
  levelName: string;
  levelIndex: number;
  levelProgressPct: number;
  progress: GameProgress;
  onPlay: () => void;
  onOpenLeaderboard: () => void;
};

export default function PlayHub({
  xp,
  streak,
  levelName,
  levelIndex,
  levelProgressPct,
  progress,
  onPlay,
  onOpenLeaderboard,
}: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createStyles);
  const stars = starsFor(progress.best, progress.total);
  const played = progress.plays > 0;
  const { youRank } = buildLeague(xp);
  const hasStreak = streak > 0;

  return (
    <View style={styles.body}>
      <LinearGradient
        colors={["#2A1F52", "#120C24"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View style={styles.heroRow}>
          <View style={styles.heroStat}>
            <IconWell
              backgroundColor={hasStreak ? "rgba(245,165,36,0.22)" : "rgba(255,255,255,0.08)"}
              size={44}
              radius={22}
            >
              <Icon name="flame" size={22} color={hasStreak ? colors.warning : "rgba(255,255,255,0.35)"} />
            </IconWell>
            <AppText variant="titleSM" color="#FFFFFF" style={styles.heroNum}>
              {streak}
            </AppText>
            <AppText variant="caption" color="rgba(255,255,255,0.6)">
              day streak
            </AppText>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroStat}>
            <IconWell backgroundColor="rgba(255,204,8,0.18)" size={44} radius={22}>
              <Icon name="star" size={20} color={colors.purple} />
            </IconWell>
            <AppText variant="titleSM" color="#FFFFFF" style={styles.heroNum}>
              {xp}
            </AppText>
            <AppText variant="caption" color="rgba(255,255,255,0.6)">
              XP
            </AppText>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroStat}>
            <IconWell backgroundColor="rgba(129,199,132,0.18)" size={44} radius={22}>
              <Icon name="shield-checkmark" size={20} color={colors.successMid} />
            </IconWell>
            <AppText variant="titleSM" color="#FFFFFF" style={styles.heroNum}>
              {levelIndex + 1}
            </AppText>
            <AppText variant="caption" color="rgba(255,255,255,0.6)" numberOfLines={1}>
              {levelName}
            </AppText>
          </View>
        </View>
        <View style={styles.heroTrack}>
          <View style={[styles.heroFill, { width: `${levelProgressPct * 100}%`, backgroundColor: colors.purple }]} />
        </View>
      </LinearGradient>

      <Pressable
        onPress={onPlay}
        accessibilityRole="button"
        role="button"
        accessibilityLabel={`Play Ama's Market Day. ${
          played ? `Best safety score ${progress.best} of ${progress.total}.` : "Not played yet."
        }`}
      >
        {({ pressed }) => (
          <Card style={[styles.challengeCard, { backgroundColor: colors.washPurple }]}>
            <View style={styles.levelTag}>
              <AppText variant="caption" color={colors.text}>
                LEVEL 1 · 🇬🇭
              </AppText>
            </View>
            <View style={styles.challengeTop}>
              <IconWell backgroundColor={colors.purple} size={56} radius={28}>
                <AppText variant="titleSM">🛒</AppText>
              </IconWell>
              <View style={styles.flex}>
                <AppText variant="labelLG" color={colors.text}>
                  Ama's Market Day
                </AppText>
                <AppText variant="bodySM">Help Ama spend GH₵180 safely</AppText>
              </View>
            </View>
            <View style={styles.challengeFooter}>
              <StarRow count={stars} size={22} filledColor={colors.warning} emptyColor={colors.borderMuted} />
              <View style={[styles.playPillEdge, { backgroundColor: darken(colors.purple, 40) }]}>
                <View
                  style={[
                    styles.playPillTop,
                    { backgroundColor: colors.purple, marginTop: pressed ? 3 : 0, marginBottom: pressed ? 0 : 3 },
                  ]}
                >
                  <Icon name="play" size={16} color={colors.textOnYellow} />
                  <AppText variant="labelSM" color={colors.textOnYellow}>
                    {played ? "Play again" : "Play now"}
                  </AppText>
                </View>
              </View>
            </View>
          </Card>
        )}
      </Pressable>

      <Pressable
        onPress={onOpenLeaderboard}
        accessibilityRole="button"
        role="button"
        accessibilityLabel={`Ghana League leaderboard. You're rank ${youRank}.`}
      >
        <Card style={styles.leagueTeaser}>
          <IconWell backgroundColor={colors.surfaceYellow} size={52} radius={26}>
            <Icon name="trophy" size={24} color={colors.warning} />
          </IconWell>
          <View style={styles.flex}>
            <AppText variant="labelMD">Ghana League</AppText>
            <AppText variant="caption" color={colors.textSubtle}>
              You're rank #{youRank} this week
            </AppText>
          </View>
          <View style={styles.rankBadge}>
            <AppText variant="labelSM" color={colors.textOnYellow}>
              #{youRank}
            </AppText>
          </View>
          <Icon name="chevron-forward" size={20} color={colors.textSubtle} />
        </Card>
      </Pressable>
    </View>
  );
}

function createStyles(colors: Palette) {
  return {
    body: { gap: spacing.md },
    flex: { flex: 1, minWidth: 0 },
    heroCard: {
      borderRadius: radii["3xl"],
      paddingTop: spacing.xl,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
      overflow: "hidden" as const,
      gap: spacing.md,
    },
    heroRow: { flexDirection: "row" as const, alignItems: "center" as const },
    heroStat: { flex: 1, alignItems: "center" as const, gap: 4 },
    heroDivider: { width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.14)" },
    heroNum: { marginTop: 2 },
    heroTrack: {
      height: 8,
      borderRadius: radii.full,
      backgroundColor: "rgba(255,255,255,0.12)",
      overflow: "hidden" as const,
    },
    heroFill: { height: "100%" as const, borderRadius: radii.full },
    challengeCard: { gap: spacing.md },
    levelTag: { alignSelf: "flex-start" as const },
    challengeTop: { flexDirection: "row" as const, alignItems: "center" as const, gap: 14 },
    challengeFooter: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
    },
    leagueTeaser: { flexDirection: "row" as const, alignItems: "center" as const, gap: spacing.md },
    rankBadge: {
      backgroundColor: colors.purple,
      borderRadius: radii.full,
      paddingVertical: 4,
      paddingHorizontal: 10,
    },
    playPillEdge: { borderRadius: radii.full, alignSelf: "flex-start" as const },
    playPillTop: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 6,
      borderRadius: radii.full,
      paddingVertical: 9,
      paddingHorizontal: 18,
    },
  };
}
