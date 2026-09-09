import { Platform } from "react-native";
import { createVideoPlayer, type VideoPlayer } from "expo-video";

export const orbVideoSource = require("../../assets/orb.mp4");

let cachedPlayer: VideoPlayer | null = null;

function configurePlayer(player: VideoPlayer) {
  player.loop = true;
  player.muted = true;
  player.volume = 0;
}

/** Shared orb player — created once and reused everywhere the orb appears. */
export function getOrbPlayer(): VideoPlayer {
  if (!cachedPlayer) {
    cachedPlayer = createVideoPlayer(orbVideoSource);
    configurePlayer(cachedPlayer);
    cachedPlayer.play();
  }
  return cachedPlayer;
}

/** Start decoding the orb loop before a screen that shows it opens. */
export function preloadOrbVideo() {
  if (Platform.OS === "web") return;
  getOrbPlayer();
}

export function isOrbVideoReady(player: VideoPlayer) {
  return player.status === "readyToPlay";
}
