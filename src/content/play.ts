import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export type IonName = ComponentProps<typeof Ionicons>["name"];

export type GameProgress = { best: number; total: number; plays: number };

export const INITIAL_PROGRESS: GameProgress = { best: 0, total: 0, plays: 0 };

// ---------------------------------------------------------------------------
// Level ladder
// ---------------------------------------------------------------------------

export const LEVELS: { name: string; min: number }[] = [
  { name: "New Learner", min: 0 },
  { name: "MoMo Smart", min: 100 },
  { name: "Safety Champion", min: 250 },
];

export function levelForXp(xp: number) {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) index = i;
  }
  const current = LEVELS[index];
  const next = LEVELS[index + 1] ?? null;
  const progressPct = next
    ? Math.min(1, Math.max(0, (xp - current.min) / (next.min - current.min)))
    : 1;
  return { index, name: current.name, min: current.min, next, progressPct };
}

// ---------------------------------------------------------------------------
// Ghana League (leaderboard)
// ---------------------------------------------------------------------------

export type LeagueTrend = "up" | "down" | "flat";

export type LeagueEntry = { name: string; xp: number; trend: LeagueTrend; isYou?: boolean };

export const MOCK_LEAGUE: { name: string; xp: number; trend: LeagueTrend }[] = [
  { name: "Ama", xp: 320, trend: "up" },
  { name: "Kofi", xp: 280, trend: "up" },
  { name: "Akua", xp: 240, trend: "down" },
  { name: "Kwame", xp: 190, trend: "flat" },
  { name: "Yaw", xp: 150, trend: "down" },
];

/** Ranks the mock Ghana League against the player's own XP. */
export function buildLeague(xp: number): { league: LeagueEntry[]; youRank: number } {
  const you: LeagueEntry = { name: "You", xp, trend: "flat", isYou: true };
  const league: LeagueEntry[] = [...MOCK_LEAGUE, you].sort((a, b) => b.xp - a.xp);
  const youRank = league.findIndex((entry) => entry.isYou) + 1;
  return { league, youRank };
}

// ---------------------------------------------------------------------------
// Oware: Money Moves — a short, local, mock money-decision game
// ---------------------------------------------------------------------------

export type OwareChoice = {
  id: string;
  label: string;
  delta: number;
  safetyDelta: number;
  tier: "best" | "okay" | "trap";
  feedback: string;
};

export type OwareRound = {
  id: string;
  icon: IonName;
  title: string;
  situation: string;
  choices: OwareChoice[];
};

export const OWARE_START_MONEY = 180;
export const OWARE_START_SAFETY = 70;

export const OWARE_ROUNDS: OwareRound[] = [
  {
    id: "transport",
    icon: "bus",
    title: "Transport to Kejetia",
    situation: "Ama needs GH₵30 for tro-tro fare to Kejetia market.",
    choices: [
      {
        id: "momo",
        label: "Pay the tro-tro fare with MoMo",
        delta: -30,
        safetyDelta: 5,
        tier: "best",
        feedback: "Smart — MoMo keeps a safe, clean record.",
      },
      {
        id: "pin",
        label: "\"MTN support\" offers a top-up if she reads her PIN",
        delta: -50,
        safetyDelta: -30,
        tier: "trap",
        feedback: "Scam — MTN never asks for your PIN.",
      },
      {
        id: "walk",
        label: "Walk instead to save the fare",
        delta: 0,
        safetyDelta: 0,
        tier: "okay",
        feedback: "Saved the cash, lost an hour of selling time.",
      },
    ],
  },
  {
    id: "school",
    icon: "book",
    title: "School supplies",
    situation: "Her daughter needs GH₵40 for exercise books today.",
    choices: [
      {
        id: "direct",
        label: "Pay the shop by MoMo herself",
        delta: -40,
        safetyDelta: 5,
        tier: "best",
        feedback: "Paying the shop directly gets the books there safely.",
      },
      {
        id: "runner",
        label: "A \"runner\" offers to buy them if she sends GH₵40 first",
        delta: -40,
        safetyDelta: -25,
        tier: "trap",
        feedback: "He disappears — never send money to a stranger first.",
      },
      {
        id: "wait",
        label: "Tell her to wait until tomorrow",
        delta: 0,
        safetyDelta: 0,
        tier: "okay",
        feedback: "Saved the cash, but she goes without books today.",
      },
    ],
  },
  {
    id: "customer",
    icon: "storefront",
    title: "A customer pays her",
    situation: "A customer sends GH₵70 by MoMo for fabric bought on credit.",
    choices: [
      {
        id: "separate",
        label: "Move it into her separate business wallet",
        delta: 70,
        safetyDelta: 10,
        tier: "best",
        feedback: "Keeping business money apart shows her real profit.",
      },
      {
        id: "mixed",
        label: "Spend GH₵15 of it on lunch right away",
        delta: 55,
        safetyDelta: -5,
        tier: "okay",
        feedback: "Mixed money is harder to track.",
      },
      {
        id: "untracked",
        label: "Not bother tracking it at all",
        delta: 70,
        safetyDelta: -10,
        tier: "trap",
        feedback: "No record means no proof if it's disputed.",
      },
    ],
  },
  {
    id: "message",
    icon: "mail",
    title: "A message arrives",
    situation: "\"You won GH₵2,000! Send GH₵50 now to claim it.\"",
    choices: [
      {
        id: "delete",
        label: "Delete it and block the number",
        delta: 0,
        safetyDelta: 20,
        tier: "best",
        feedback: "Real prizes never ask you to pay first.",
      },
      {
        id: "send",
        label: "Send the GH₵50 — it could be real",
        delta: -50,
        safetyDelta: -40,
        tier: "trap",
        feedback: "There was no prize — a common MoMo scam.",
      },
      {
        id: "reply",
        label: "Reply asking for more details first",
        delta: 0,
        safetyDelta: -10,
        tier: "okay",
        feedback: "Replying tells scammers your number is active.",
      },
    ],
  },
];

export function starsForSafety(safety: number): number {
  if (safety >= 85) return 3;
  if (safety >= 60) return 2;
  return 1;
}

export function xpForTier(tier: OwareChoice["tier"]): number {
  if (tier === "best") return 20;
  if (tier === "okay") return 10;
  return 5;
}
