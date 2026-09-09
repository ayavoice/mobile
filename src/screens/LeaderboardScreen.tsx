import { View } from "react-native";
import { AppText, Avatar, Card, Icon, IconWell, Screen, ScreenHeader } from "../components/ui";
import { brandImages } from "../content/brand";
import { radii, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

type Props = { onBack: () => void };

type Leader = { name: string; image: keyof typeof brandImages; xp: number; isYou?: boolean };

const LEADERS: Leader[] = [
  { name: "Sourabh", image: "sourabh", xp: 480 },
  { name: "Aisha", image: "aisha", xp: 445 },
  { name: "Ricky", image: "ricky", xp: 410 },
  { name: "Pratik", image: "pratik", xp: 360, isYou: true },
  { name: "Sonya", image: "sonya", xp: 310 },
  { name: "Mansi", image: "mansi", xp: 275 },
  { name: "Palak", image: "palak", xp: 230 },
  { name: "Sandeepa", image: "sandeepa", xp: 190 },
];

const MEDAL_COLORS = ["#F5A524", "#B7BAC3", "#C08A5A"];

function RankBadge({ rank, colors }: { rank: number; colors: Palette }) {
  if (rank <= 3) {
    return (
      <IconWell backgroundColor={MEDAL_COLORS[rank - 1]} size={32} radius={16}>
        <Icon name="trophy" size={16} color={colors.white} />
      </IconWell>
    );
  }
  return (
    <View style={{ width: 32, alignItems: "center" }}>
      <AppText variant="labelSM" color={colors.textSubtle}>
        {rank}
      </AppText>
    </View>
  );
}

export default function LeaderboardScreen({ onBack }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createStyles);
  const you = LEADERS.find((l) => l.isYou);
  const yourRank = LEADERS.findIndex((l) => l.isYou) + 1;

  return (
    <Screen style={styles.root}>
      <ScreenHeader title="Leaderboard" onBack={onBack} />
      <View style={styles.body}>
        <Card style={styles.youCard}>
          <IconWell backgroundColor={colors.washYellow} size={44} radius={22}>
            <Icon name="trophy" size={20} color={colors.warning} />
          </IconWell>
          <View style={styles.flex}>
            <AppText variant="labelSM">
              You're #{yourRank} this week
            </AppText>
            <AppText variant="caption" color={colors.textSubtle}>
              {you?.xp ?? 0} XP · Play Learn games to climb up
            </AppText>
          </View>
        </Card>

        <View style={styles.list}>
          {LEADERS.map((leader, i) => {
            const rank = i + 1;
            return (
              <View
                key={leader.name}
                style={[
                  styles.row,
                  i < LEADERS.length - 1 && styles.rowDivider,
                  leader.isYou && styles.rowYou,
                ]}
              >
                <RankBadge rank={rank} colors={colors} />
                <Avatar source={brandImages[leader.image]} size={44} />
                <View style={styles.flex}>
                  <AppText variant="labelSM" numberOfLines={1}>
                    {leader.isYou ? "You" : leader.name}
                  </AppText>
                  <AppText variant="caption" color={colors.textSubtle}>
                    {leader.xp} XP
                  </AppText>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

function createStyles(colors: Palette) {
  return {
    root: { flex: 1 },
    body: {
      flex: 1,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
      gap: spacing.lg,
    },
    flex: { flex: 1, minWidth: 0 },
    youCard: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: spacing.md,
    },
    list: {
      backgroundColor: colors.surfaceCard,
      borderRadius: radii.xl,
      paddingHorizontal: spacing.lg,
    },
    row: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 14,
      paddingVertical: spacing.md,
    },
    rowDivider: {
      borderBottomWidth: 1,
      borderBottomColor: colors.borderMuted,
    },
    rowYou: {
      marginHorizontal: -spacing.lg,
      paddingHorizontal: spacing.lg,
      backgroundColor: colors.washYellow,
      borderRadius: radii.lg,
    },
  };
}
