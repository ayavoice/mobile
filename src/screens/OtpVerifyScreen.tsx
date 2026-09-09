import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { AppText, PinInput, Screen, ScreenHeader } from "../components/ui";
import { fonts, spacing, useColors, usePaletteStyles, type Palette } from "../theme";

const CODE_LENGTH = 4;

type Props = {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
};

export default function OtpVerifyScreen({ onVerified, onBack }: Props) {
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
          Enter the {CODE_LENGTH}-digit code sent to your phone
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
          {verifying ? <ActivityIndicator color={colors.text} style={styles.spinner} /> : null}
        </View>

        <Pressable
          onPress={resend}
          disabled={verifying}
          accessibilityRole="button"
          role="button"
          accessibilityLabel="Resend code"
          hitSlop={8}
          style={styles.resend}
        >
          <AppText variant="bodySM" color={colors.textSecondary}>
            Didn't get it?{" "}
          </AppText>
          <AppText variant="bodySM" color={colors.text} style={styles.resendStrong}>
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
