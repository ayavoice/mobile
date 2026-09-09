import { useState } from "react";
import { Pressable, View } from "react-native";
import { AppText, BrandLogo, Button, Icon, IconWell, Screen, ScreenFooter } from "../components/ui";
import { spacing, useColors, usePaletteStyles, type Palette } from "../theme";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type IonName = ComponentProps<typeof Ionicons>["name"];

function slidesFor(colors: Palette): {
  icon: IonName;
  title: string;
  body: string;
  color: string;
}[] {
  return [
    {
      icon: "mic",
      title: "Speak naturally",
      body: "Talk to Aya just like you would talk to a friend. No reading or typing needed.",
      color: colors.washPurple,
    },
    {
      icon: "globe-outline",
      title: "Use your language",
      body: "Akan/Twi, Ewe, or English — Aya understands you in the language you are most comfortable with.",
      color: colors.washBlue,
    },
    {
      icon: "lock-closed",
      title: "Authenticate privately",
      body: "Use your fingerprint or face to confirm. You never speak your PIN to Aya.",
      color: colors.washGreen,
    },
  ];
}

type Props = { onNext: () => void };

export default function OnboardingScreen({ onNext }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createOnboardingStyles);
  const [slide, setSlide] = useState(0);
  const SLIDES = slidesFor(colors);
  const s = SLIDES[slide];

  return (
    <Screen scroll>
      <BrandLogo height={36} style={{ marginTop: 8 }} />
      <View style={styles.body}>
        <IconWell backgroundColor={s.color} size={132} radius={44}>
          <Icon name={s.icon} size={52} color={colors.purple} />
        </IconWell>
        <View style={styles.copy}>
          <AppText variant="displayMD" align="center">
            {s.title}
          </AppText>
          <AppText variant="bodyLG" align="center" style={styles.bodyText}>
            {s.body}
          </AppText>
        </View>
      </View>

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <Pressable
            key={i}
            onPress={() => setSlide(i)}
            accessibilityLabel={`Slide ${i + 1}`}
            hitSlop={8}
            style={[styles.dot, i === slide ? styles.dotActive : styles.dotIdle]}
          />
        ))}
      </View>

      <ScreenFooter>
        {slide < 2 ? (
          <>
            <Button onPress={() => setSlide(slide + 1)}>Next</Button>
            <Button onPress={onNext} variant="ghost">
              Skip
            </Button>
          </>
        ) : (
          <Button onPress={onNext}>Get started</Button>
        )}
      </ScreenFooter>
    </Screen>
  );
}

function createOnboardingStyles(colors: Palette) {
  return {
    body: {
      flex: 1,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      paddingHorizontal: spacing["4xl"],
      gap: spacing["2xl"],
    },
    copy: {
      alignItems: "center" as const,
    },
    bodyText: {
      marginTop: 14,
    },
    dots: {
      flexDirection: "row" as const,
      justifyContent: "center" as const,
      gap: spacing.sm,
      paddingBottom: spacing.sm,
      flexShrink: 0,
    },
    dot: {
      height: 8,
      borderRadius: 4,
    },
    dotActive: {
      width: 28,
      backgroundColor: colors.purple,
    },
    dotIdle: {
      width: 8,
      backgroundColor: colors.trackIdle,
    },
  };
}
