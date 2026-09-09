import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import {
  AppText,
  BrandLogo,
  Button,
  Icon,
  IconWell,
  PinInput,
  Screen,
  ScreenFooter,
  ScreenHeader,
  TextField,
} from "../components/ui";
import { fonts, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

const PIN_LENGTH = 4;

type Props = {
  onNext: () => void;
  onBack: () => void;
  onForgotPin: () => void;
  onSignup: () => void;
};

type Step = "phone" | "pin";

export default function LoginScreen({ onNext, onBack, onForgotPin, onSignup }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createStyles);
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const phoneValid = phone.replace(/\D/g, "").length >= 9;

  useEffect(() => {
    if (pin.length !== PIN_LENGTH) return;
    const t = setTimeout(onNext, 300);
    return () => clearTimeout(t);
  }, [pin, onNext]);

  if (step === "pin") {
    return (
      <Screen scroll>
        <ScreenHeader
          onBack={() => {
            setPin("");
            setStep("phone");
          }}
        />

        <View style={styles.pinBody}>
          <IconWell backgroundColor={colors.washPurple} size={56} radius={20}>
            <Icon name="lock-closed" size={26} color={colors.purple} />
          </IconWell>

          <AppText variant="labelLG" align="center">
            Enter your PIN
          </AppText>
          <AppText variant="bodySM" align="center" color={colors.textSecondary}>
            +233 {phone}
          </AppText>

          <PinInput length={PIN_LENGTH} value={pin} onChangeText={setPin} autoFocus />

          <Pressable onPress={onForgotPin} accessibilityLabel="Forgot PIN?" hitSlop={8}>
            <AppText variant="bodySM" color={colors.purple}>
              Forgot PIN?
            </AppText>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <ScreenHeader onBack={onBack} />

      <View style={styles.intro}>
        <BrandLogo height={40} />
        <AppText variant="titleLG" align="center" style={styles.introTitle}>
          Welcome back
        </AppText>
        <AppText variant="bodyMD" align="center" color={colors.textSecondary}>
          Enter your phone number to continue.
        </AppText>
      </View>

      <View style={styles.phoneBody}>
        <TextField
          label="Phone number"
          value={phone}
          onChangeText={(t) => setPhone(t.replace(/[^\d]/g, ""))}
          placeholder="24 123 4567"
          prefix="+233"
          keyboardType="phone-pad"
          maxLength={10}
          autoFocus
        />
      </View>

      <ScreenFooter>
        <Button onPress={() => setStep("pin")} disabled={!phoneValid} accessibilityLabel="Continue">
          Continue
        </Button>
        <Pressable
          onPress={onSignup}
          accessibilityLabel="Create a new account"
          hitSlop={8}
          style={styles.footerLink}
        >
          <AppText variant="bodySM" color={colors.textSecondary}>
            New to Aya?{" "}
          </AppText>
          <AppText variant="bodySM" color={colors.purple} style={styles.footerLinkStrong}>
            Create account
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
    phoneBody: {
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
    pinBody: {
      alignItems: "center" as const,
      paddingHorizontal: spacing.screenX,
      paddingTop: spacing.xl,
      gap: spacing.xl,
    },
  };
}
