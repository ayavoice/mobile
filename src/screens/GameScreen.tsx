import { useState } from "react";
import { View } from "react-native";
import { Screen, ScreenHeader } from "../components/ui";
import { spacing, useColors, usePaletteStyles, type Palette } from "../theme";
import { INITIAL_PROGRESS, levelForXp } from "../content/play";
import PlayHub from "./play/PlayHub";
import OwareGame from "./play/OwareGame";
import LeaderboardScreen from "./play/LeaderboardScreen";

type Props = { onBack: () => void };
type PlayView = "hub" | "play" | "leaderboard";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function GameScreen({ onBack }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createStyles);

  const [view, setView] = useState<PlayView>("hub");
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastPlayedDate, setLastPlayedDate] = useState<string | null>(null);
  const [progress, setProgress] = useState(INITIAL_PROGRESS);

  const level = levelForXp(xp);

  function recordSession(xpEarned: number, score: number, total: number) {
    setXp((x) => x + xpEarned);
    setProgress((p) => ({ best: Math.max(p.best, score), total, plays: p.plays + 1 }));
    const today = todayKey();
    setLastPlayedDate((prevDate) => {
      if (prevDate === today) return prevDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      setStreak((s) => (prevDate === yesterday ? s + 1 : 1));
      return today;
    });
  }

  const title = view === "play" ? "Ama's Market Day" : view === "leaderboard" ? "Ghana League" : "AYA Learn";
  const headerBack = view === "hub" ? onBack : () => setView("hub");

  return (
    <Screen background={colors.white} scroll safeBottom={false}>
      <ScreenHeader title={title} onBack={headerBack} />
      <View style={styles.body}>
        {view === "play" ? (
          <OwareGame
            bestScore={progress.best}
            onExit={() => setView("hub")}
            onFinish={(xpEarned, score, total) => recordSession(xpEarned, score, total)}
          />
        ) : view === "leaderboard" ? (
          <LeaderboardScreen xp={xp} />
        ) : (
          <PlayHub
            xp={xp}
            streak={streak}
            levelName={level.name}
            levelIndex={level.index}
            levelProgressPct={level.progressPct}
            progress={progress}
            onPlay={() => setView("play")}
            onOpenLeaderboard={() => setView("leaderboard")}
          />
        )}
      </View>
    </Screen>
  );
}

function createStyles(_colors: Palette) {
  return {
    body: {
      padding: spacing.xl,
      gap: spacing.md,
    },
  };
}
