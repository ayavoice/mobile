import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, Button, Icon, IconWell, Screen, ScreenFooter, ScreenHeader } from "../components/ui";
import { colors, radii, spacing } from "../theme";

type Method = "finger" | "face" | "device";
type IonName = ComponentProps<typeof Ionicons>["name"];
type Props = { onSuccess: () => void; onBack: () => void };

const METHODS: { id: Method; icon: IonName; label: string }[] = [
  { id: "finger", icon: "finger-print", label: "Fingerprint" },
  { id: "face", icon: "scan", label: "Face unlock" },
  { id: "device", icon: "keypad", label: "Device unlock" },
];

export default function BiometricScreen({ onSuccess, onBack }: Props) {
  const [method, setMethod] = useState<Method>("finger");
  const [scanning, setScanning] = useState(false);

  const handleAuth = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(onSuccess, 1600);
  };

  const active = METHODS.find((m) => m.id === method)!;

  return (
    <Screen background={colors.white}>
      <ScreenHeader title="Confirm privately" onBack={onBack} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.privacy}>
          <IconWell backgroundColor={colors.white} size={40} radius={12}>
            <Icon name="mic-off" size={20} color={colors.successDark} />
          </IconWell>
          <View style={styles.flex}>
            <AppText variant="labelSM" color={colors.successDark}>
              Microphone is OFF
            </AppText>
            <AppText variant="caption" color={colors.successMid}>
              Voice capture stopped before authorization
            </AppText>
          </View>
        </View>

        <View>
          <AppText variant="body" align="center" style={styles.sub}>
            Never speak your PIN, use fingerprint, face, or device unlock.
          </AppText>
        </View>

        <View style={styles.methods}>
          {METHODS.map((m) => {
            const on = method === m.id;
            return (
              <Pressable
                key={m.id}
                onPress={() => setMethod(m.id)}
                accessibilityRole="button"
                role="button"
                accessibilityState={{ selected: on }}
                accessibilityLabel={m.label}
                style={[styles.method, on ? styles.methodOn : styles.methodOff]}
              >
                <Icon name={m.icon} size={28} color={colors.text} />
                <AppText variant="labelXS" align="center">
                  {m.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={handleAuth}
          accessibilityLabel={`Authenticate with ${active.label}`}
          style={[styles.auth, scanning ? styles.authOn : styles.authOff]}
        >
          <Icon
            name={active.icon}
            size={48}
            color={scanning ? colors.successBright : colors.text}
          />
          <AppText
            variant="labelXS"
            color={scanning ? colors.successBright : colors.textSubtle}
          >
            {scanning ? "Verifying…" : "Touch here"}
          </AppText>
        </Pressable>

        <View style={styles.warn}>
          <Icon name="warning" size={18} color={colors.warningDark} />
          <AppText variant="bodyXS" color={colors.warningDark} style={styles.textFlex}>
            Device unlock is your phone lock, not your Mobile Money PIN or OTP.
          </AppText>
        </View>
      </ScrollView>

      <ScreenFooter>
        <Button onPress={onBack} variant="ghost">
          Cancel
        </Button>
      </ScreenFooter>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    minHeight: 0,
  },
  body: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing["4xl"],
    paddingVertical: spacing.lg,
    gap: spacing["2xl"],
  },
  privacy: {
    width: "100%",
    backgroundColor: colors.successSurface,
    borderRadius: radii["2xl"],
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textFlex: {
    flex: 1,
    minWidth: 0,
  },
  sub: {
    marginTop: spacing.sm,
  },
  methods: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  method: {
    flex: 1,
    borderRadius: radii.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    alignItems: "center",
    gap: 6,
  },
  methodOn: {
    backgroundColor: colors.washPurple,
  },
  methodOff: {
    backgroundColor: colors.surfaceCard,
  },
  auth: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  authOn: {
    backgroundColor: colors.successSurface,
  },
  authOff: {
    backgroundColor: colors.surfaceCard,
  },
  warn: {
    width: "100%",
    backgroundColor: colors.surfaceCard,
    borderRadius: radii.lg,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
});
