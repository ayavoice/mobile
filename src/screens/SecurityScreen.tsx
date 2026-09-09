import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppText, Card, Icon, IconWell, Screen, ScreenHeader, Toggle } from "../components/ui";
import { colors, radii, spacing } from "../theme";

type Props = { onBack: () => void };

export default function SecurityScreen({ onBack }: Props) {
  const [biometric, setBiometric] = useState(true);

  return (
    <Screen background={colors.white} scroll>
      <ScreenHeader title="Security & Privacy" onBack={onBack} />

      <View style={styles.body}>
        <View style={styles.banner}>
          <View style={styles.bannerTitle}>
            <Icon name="lock-closed" size={20} color={colors.white} />
            <AppText variant="labelMD" color={colors.white}>
              Your PIN is always safe
            </AppText>
          </View>
          <AppText variant="bodySM" color={colors.dangerOnDark} style={styles.bannerBody}>
            Aya will NEVER ask for your Mobile Money PIN or OTP by voice. Voice stops before authorization. If anyone asks, it is a scam.
          </AppText>
        </View>

        <Card>
          <View style={styles.row}>
            <IconWell backgroundColor={colors.washPurple} size={48} radius={14}>
              <Icon name="finger-print" size={24} color={colors.text} />
            </IconWell>
            <View style={styles.flex}>
              <AppText variant="labelMD">Biometric authentication</AppText>
              <AppText variant="caption">
                Fingerprint, face, or device unlock after confirmation
              </AppText>
            </View>
            <Toggle
              value={biometric}
              onValueChange={setBiometric}
              accessibilityLabel="Biometric authentication"
            />
          </View>
          <View
            style={[
              styles.status,
              { backgroundColor: biometric ? colors.successSurface : colors.surfaceWarningSoft },
            ]}
          >
            <Icon
              name={biometric ? "checkmark-circle" : "warning"}
              size={16}
              color={biometric ? colors.success : colors.warningDark}
            />
            <AppText
              variant="caption"
              color={biometric ? colors.success : colors.warningDark}
              style={styles.statusText}
            >
              {biometric
                ? "Biometrics ON, money moves only after private device auth"
                : "Biometrics OFF, less secure"}
            </AppText>
          </View>
        </Card>

        <Card>
          <View style={styles.row}>
            <IconWell backgroundColor={colors.dangerSurface} size={48} radius={14}>
              <Icon name="mic" size={24} color={colors.danger} />
            </IconWell>
            <View style={styles.flex}>
              <AppText variant="labelMD">Voice PIN capture</AppText>
              <AppText variant="caption">Allow Aya to capture PIN by voice</AppText>
            </View>
            <View style={styles.never}>
              <AppText variant="labelXS" color={colors.danger}>
                NEVER
              </AppText>
            </View>
          </View>
          <View style={[styles.status, { backgroundColor: colors.dangerSurface }]}>
            <Icon name="lock-closed" size={16} color={colors.danger} />
            <AppText variant="caption" color={colors.danger} style={styles.statusText}>
              Permanently disabled. MoMo PINs are never spoken, captured, or stored by voice.
            </AppText>
          </View>
        </Card>

        <Card>
          <View style={styles.row}>
            <IconWell backgroundColor={colors.washBlue} size={48} radius={14}>
              <Icon name="mic-off" size={24} color={colors.text} />
            </IconWell>
            <View style={styles.flex}>
              <AppText variant="labelMD">Microphone during authentication</AppText>
              <AppText variant="caption">Required off before BiometricPrompt</AppText>
            </View>
            <View style={styles.never}>
              <AppText variant="labelXS" color={colors.success}>
                OFF
              </AppText>
            </View>
          </View>
          <View style={[styles.status, { backgroundColor: colors.successSurface }]}>
            <Icon name="checkmark-circle" size={16} color={colors.success} />
            <AppText variant="caption" color={colors.success} style={styles.statusText}>
              Locked OFF. After you say continue, Aya closes the mic and hands auth to the device.
            </AppText>
          </View>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  banner: {
    backgroundColor: colors.danger,
    borderRadius: radii["2xl"],
    padding: spacing.xl,
  },
  bannerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bannerBody: {
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  flex: {
    flex: 1,
    minWidth: 0,
  },
  never: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    backgroundColor: colors.dangerSurface,
  },
  status: {
    marginTop: spacing.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radii.sm,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  statusText: {
    flex: 1,
  },
});
