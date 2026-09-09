import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { AppText, Card, Icon } from "../../components/ui";
import { formatCurrency } from "../../lib/currency";
import { radii, spacing, useColors, usePaletteStyles, type Palette } from "../../theme";
import {
  OWARE_ROUNDS,
  OWARE_START_MONEY,
  OWARE_START_SAFETY,
  starsForSafety,
  xpForTier,
  type OwareChoice,
} from "../../content/play";
import { ChunkyButton, StarRow } from "./shared";

type LogEntry = { title: string; delta: number; tier: OwareChoice["tier"] };

const ACCENT_KEY = "purple" as const;

export default function OwareGame({
  bestScore,
  onExit,
  onFinish,
}: {
  bestScore: number;
  onExit: () => void;
  onFinish: (xpEarned: number, score: number, total: number) => void;
}) {
  const colors = useColors();
  const styles = usePaletteStyles(createStyles);
  const accent = colors[ACCENT_KEY];

  const [roundIndex, setRoundIndex] = useState(0);
  const [wallet, setWallet] = useState(OWARE_START_MONEY);
  const [safety, setSafety] = useState(OWARE_START_SAFETY);
  const [xp, setXp] = useState(0);
  const [bestCount, setBestCount] = useState(0);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [choice, setChoice] = useState<OwareChoice | null>(null);

  const round = OWARE_ROUNDS[roundIndex];
  const done = roundIndex >= OWARE_ROUNDS.length;

  useEffect(() => {
    if (done) onFinish(xp, bestCount, OWARE_ROUNDS.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function reset() {
    setRoundIndex(0);
    setWallet(OWARE_START_MONEY);
    setSafety(OWARE_START_SAFETY);
    setXp(0);
    setBestCount(0);
    setLog([]);
    setChoice(null);
  }

  function pick(c: OwareChoice) {
    setChoice(c);
    setWallet((w) => w + c.delta);
    setSafety((s) => Math.max(0, Math.min(100, s + c.safetyDelta)));
    setXp((x) => x + xpForTier(c.tier));
    if (c.tier === "best") setBestCount((n) => n + 1);
    setLog((l) => [...l, { title: round.title, delta: c.delta, tier: c.tier }]);
  }

  if (done) {
    const stars = starsForSafety(safety);
    const isNewBest = bestCount > 0 && bestCount > bestScore;
    return (
      <Card style={styles.resultCard}>
        <AppText variant="overline" color={colors.text}>
          Ama's Day
        </AppText>
        <StarRow count={stars} size={40} filledColor={colors.warning} emptyColor={colors.borderMuted} />
        {isNewBest ? (
          <View style={styles.newBestChip}>
            <Icon name="sparkles" size={14} color={colors.text} />
            <AppText variant="labelXS" color={colors.text}>
              New best!
            </AppText>
          </View>
        ) : null}

        <View style={styles.ledger}>
          <View style={styles.ledgerRow}>
            <AppText variant="bodySM">Starting money</AppText>
            <AppText variant="labelMD">{formatCurrency(OWARE_START_MONEY)}</AppText>
          </View>
          {log.map((entry, i) => (
            <View key={i} style={styles.ledgerRow}>
              <AppText variant="bodySM" numberOfLines={1} style={styles.ledgerLabel}>
                {entry.title}
              </AppText>
              <AppText variant="labelMD" color={entry.delta < 0 ? colors.danger : entry.delta > 0 ? colors.successDark : colors.textSubtle}>
                {entry.delta === 0 ? "±0" : `${entry.delta > 0 ? "+" : ""}${formatCurrency(entry.delta)}`}
              </AppText>
            </View>
          ))}
          <View style={[styles.ledgerRow, styles.ledgerDivider]}>
            <AppText variant="labelMD">Money remaining</AppText>
            <AppText variant="labelLG" color={colors.text}>
              {formatCurrency(wallet)}
            </AppText>
          </View>
          <View style={styles.ledgerRow}>
            <AppText variant="labelMD">Financial safety</AppText>
            <AppText variant="labelLG" color={colors.successDark}>
              {safety}%
            </AppText>
          </View>
        </View>

        <AppText variant="caption" color={colors.textSubtle}>
          +{xp} XP earned
        </AppText>

        <View style={styles.fullWidth}>
          <ChunkyButton label="Play again" icon="refresh" color={accent} onPress={reset} />
        </View>
        <Pressable style={styles.secondaryBtn} onPress={onExit} accessibilityRole="button" role="button">
          <AppText variant="labelMD">Back to games</AppText>
        </Pressable>
      </Card>
    );
  }

  const answered = choice !== null;

  return (
    <Card style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${(roundIndex / OWARE_ROUNDS.length) * 100}%`, backgroundColor: accent },
            ]}
          />
        </View>
        <Pressable onPress={onExit} accessibilityRole="button" role="button" accessibilityLabel="Exit game" hitSlop={8}>
          <Icon name="close" size={20} color={colors.textSubtle} />
        </Pressable>
      </View>

      <View style={styles.walletRow}>
        <View style={styles.walletChip}>
          <Icon name="wallet" size={14} color={colors.text} />
          <AppText variant="labelXS">{formatCurrency(wallet)}</AppText>
        </View>
        <View style={styles.walletChip}>
          <Icon name="shield-checkmark" size={14} color={colors.successMid} />
          <AppText variant="labelXS">{safety}% safe</AppText>
        </View>
        <AppText variant="caption" color={colors.textSubtle}>
          {roundIndex + 1} of {OWARE_ROUNDS.length}
        </AppText>
      </View>

      <View style={styles.situationRow}>
        <View style={[styles.roundIcon, { backgroundColor: colors.washPurple }]}>
          <Icon name={round.icon} size={20} color={colors.text} />
        </View>
        <View style={styles.flex}>
          <AppText variant="labelLG">{round.title}</AppText>
          <AppText variant="bodySM">{round.situation}</AppText>
        </View>
      </View>

      <View style={styles.choices}>
        {round.choices.map((c) => {
          const isSelected = choice?.id === c.id;
          const revealTier = answered && isSelected;
          return (
            <Pressable
              key={c.id}
              disabled={answered}
              onPress={() => pick(c)}
              accessibilityRole="button"
              role="button"
              accessibilityState={{ selected: isSelected }}
              style={[
                styles.choice,
                revealTier && c.tier === "best" && styles.choiceGood,
                revealTier && c.tier === "trap" && styles.choiceBad,
                revealTier && c.tier === "okay" && styles.choiceMid,
              ]}
            >
              <AppText variant="labelMD" style={styles.choiceLabel}>
                {c.label}
              </AppText>
              {revealTier ? (
                <Icon
                  name={c.tier === "best" ? "checkmark-circle" : c.tier === "trap" ? "close-circle" : "alert-circle"}
                  size={20}
                  color={c.tier === "best" ? colors.successDark : c.tier === "trap" ? colors.danger : colors.warning}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {answered && choice ? (
        <>
          <AppText variant="bodySM" style={styles.explanation}>
            {choice.feedback}
          </AppText>
          <ChunkyButton
            label={roundIndex + 1 === OWARE_ROUNDS.length ? "See results" : "Next"}
            icon="arrow-forward"
            iconTrailing
            color={accent}
            onPress={() => {
              setChoice(null);
              setRoundIndex((i) => i + 1);
            }}
          />
        </>
      ) : null}
    </Card>
  );
}

function createStyles(colors: Palette) {
  return {
    card: { gap: spacing.md },
    flex: { flex: 1, minWidth: 0 },
    fullWidth: { alignSelf: "stretch" as const },
    topRow: { flexDirection: "row" as const, alignItems: "center" as const, gap: spacing.md },
    progressTrack: {
      flex: 1,
      height: 8,
      borderRadius: radii.full,
      backgroundColor: colors.surfaceGhost,
      overflow: "hidden" as const,
    },
    progressFill: { height: "100%" as const, borderRadius: radii.full },
    walletRow: { flexDirection: "row" as const, alignItems: "center" as const, gap: spacing.sm },
    walletChip: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 4,
      backgroundColor: colors.surfaceCard,
      borderRadius: radii.full,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    situationRow: { flexDirection: "row" as const, alignItems: "flex-start" as const, gap: 12 },
    roundIcon: {
      width: 40,
      height: 40,
      borderRadius: 14,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      flexShrink: 0,
    },
    choices: { gap: spacing.sm },
    choice: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      gap: spacing.sm,
      backgroundColor: colors.surfaceCard,
      borderRadius: radii.lg,
      paddingVertical: 12,
      paddingHorizontal: spacing.lg,
    },
    choiceLabel: { flex: 1 },
    choiceGood: { backgroundColor: colors.successSurface },
    choiceBad: { backgroundColor: colors.dangerSurface },
    choiceMid: { backgroundColor: colors.surfaceWarning },
    explanation: { color: colors.textSecondary },
    secondaryBtn: { alignItems: "center" as const, paddingVertical: 10 },
    resultCard: { alignItems: "center" as const, gap: spacing.sm },
    newBestChip: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 4,
      backgroundColor: colors.surfaceGhost,
      borderRadius: radii.full,
      paddingVertical: 4,
      paddingHorizontal: 12,
    },
    ledger: { alignSelf: "stretch" as const, gap: 6, marginVertical: spacing.xs },
    ledgerRow: { flexDirection: "row" as const, alignItems: "center" as const, justifyContent: "space-between" as const, gap: spacing.md },
    ledgerLabel: { flex: 1 },
    ledgerDivider: {
      borderTopWidth: 1,
      borderTopColor: colors.borderMuted,
      paddingTop: 8,
      marginTop: 4,
    },
  };
}
