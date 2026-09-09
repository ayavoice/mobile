import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText, Card, Icon, IconWell, Screen, ScreenHeader } from "../components/ui";
import { colors, radii, spacing } from "../theme";

type Props = { onBack: () => void };

const FAQS = [
  {
    q: "How do I send money?",
    a: "Tap Talk and say who you want to send to and how much. Aya does the rest.",
  },
  {
    q: "Is my PIN safe?",
    a: "Yes. Aya never asks for your PIN or OTP. You only use your fingerprint or face to confirm.",
  },
  {
    q: "What languages does Aya speak?",
    a: "Akan/Twi, Ewe, and English. You chose your preferred language during setup.",
  },
  {
    q: "What if Aya doesn't understand me?",
    a: "Say it again slowly, or tap Change. You can also call support.",
  },
];

export default function HelpScreen({ onBack }: Props) {
  const [errorDemo, setErrorDemo] = useState(false);

  return (
    <Screen background={colors.white} scroll>
      <ScreenHeader title="Help" onBack={onBack} />

      <View style={styles.body}>
        <View style={styles.call}>
          <IconWell backgroundColor={colors.white} size={64} radius={20}>
            <Icon name="call" size={28} color={colors.purple} />
          </IconWell>
          <AppText variant="heading" align="center" color={colors.white} style={styles.callTitle}>
            Speak to a support agent
          </AppText>
          <AppText variant="bodySM" align="center" color={colors.textInverseMuted} style={styles.callSub}>
            Free call, 24/7, in Twi, Ewe, or English
          </AppText>
          <Pressable style={styles.callBtn} accessibilityRole="button" role="button">
            <Icon name="call-outline" size={18} color={colors.purple} />
            <AppText variant="labelMD" color={colors.purple}>
              Call 0800-AYA-HELP
            </AppText>
          </Pressable>
        </View>

        {FAQS.map((faq) => (
          <Card key={faq.q}>
            <View style={styles.faqHead}>
              <Icon name="help-circle" size={20} color={colors.purple} />
              <AppText variant="labelSM" style={styles.q}>
                {faq.q}
              </AppText>
            </View>
            <AppText variant="bodySM">{faq.a}</AppText>
          </Card>
        ))}

        <AppText variant="headingSM">Accessible error examples</AppText>
        <Pressable
          onPress={() => setErrorDemo((v) => !v)}
          style={styles.toggleErrors}
          accessibilityRole="button"
          role="button"
        >
          <AppText variant="labelSM">
            {errorDemo ? "Hide" : "Show"} error states
          </AppText>
        </Pressable>

        {errorDemo ? (
          <>
            <View style={styles.fail}>
              <View style={styles.errHead}>
                <Icon name="warning" size={28} color={colors.danger} />
                <AppText variant="labelMD" color={colors.danger}>
                  Transaction failed
                </AppText>
              </View>
              <AppText variant="bodySM" color={colors.dangerDark}>
                Your money was not sent. No money was taken from your account.
              </AppText>
              <View style={styles.errActions}>
                <Pressable style={styles.tryAgain}>
                  <AppText variant="labelXS" color={colors.white}>
                    Try again
                  </AppText>
                </Pressable>
                <Pressable style={styles.callSupport}>
                  <AppText variant="labelXS" color={colors.danger}>
                    Call support
                  </AppText>
                </Pressable>
              </View>
            </View>

            <View style={styles.offline}>
              <View style={styles.errHead}>
                <Icon name="cloud-offline" size={28} color={colors.warningDark} />
                <AppText variant="labelMD" color={colors.warningDark}>
                  No internet connection
                </AppText>
              </View>
              <AppText variant="bodySM" color={colors.warningText}>
                Check your mobile data or Wi-Fi. Aya needs a connection to send money.
              </AppText>
              <Pressable style={styles.retry}>
                <AppText variant="labelXS" color={colors.white}>
                  Retry
                </AppText>
              </Pressable>
            </View>
          </>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  call: {
    backgroundColor: colors.purple,
    borderRadius: radii["3xl"],
    padding: spacing["2xl"],
    alignItems: "center",
  },
  callTitle: {
    marginTop: spacing.md,
  },
  callSub: {
    marginTop: 6,
  },
  callBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: radii["2xl"],
    paddingVertical: 14,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  faqHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 6,
  },
  q: {
    flex: 1,
  },
  toggleErrors: {
    width: "100%",
    padding: 14,
    borderRadius: radii["2xl"],
    backgroundColor: colors.surfaceCard,
    alignItems: "center",
  },
  fail: {
    backgroundColor: colors.dangerSurface,
    borderRadius: radii["2xl"],
    padding: spacing.xl,
  },
  offline: {
    backgroundColor: colors.surfaceWarning,
    borderRadius: radii["2xl"],
    padding: spacing.xl,
  },
  errHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: 10,
  },
  errActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  tryAgain: {
    flex: 1,
    height: 48,
    borderRadius: radii["2xl"],
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  callSupport: {
    flex: 1,
    height: 48,
    borderRadius: radii["2xl"],
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  retry: {
    width: "100%",
    height: 48,
    marginTop: 14,
    borderRadius: radii["2xl"],
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
  },
});
