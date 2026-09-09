import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, Card, Icon, IconWell, Screen, ScreenHeader } from "../components/ui";
import { colors, radii, spacing } from "../theme";

type Props = { onBack: () => void };
type IonName = ComponentProps<typeof Ionicons>["name"];
type GameId = "phrase" | "scam";

type QuizQuestion = {
  id: string;
  prompt: string;
  meta?: string;
  options: { label: string; correct: boolean }[];
  explanation: string;
};

const BADGES: { icon: IonName; label: string; desc: string; color: string; earned: boolean }[] = [
  { icon: "mic", label: "First voice command", desc: "Completed a spoken flow with Aya", color: colors.washYellow, earned: true },
  { icon: "shield-checkmark", label: "PIN never spoken", desc: "Confirmed with biometrics, not your voice", color: colors.washGreen, earned: true },
  { icon: "swap-horizontal", label: "Code-switch pro", desc: "Mixed Akan/Ewe/English in one sentence", color: colors.washPurple, earned: true },
  { icon: "trending-up", label: "5 flows in a week", desc: "Used Aya for money 5 times this week", color: colors.washBlue, earned: false },
];

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
    explanation: "This is Aya's normal spoken confirmation — it happens before every transaction.",
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

const GAMES: {
  id: GameId;
  icon: IonName;
  title: string;
  desc: string;
  color: string;
  build: () => QuizQuestion[];
}[] = [
  {
    id: "phrase",
    icon: "chatbubbles",
    title: "Phrase Match",
    desc: "Hear a Twi/Ewe money phrase, pick what it means",
    color: colors.washPurple,
    build: buildPhraseQuestions,
  },
  {
    id: "scam",
    icon: "shield-checkmark",
    title: "Spot the Scam",
    desc: "Safe or scam? Practice spotting PIN and OTP tricks",
    color: colors.washGreen,
    build: buildScamQuestions,
  },
];

function QuizPlayer({
  title,
  build,
  onExit,
}: {
  title: string;
  build: () => QuizQuestion[];
  onExit: () => void;
}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(build);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[index];
  const done = index >= questions.length;

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <Card style={styles.resultCard}>
        <IconWell backgroundColor={colors.washPurple} size={56} radius={20}>
          <Icon name="trophy" size={26} color={colors.purple} />
        </IconWell>
        <AppText variant="titleSM" align="center" style={styles.resultTitle}>
          {score} / {questions.length} correct
        </AppText>
        <AppText variant="bodySM" align="center">
          {pct >= 80
            ? "Great work — that's stuck!"
            : pct >= 50
              ? "Good start, try again for a better score."
              : "Practice a bit more and try again."}
        </AppText>
        <Pressable
          style={styles.primaryBtn}
          onPress={() => {
            setQuestions(build());
            setIndex(0);
            setScore(0);
            setSelected(null);
          }}
          accessibilityRole="button"
        >
          <AppText variant="labelMD" color={colors.white}>
            Play again
          </AppText>
        </Pressable>
        <Pressable style={styles.secondaryBtn} onPress={onExit} accessibilityRole="button">
          <AppText variant="labelMD">Back to games</AppText>
        </Pressable>
      </Card>
    );
  }

  const answered = selected !== null;

  return (
    <Card style={styles.quizCard}>
      <View style={styles.quizHead}>
        <AppText variant="caption">
          {title} · {index + 1} of {questions.length}
        </AppText>
        <Pressable onPress={onExit} accessibilityRole="button" accessibilityLabel="Exit game">
          <Icon name="close" size={20} color={colors.textSubtle} />
        </Pressable>
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
              accessibilityState={{ selected: isSelected }}
              style={[
                styles.option,
                showCorrect && styles.optionCorrect,
                showWrong && styles.optionWrong,
              ]}
            >
              <AppText variant="labelMD">{opt.label}</AppText>
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
          <Pressable
            style={styles.primaryBtn}
            onPress={() => {
              setSelected(null);
              setIndex((i) => i + 1);
            }}
            accessibilityRole="button"
          >
            <AppText variant="labelMD" color={colors.white}>
              {index + 1 === questions.length ? "See results" : "Next"}
            </AppText>
          </Pressable>
        </>
      ) : null}
    </Card>
  );
}

export default function GameScreen({ onBack }: Props) {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const earnedCount = BADGES.filter((b) => b.earned).length;
  const active = GAMES.find((g) => g.id === activeGame) ?? null;

  return (
    <Screen background={colors.white} scroll safeBottom={false}>
      <ScreenHeader
        title={active ? active.title : "Learn & Earn"}
        onBack={active ? () => setActiveGame(null) : onBack}
      />

      <View style={styles.body}>
        {active ? (
          <QuizPlayer key={active.id} title={active.title} build={active.build} onExit={() => setActiveGame(null)} />
        ) : (
          <>
            <Card style={styles.streakCard}>
              <IconWell backgroundColor={colors.washPurple} size={56} radius={20}>
                <Icon name="flame" size={26} color={colors.purple} />
              </IconWell>
              <View style={styles.flex}>
                <AppText variant="labelLG">5-day practice streak</AppText>
                <AppText variant="bodySM">
                  {earnedCount} of {BADGES.length} badges earned
                </AppText>
              </View>
            </Card>

            <AppText variant="headingSM" style={styles.section}>
              Badges
            </AppText>
            <View style={styles.badgeList}>
              {BADGES.map((badge) => (
                <Card key={badge.label} style={[styles.badgeRow, !badge.earned && styles.badgeRowLocked]}>
                  <IconWell backgroundColor={badge.earned ? badge.color : colors.surfaceGhost} size={44} radius={14}>
                    <Icon
                      name={badge.earned ? badge.icon : "lock-closed"}
                      size={20}
                      color={badge.earned ? colors.purple : colors.textSubtle}
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

            <AppText variant="headingSM" style={styles.section}>
              Mini games
            </AppText>
            <AppText variant="bodySM" style={styles.sectionHint}>
              Quick, offline games to build your voice-money confidence.
            </AppText>
            {GAMES.map((game) => (
              <Pressable
                key={game.id}
                onPress={() => setActiveGame(game.id)}
                accessibilityRole="button"
                accessibilityLabel={`Play ${game.title}`}
              >
                <Card style={styles.gameRow}>
                  <IconWell backgroundColor={game.color} size={48} radius={16}>
                    <Icon name={game.icon} size={22} color={colors.purple} />
                  </IconWell>
                  <View style={styles.flex}>
                    <AppText variant="labelMD">{game.title}</AppText>
                    <AppText variant="caption">{game.desc}</AppText>
                  </View>
                  <View style={styles.playBtn}>
                    <AppText variant="labelXS" color={colors.white}>
                      Play
                    </AppText>
                  </View>
                </Card>
              </Pressable>
            ))}
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  streakCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  section: {
    marginTop: spacing.sm,
  },
  sectionHint: {
    marginTop: -spacing.sm,
    marginBottom: spacing.xs,
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
  gameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  playBtn: {
    backgroundColor: colors.purple,
    borderRadius: radii.full,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  quizCard: {
    gap: spacing.md,
  },
  quizHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  langChip: {
    alignSelf: "flex-start",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
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
  primaryBtn: {
    backgroundColor: colors.purple,
    borderRadius: radii["2xl"],
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryBtn: {
    alignItems: "center",
    paddingVertical: 10,
  },
  resultCard: {
    alignItems: "center",
    gap: spacing.sm,
  },
  resultTitle: {
    marginTop: spacing.xs,
  },
});
