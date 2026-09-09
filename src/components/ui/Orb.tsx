import { VideoView } from "expo-video";
import { useEffect, useMemo } from "react";
import { View, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { getOrbPlayer, isOrbVideoReady } from "../../lib/orbPlayer";

export type OrbState = "idle" | "listening" | "thinking";
type OrbProps = {
  size?: number;
  state?: OrbState;
  /** Fade + scale in the moment this mounts. */
  animateIn?: boolean;
};

const VIDEO_ZOOM = 1.72;
const ENTRANCE_MS = 520;
const REVEAL_MS = 240;
const BREATHE_MS = 2400;

/** Aya's spoken-flow avatar — loops `assets/orb.mp4` behind a circular mask, always silent. */
export default function Orb({ size = 220, state = "idle", animateIn = false }: OrbProps) {
  const player = useMemo(() => getOrbPlayer(), []);
  const ready = isOrbVideoReady(player);

  const entrance = useSharedValue(animateIn ? 0 : 1);
  const videoReveal = useSharedValue(ready ? 1 : 0);
  const breathe = useSharedValue(0);
  const drift = useSharedValue(0);

  const breatheAmp = state === "listening" ? 0.035 : state === "thinking" ? 0.02 : 0.012;
  const breatheMs = state === "listening" ? BREATHE_MS * 0.7 : BREATHE_MS;

  const frame = size * VIDEO_ZOOM;
  const inset = (frame - size) / 2;

  useEffect(() => {
    player.muted = true;
    player.volume = 0;
    player.loop = true;
    player.play();
  }, [player]);

  useEffect(() => {
    if (isOrbVideoReady(player)) {
      videoReveal.value = 1;
      return;
    }
    const subscription = player.addListener("statusChange", ({ status }) => {
      if (status !== "readyToPlay") return;
      videoReveal.value = withTiming(1, { duration: REVEAL_MS, easing: Easing.out(Easing.cubic) });
    });
    return () => subscription.remove();
  }, [player, videoReveal]);

  useEffect(() => {
    if (!animateIn) {
      entrance.value = 1;
      return;
    }
    entrance.value = 0;
    entrance.value = withTiming(1, { duration: ENTRANCE_MS, easing: Easing.out(Easing.cubic) });
  }, [animateIn, entrance]);

  useEffect(() => {
    breathe.value = withRepeat(
      withTiming(1, { duration: breatheMs, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [breathe, breatheMs]);

  useEffect(() => {
    drift.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 8000, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 8000, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [drift]);

  const shellStyle = useAnimatedStyle(() => {
    const enterScale = 0.84 + entrance.value * 0.16;
    const breatheScale = 1 + breathe.value * breatheAmp;
    return {
      opacity: entrance.value,
      transform: [{ scale: enterScale * breatheScale }],
    };
  });

  const videoDriftStyle = useAnimatedStyle(() => ({
    opacity: videoReveal.value * entrance.value,
    transform: [
      { translateX: (drift.value - 0.5) * size * 0.025 },
      { translateY: (drift.value - 0.5) * -size * 0.018 },
    ],
  }));

  const revealVideo = () => {
    videoReveal.value = withTiming(1, { duration: REVEAL_MS, easing: Easing.out(Easing.cubic) });
    player.play();
  };

  return (
    <Animated.View
      style={[{ width: size, height: size }, shellStyle]}
      accessibilityRole="image"
      accessibilityLabel={
        state === "listening" ? "Listening" : state === "thinking" ? "Thinking" : "Idle"
      }
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Animated.View
          style={[
            { width: frame, height: frame, marginLeft: -inset, marginTop: -inset },
            videoDriftStyle,
          ]}
        >
          <VideoView
            player={player}
            style={{ width: frame, height: frame, mixBlendMode: "multiply" as ViewStyle["mixBlendMode"] }}
            contentFit="cover"
            nativeControls={false}
            playsInline
            fullscreenOptions={{ enable: false }}
            allowsPictureInPicture={false}
            onFirstFrameRender={revealVideo}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
}
