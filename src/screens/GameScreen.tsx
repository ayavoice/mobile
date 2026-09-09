import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, Card, Icon, IconWell, Screen, ScreenHeader } from "../components/ui";
import { radii, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

type Props = { onBack: () => void };
type IonName = ComponentProps<typeof Ionicons>["name"];
type GameId = "phrase" | "scam";
type GameProgress = { best: number; total: number };

type QuizQuestion = {
  id: string;
  prompt: string;
  meta?: string;
  options: { label: string; correct: boolean }[];
  explanation: string;
};

const OPTION_LETTERS = ["A", "B", "C", "D"];

function darken(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function starsFor(score: number, total: number): number {
  if (total === 0) return 0;
  const pct = score / total;
  if (pct >= 1) return 3;
  if (pct >= 0.6) return 2;
  if (score > 0) return 1;
  return 0;
}

function StarRow({
  count,
  size = 16,
  filledColor,
  emptyColor,
}: {
  count: number;
  size?: number;
  filledColor: string;
  emptyColor: string;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {[0, 1, 2].map((i) => (
        <Icon
          key={i}
          name={i < count ? "star" : "star-outline"}
          size={size}
          color={i < count ? filledColor : emptyColor}
        />
      ))}
    </View>
  );
}

const PHRASE_BANK: { languageLabel: string; transcript: string; gloss: string }[] = [
  { languageLabel: "Twi", transcript: "Me pɛ sɛ me sendi GH₵150 ma Kwame", gloss: "I want to send GH₵150 to Kwame" },
  { languageLabel: "Twi", transcript: "Me balance yɛ sɛn?", gloss: "What is my balance?" },
  { languageLabel: "Twi", transcript: "Me pɛ sɛ me tɔ airtime GH₵10", gloss: "I want to buy GH₵10 airtime" },
  { languageLabel: "Ewe", transcript: "Medi be maɖo GH₵150 ɖe Kwame", gloss: "I want to send GH₵150 to Kwame" },
  { languageLabel: "Ewe", transcript: "Nye balance ɖe?", gloss: "What is my balance?" },
  { languageLabel: "Ewe", transcript: "Medi be maƒle airtime GH₵10", gloss: "I want to buy GH₵10 airtime" },
];

const SCAM_BANK: { scenario: string; isScam: boolean; explanation: string }[] = [
  {
    scenario: "A caller says he's from MTN MoMo support and asks you to read out your PIN to \"verify your SIM.\"",
    isScam: true,
    explanation: "MTN and Aya will NEVER ask you to say or type your PIN to anyone over a call.",
  },
  {
    scenario: "Aya reads back \"You are about to send GH₵150 to Kwame. Say continue or cancel\" before sending.",
    isScam: false,
    explanation: "This is Aya's normal spoken confirmation, it happens before every transaction.",
  },
  {
    scenario: "A text message says you won a promo and asks you to reply with your 4-digit MoMo PIN to claim GH₵1000.",
    isScam: true,
    explanation: "No real promo needs your PIN. Delete it and never reply with your PIN.",
  },
  {
    scenario: "The app asks you to confirm with your fingerprint or face before a transfer goes through.",
    isScam: false,
    explanation: "Device authentication (fingerprint, face, or device PIN) is how Aya keeps your money safe.",
  },
  {
    scenario: "Someone calls claiming to be a relative in trouble, urgently asking you to read out the OTP code you just received.",
    isScam: true,
    explanation: "An OTP is only for you. Reading it out loud to anyone hands them your account.",
  },
  {
    scenario: "Before executing, Aya asks you to confirm the recipient's name and the amount out loud.",
    isScam: false,
    explanation: "Reviewing the recipient and amount before it sends is exactly how Aya prevents mistakes.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildPhraseQuestions(): QuizQuestion[] {
  return shuffle(PHRASE_BANK).map((item, i) => {
    const distractors = shuffle(
      PHRASE_BANK.filter((p) => p.gloss !== item.gloss).map((p) => p.gloss),
    ).slice(0, 2);
    const options = shuffle([
      { label: item.gloss, correct: true },
      ...distractors.map((label) => ({ label, correct: false })),
    ]);
    return {
      id: `phrase-${i}`,
      prompt: `“${item.transcript}”`,
      meta: item.languageLabel,
      options,
      explanation: `${item.languageLabel}: “${item.transcript}” means “${item.gloss}.”`,
    };
  });
}

function buildScamQuestions(): QuizQuestion[] {
  return shuffle(SCAM_BANK).map((item, i) => ({
    id: `scam-${i}`,
    prompt: item.scenario,
    options: shuffle([
      { label: "Safe", correct: !item.isScam },
      { label: "Scam", correct: item.isScam },
    ]),
    explanation: item.explanation,
  }));
}

function gamesFor(colors: Palette): {
  id: GameId;
  icon: IonName;
  title: string;
  desc: string;
  wash: string;
  accent: string;
  build: () => QuizQuestion[];
}[] {
  return [
    {
      id: "phrase",
      icon: "chatbubbles",
      title: "Phrase Match",
      desc: "Hear a Twi/Ewe money phrase, pick what it means",
      wash: colors.washPurple,
      accent: colors.purple,
      build: buildPhraseQuestions,
    },
    {
      id: "scam",
      icon: "shield-checkmark",
      title: "Spot the Scam",
      desc: "Safe or scam? Practice spotting PIN and OTP tricks",
      wash: colors.washGreen,
      accent: colors.successMid,
      build: buildScamQuestions,
    },
  ];
}

function QuizPlayer({
  title,
  build,
  bestScore,
  onExit,
  onFinish,
  colors,
  styles,
}: {
  title: string;
  build: () => QuizQuestion[];
  bestScore: number;
  onExit: () => void;
  onFinish: (score: number, total: number) => void;
  colors: Palette;
  styles: ReturnType<typeof createGameStyles>;
}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(build);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[index];
  const done = index >= questions.length;

  useEffect(() => {
    if (done) onFinish(score, questions.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const stars = starsFor(score, questions.length);
    const isNewBest = score > 0 && score > bestScore;
    return (
      <Card style={styles.resultCard}>
        <StarRow count={stars} size={40} filledColor={colors.warning} emptyColor={colors.borderMuted} />
        <AppText variant="titleSM" align="center" style={styles.resultTitle}>
          {score} / {questions.length} correct
        </AppText>
        {isNewBest ? (
          <View style={styles.newBestChip}>
            <Icon name="sparkles" size={14} color={colors.purple} />
            <AppText variant="labelXS" color={colors.purple}>
              New best!
            </AppText>
          </View>
        ) : null}
        <AppText variant="bodySM" align="center">
          {pct >= 80
            ? "Great work, that's stuck!"
            : pct >= 50
              ? "Good start, try again for a better score."
              : "Practice a bit more and try again."}
        </AppText>
        <View style={[styles.chunkyWrap, { backgroundColor: darken(colors.purple, 40) }]}>
          <Pressable
            style={({ pressed }) => [
              styles.chunkyBase,
              { backgroundColor: colors.purple, marginBottom: pressed ? 0 : 4, marginTop: pressed ? 4 : 0 },
            ]}
            onPress={() => {
              setQuestions(build());
              setIndex(0);
              setScore(0);
              setSelected(null);
            }}
            accessibilityRole="button"
            role="button"
          >
            <Icon name="refresh" size={18} color={colors.white} />
            <AppText variant="labelMD" color={colors.white}>
              Play again
            </AppText>
          </Pressable>
        </View>
        <Pressable style={styles.secondaryBtn} onPress={onExit} accessibilityRole="button" role="button">
          <AppText variant="labelMD">Back to games</AppText>
        </Pressable>
      </Card>
    );
  }

  const answered = selected !== null;

  return (
    <Card style={styles.quizCard}>
      <View style={styles.quizTopRow}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${(index / questions.length) * 100}%`, backgroundColor: colors.purple },
            ]}
          />
        </View>
        <Pressable onPress={onExit} accessibilityRole="button" role="button" accessibilityLabel="Exit game" hitSlop={8}>
          <Icon name="close" size={20} color={colors.textSubtle} />
        </Pressable>
      </View>

      <View style={styles.quizMetaRow}>
        <AppText variant="caption">
          {title} · {index + 1} of {questions.length}
        </AppText>
        <View style={styles.scoreChip}>
          <Icon name="star" size={13} color={colors.warning} />
          <AppText variant="labelXS">{score}</AppText>
        </View>
      </View>

      {question.meta ? (
        <View style={styles.langChip}>
          <AppText variant="caption" color={colors.white}>
            {question.meta}
          </AppText>
        </View>
      ) : null}

      <AppText variant="headingSM" style={styles.prompt}>
        {question.prompt}
      </AppText>

      <View style={styles.options}>
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const showCorrect = answered && opt.correct;
          const showWrong = answered && isSelected && !opt.correct;
          return (
            <Pressable
              key={opt.label}
              disabled={answered}
              onPress={() => {
                setSelected(i);
                if (opt.correct) setScore((s) => s + 1);
              }}
              accessibilityRole="button"
              role="button"
              accessibilityState={{ selected: isSelected }}
              style={[
                styles.option,
                showCorrect && styles.optionCorrect,
                showWrong && styles.optionWrong,
              ]}
            >
              <View style={styles.optionLeft}>
                <View
                  style={[
                    styles.optionIndex,
                    showCorrect && { backgroundColor: colors.successMid },
                    showWrong && { backgroundColor: colors.danger },
                  ]}
                >
                  <AppText
                    variant="labelXS"
                    color={showCorrect || showWrong ? colors.white : colors.textSubtle}
                  >
                    {OPTION_LETTERS[i]}
                  </AppText>
                </View>
                <AppText variant="labelMD">{opt.label}</AppText>
              </View>
              {showCorrect ? <Icon name="checkmark-circle" size={20} color={colors.successDark} /> : null}
              {showWrong ? <Icon name="close-circle" size={20} color={colors.danger} /> : null}
            </Pressable>
          );
        })}
      </View>

      {answered ? (
        <>
          <AppText variant="bodySM" style={styles.explanation}>
            {question.explanation}
          </AppText>
          <View style={[styles.chunkyWrap, { backgroundColor: darken(colors.purple, 40) }]}>
            <Pressable
              style={({ pressed }) => [
                styles.chunkyBase,
                { backgroundColor: colors.purple, marginBottom: pressed ? 0 : 4, marginTop: pressed ? 4 : 0 },
              ]}
              onPress={() => {
                setSelected(null);
                setIndex((i) => i + 1);
              }}
              accessibilityRole="button"
              role="button"
            >
              <AppText variant="labelMD" color={colors.white}>
                {index + 1 === questions.length ? "See results" : "Next"}
              </AppText>
              <Icon name="arrow-forward" size={18} color={colors.white} />
            </Pressable>
          </View>
        </>
      ) : null}
    </Card>
  );
}

export default function GameScreen({ onBack }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createGameStyles);
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [progress, setProgress] = useState<Record<GameId, GameProgress>>({
    phrase: { best: 0, total: 0 },
    scam: { best: 0, total: 0 },
  });
  const GAMES = gamesFor(colors);
  const active = GAMES.find((g) => g.id === activeGame) ?? null;
  const totalStars = GAMES.reduce(
    (sum, g) => sum + starsFor(progress[g.id].best, progress[g.id].total),
    0,
  );

  const handleFinish = (id: GameId, score: number, total: number) => {
    setProgress((p) => ({
      ...p,
      [id]: { best: Math.max(p[id].best, score), total },
    }));
  };

  return (
    <Screen background={colors.white} scroll safeBottom={false}>
      <ScreenHeader
        title={active ? active.title : "Learn"}
        onBack={active ? () => setActiveGame(null) : onBack}
      />

      <View style={styles.body}>
        {active ? (
          <QuizPlayer
            key={active.id}
            title={active.title}
            build={active.build}
            bestScore={progress[active.id].best}
            onExit={() => setActiveGame(null)}
            onFinish={(score, total) => handleFinish(active.id, score, total)}
            colors={colors}
            styles={styles}
          />
        ) : (
          <>
            <View style={styles.sectionHead}>
              <View style={styles.sectionHeadTitle}>
                <Icon name="game-controller" size={20} color={colors.purple} />
                <AppText variant="headingSM">Mini games</AppText>
              </View>
              <View style={styles.totalStarsChip}>
                <Icon name="star" size={14} color={colors.warning} />
                <AppText variant="labelXS">{totalStars}/{GAMES.length * 3}</AppText>
              </View>
            </View>
            <AppText variant="bodySM" style={styles.sectionHint}>
              Quick, offline games to build your voice-money confidence.
            </AppText>

            {GAMES.map((game) => {
              const gp = progress[game.id];
              const stars = starsFor(gp.best, gp.total);
              const played = gp.total > 0;
              const edge = darken(game.accent, 40);
              return (
                <Pressable
                  key={game.id}
                  onPress={() => setActiveGame(game.id)}
                  accessibilityRole="button"
                  role="button"
                  accessibilityLabel={`Play ${game.title}. ${
                    played ? `Best score ${gp.best} of ${gp.total}.` : "Not played yet."
                  }`}
                >
                  {({ pressed }) => (
                    <Card style={styles.gameCard}>
                      <View style={styles.gameCardTop}>
                        <IconWell backgroundColor={game.accent} size={52} radius={18}>
                          <Icon name={game.icon} size={24} color={colors.white} />
                        </IconWell>
                        <View style={styles.flex}>
                          <AppText variant="labelLG">{game.title}</AppText>
                          <AppText variant="caption">{game.desc}</AppText>
                        </View>
                      </View>
                      <View style={styles.gameCardFooter}>
                        <View style={styles.gameCardMeta}>
                          <StarRow
                            count={stars}
                            filledColor={colors.warning}
                            emptyColor={colors.borderMuted}
                          />
                          <AppText variant="caption" color={colors.textSubtle}>
                            {played ? `Best ${gp.best}/${gp.total}` : "Not played yet"}
                          </AppText>
                        </View>
                        <View style={[styles.playPillEdge, { backgroundColor: edge }]}>
                          <View
                            style={[
                              styles.playPillTop,
                              {
                                backgroundColor: game.accent,
                                marginTop: pressed ? 3 : 0,
                                marginBottom: pressed ? 0 : 3,
                              },
                            ]}
                          >
                            <Icon name="play" size={14} color={colors.white} />
                            <AppText variant="labelSM" color={colors.white}>
                              Play
                            </AppText>
                          </View>
                        </View>
                      </View>
                    </Card>
                  )}
                </Pressable>
              );
            })}
          </>
        )}
      </View>
    </Screen>
  );
}

function createGameStyles(colors: Palette) {
  return {
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  sectionHead: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  sectionHeadTitle: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: spacing.sm,
  },
  totalStarsChip: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  sectionHint: {
    marginTop: -spacing.xs,
    marginBottom: spacing.xs,
  },
  gameCard: {
    gap: spacing.lg,
  },
  gameCardTop: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 14,
  },
  gameCardFooter: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  gameCardMeta: {
    gap: 4,
  },
  playPillEdge: {
    borderRadius: radii.full,
  },
  playPillTop: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 6,
    borderRadius: radii.full,
    paddingVertical: 9,
    paddingHorizontal: 18,
  },
  quizCard: {
    gap: spacing.md,
  },
  quizTopRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: spacing.md,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceGhost,
    overflow: "hidden" as const,
  },
  progressFill: {
    height: "100%" as const,
    borderRadius: radii.full,
  },
  quizMetaRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  scoreChip: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  langChip: {
    alignSelf: "flex-start" as const,
    backgroundColor: colors.purple,
    borderRadius: radii.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  prompt: {
    lineHeight: 28,
  },
  options: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
  },
  optionLeft: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
    flexShrink: 1,
  },
  optionIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: colors.surfaceGhost,
  },
  optionCorrect: {
    backgroundColor: colors.successSurface,
  },
  optionWrong: {
    backgroundColor: colors.dangerSurface,
  },
  explanation: {
    color: colors.textSecondary,
  },
  chunkyWrap: {
    borderRadius: radii["2xl"],
  },
  chunkyBase: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: spacing.sm,
    borderRadius: radii["2xl"],
    paddingVertical: 14,
  },
  secondaryBtn: {
    alignItems: "center" as const,
    paddingVertical: 10,
  },
  resultCard: {
    alignItems: "center" as const,
    gap: spacing.sm,
  },
  resultTitle: {
    marginTop: spacing.xs,
  },
  newBestChip: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
    backgroundColor: colors.washPurple,
    borderRadius: radii.full,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  };
}
