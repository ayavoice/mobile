import { Alert, Pressable, StyleSheet, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, Icon, IconWell, Screen, ScreenHeader } from "../components/ui";
import type { FlowId } from "../content/flows";
import { colors, radii, spacing } from "../theme";

type Props = { onBack: () => void; onStartFlow: (flow: FlowId) => void };
type IonName = ComponentProps<typeof Ionicons>["name"];

type Service = {
  icon: IonName;
  label: string;
  hint: string;
} & ({ flow: FlowId } | { flow?: undefined });

const SERVICES: Service[] = [
  { icon: "paper-plane", label: "Send Money", hint: "Say who and how much", flow: "transfer" },
  { icon: "phone-portrait", label: "Buy Airtime", hint: "Say amount to top up", flow: "airtime" },
  { icon: "wallet-outline", label: "Check balance", hint: "Ask Aya out loud", flow: "balance" },
  { icon: "wifi", label: "Data Bundle", hint: "Coming soon" },
  { icon: "flash", label: "Electricity", hint: "Coming soon" },
  { icon: "tv", label: "TV Subscription", hint: "Coming soon" },
];

export default function ServicesScreen({ onBack, onStartFlow }: Props) {
  return (
    <Screen background={colors.white} scroll safeBottom={false}>
      <ScreenHeader title="Services" onBack={onBack} />
      <AppText variant="bodySM" style={styles.subtitle}>
        Everything you can do with Aya, in one place.
      </AppText>

      <View style={styles.body}>
        <View style={styles.grid}>
          {SERVICES.map((service) => (
            <Pressable
              key={service.label}
              onPress={() => {
                if (service.flow) {
                  onStartFlow(service.flow);
                  return;
                }
                Alert.alert(service.label, "This service is coming soon.");
              }}
              accessibilityRole="button"
              accessibilityLabel={service.label}
              style={styles.tile}
            >
              <IconWell backgroundColor={colors.washPurple} size={44} radius={16}>
                <Icon name={service.icon} size={22} color={colors.purple} />
              </IconWell>
              <AppText variant="labelSM">{service.label}</AppText>
              <AppText variant="caption">{service.hint}</AppText>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    paddingHorizontal: spacing.screenX,
    marginTop: 2,
  },
  body: {
    padding: spacing.xl,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tile: {
    width: "48%",
    borderRadius: radii["2xl"],
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surfaceCard,
    gap: 6,
    marginBottom: spacing.md,
  },
});
