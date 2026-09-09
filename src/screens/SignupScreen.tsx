import { useState } from "react";
import { Pressable, View } from "react-native";
import { AppText, BrandLogo, Button, Screen, ScreenFooter, ScreenHeader, TextField } from "../components/ui";
import { fonts, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

type Props = { onNext: (phone: string) => void; onBack: () => void; onLogin: () => void };

export default function SignupScreen({ onNext, onBack, onLogin }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createStyles);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const phoneValid = phone.replace(/\D/g, "").length >= 9;
  const canContinue = name.trim().length > 1 && phoneValid;

  return (
    <Screen scroll>
      <ScreenHeader onBack={onBack} />

      <View style={styles.intro}>
        <BrandLogo height={40} />
        <AppText variant="titleLG" align="center" style={styles.introTitle}>
          Create your account
        </AppText>
        <AppText variant="bodyMD" align="center" color={colors.textSecondary}>
          A few details so Aya knows it's you.
        </AppText>
      </View>

      <View style={styles.body}>
        <TextField
          label="Full name"
          value={name}
          onChangeText={setName}
          placeholder="e.g. Kwame Mensah"
          autoCapitalize="words"
        />

        <TextField
          label="Phone number"
          value={phone}
          onChangeText={(t) => setPhone(t.replace(/[^\d]/g, ""))}
          placeholder="24 123 4567"
          prefix="+233"
          keyboardType="phone-pad"
          maxLength={10}
          helper="We'll text a 6-digit code to confirm it's you."
        />
      </View>

      <ScreenFooter>
        <Button onPress={() => onNext(phone)} disabled={!canContinue}>
          Continue
        </Button>
        <Pressable
          onPress={onLogin}
          accessibilityLabel="I already have an account"
          hitSlop={8}
          style={styles.footerLink}
        >
          <AppText variant="bodySM" color={colors.textSecondary}>
            Already have an account?{" "}
          </AppText>
          <AppText variant="bodySM" color={colors.purple} style={styles.footerLinkStrong}>
            Log in
          </AppText>
        </Pressable>
      </ScreenFooter>
    </Screen>
  );
}

function createStyles(colors: Palette) {
  return {
    intro: {
      alignItems: "center" as const,
      paddingHorizontal: spacing.screenX,
      paddingBottom: spacing.lg,
      gap: spacing.sm,
    },
    introTitle: {
      marginTop: spacing.xs,
    },
    body: {
      paddingHorizontal: spacing.screenX,
      paddingTop: spacing.sm,
      gap: spacing.xl,
    },
    footerLink: {
      flexDirection: "row" as const,
      justifyContent: "center" as const,
      minHeight: 40,
      alignItems: "center" as const,
    },
    footerLinkStrong: {
      fontFamily: fonts.body.bold,
    },
  };
}
