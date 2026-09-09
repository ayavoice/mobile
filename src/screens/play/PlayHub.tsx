import { Pressable, View } from "react-native";
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

  return (
    <View style={styles.body}>
      <Card style={styles.statsCard}>
        <View style={styles.statCol}>
          <View style={styles.statTop}>
            <Icon name="flame" size={18} color={colors.warning} />
            <AppText variant="labelLG">{streak}</AppText>
          </View>
          <AppText variant="caption" color={colors.textSubtle}>
            day streak
          </AppText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCol}>
          <View style={styles.statTop}>
            <Icon name="star" size={18} color={colors.text} />
            <AppText variant="labelLG">{xp}</AppText>
          </View>
          <AppText variant="caption" color={colors.textSubtle}>
            XP
          </AppText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCol}>
          <View style={styles.statTop}>
            <Icon name="shield-checkmark" size={18} color={colors.successMid} />
            <AppText variant="labelLG">Lvl {levelIndex + 1}</AppText>
          </View>
          <AppText variant="caption" color={colors.textSubtle} numberOfLines={1}>
            {levelName}
          </AppText>
        </View>
      </Card>
      <View style={styles.levelTrack}>
        <View style={[styles.levelFill, { width: `${levelProgressPct * 100}%`, backgroundColor: colors.purple }]} />
      </View>

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
            <View style={styles.challengeTop}>
              <IconWell backgroundColor={colors.purple} size={48} radius={24}>
                <AppText variant="labelLG" color={colors.textOnYellow}>
                  A
                </AppText>
              </IconWell>
              <View style={styles.flex}>
                <AppText variant="overline" color={colors.text}>
                  🇬🇭 Ama's Market Day
                </AppText>
                <AppText variant="bodySM">Help Ama spend GH₵180 safely</AppText>
              </View>
              <StarRow count={stars} filledColor={colors.warning} emptyColor={colors.borderMuted} />
            </View>
            <View style={[styles.playPillEdge, { backgroundColor: darken(colors.purple, 40) }]}>
              <View
                style={[
                  styles.playPillTop,
                  { backgroundColor: colors.purple, marginTop: pressed ? 3 : 0, marginBottom: pressed ? 0 : 3 },
                ]}
              >
                <Icon name="play" size={14} color={colors.textOnYellow} />
                <AppText variant="labelSM" color={colors.textOnYellow}>
                  {played ? "Play again" : "Play now"}
                </AppText>
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
          <IconWell backgroundColor={colors.surfaceGhost} size={48} radius={24}>
            <Icon name="trophy" size={22} color={colors.warning} />
          </IconWell>
          <View style={styles.flex}>
            <AppText variant="labelMD">Ghana League</AppText>
            <AppText variant="caption" color={colors.textSubtle}>
              You're rank #{youRank} this week
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
    statsCard: { flexDirection: "row" as const, alignItems: "center" as const, paddingVertical: spacing.lg },
    statCol: { flex: 1, alignItems: "center" as const, gap: 2 },
    statTop: { flexDirection: "row" as const, alignItems: "center" as const, gap: 6 },
    statDivider: { width: 1, height: 28, backgroundColor: colors.borderMuted },
    levelTrack: {
      height: 6,
      borderRadius: radii.full,
      backgroundColor: colors.surfaceGhost,
      overflow: "hidden" as const,
      marginTop: -spacing.xs,
    },
    levelFill: { height: "100%" as const, borderRadius: radii.full },
    challengeCard: { gap: spacing.md },
    challengeTop: { flexDirection: "row" as const, alignItems: "center" as const, gap: 14 },
    leagueTeaser: { flexDirection: "row" as const, alignItems: "center" as const, gap: spacing.md },
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
