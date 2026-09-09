import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { AppText, PinInput, Screen, ScreenHeader } from "../components/ui";
import { fonts, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

const CODE_LENGTH = 6;

type Props = {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
};

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9) return "+233 •• ••• ••••";
  const last9 = digits.slice(-9);
  return `+233 ${last9.slice(0, 2)} ${last9.slice(2, 5)} ${last9.slice(5)}`;
}

export default function OtpVerifyScreen({ phone, onVerified, onBack }: Props) {
  const colors = useColors();
  const styles = usePaletteStyles(createStyles);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (code.length !== CODE_LENGTH) return;
    setVerifying(true);
    const t = setTimeout(() => {
      onVerified();
    }, 900);
    return () => clearTimeout(t);
  }, [code, onVerified]);

  const resend = () => {
    setCode("");
    setVerifying(false);
  };

  return (
    <Screen scroll>
      <ScreenHeader title="Verify your number" onBack={onBack} />

      <View style={styles.body}>
        <AppText variant="bodyMD" align="center">
          Enter the {CODE_LENGTH}-digit code sent to
        </AppText>
        <AppText variant="labelLG" align="center">
          {formatPhone(phone)}
        </AppText>

        <View style={styles.dotsWrap}>
          <PinInput
            length={CODE_LENGTH}
            value={code}
            onChangeText={setCode}
            editable={!verifying}
            autoFocus
            textContentType="oneTimeCode"
          />
          {verifying ? <ActivityIndicator color={colors.purple} style={styles.spinner} /> : null}
        </View>

        <Pressable
          onPress={resend}
          disabled={verifying}
          accessibilityLabel="Resend code"
          hitSlop={8}
          style={styles.resend}
        >
          <AppText variant="bodySM" color={colors.textSecondary}>
            Didn't get it?{" "}
          </AppText>
          <AppText variant="bodySM" color={colors.purple} style={styles.resendStrong}>
            Resend code
          </AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

function createStyles(colors: Palette) {
  return {
    body: {
      paddingHorizontal: spacing.screenX,
      paddingTop: spacing.xl,
      gap: spacing["2xl"],
    },
    dotsWrap: {
      alignItems: "center" as const,
      gap: spacing.md,
    },
    spinner: {
      marginTop: spacing.xs,
    },
    resend: {
      flexDirection: "row" as const,
      justifyContent: "center" as const,
      minHeight: 40,
      alignItems: "center" as const,
    },
    resendStrong: {
      fontFamily: fonts.body.bold,
    },
  };
}
