import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText, Screen, VoiceWave } from "../components/ui";
import { useAppPrefs } from "../context/AppPrefs";
import { colors, radii, spacing } from "../theme";

type Props = { onNext: () => void; onBack: () => void };

const FIRST_WORD_DELAY_MS = 500;
const WORD_STEP_MS = 90;
const ADVANCE_MS = 900;

export default function ListeningScreen({ onNext, onBack }: Props) {
  const { flow } = useAppPrefs();
  const words = useMemo(
    () => flow.utterance.transcript.split(" "),
    [flow.utterance.transcript],
  );
  const [revealedCount, setRevealedCount] = useState(0);
  const transcriptSoFar = words.slice(0, revealedCount).join(" ");
  const done = revealedCount >= words.length && words.length > 0;

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    setRevealedCount(0);

    const revealNext = (i: number) => {
      if (cancelled) return;
      setRevealedCount(i);
      if (i < words.length) {
        timeoutId = setTimeout(() => revealNext(i + 1), WORD_STEP_MS);
      } else {
        timeoutId = setTimeout(() => {
          if (!cancelled) onNext();
        }, ADVANCE_MS);
      }
    };

    timeoutId = setTimeout(() => revealNext(1), FIRST_WORD_DELAY_MS);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [onNext, words]);

  return (
    <Screen background={colors.white}>
      <Pressable onPress={onBack} accessibilityLabel="Cancel listening" style={styles.flex}>
        <View style={styles.body}>
          <Pressable onPress={onNext} accessibilityLabel="Finish speaking" style={styles.waveWrap}>
            <VoiceWave />
          </Pressable>
          <AppText variant="titleLG" align="center" color="#4A4A4A" style={styles.listening}>
            Listening...
          </AppText>
        </View>

        <View style={styles.bubble}>
          <AppText variant="body" color={colors.text}>
            {transcriptSoFar || " "}
            {!done ? "…" : ""}
          </AppText>
        </View>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing["3xl"],
  },
  waveWrap: {
    width: "100%",
    alignItems: "center",
  },
  listening: {
    fontWeight: "600",
  },
  bubble: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing["4xl"],
    backgroundColor: colors.white,
    borderRadius: radii["3xl"],
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    minHeight: 72,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    borderWidth: 0,
    borderColor: "transparent",
  },
});
