import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { AppText, Avatar, Button, Icon, Screen, ScreenFooter } from "../components/ui";
import { brandImages } from "../content/brand";
import { useAppPrefs } from "../context/AppPrefs";
import { spacing, useColors } from "../theme";

type Props = { onSend: () => void; onBack: () => void };

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

function recipientFrom(details: { label: string; value: string }[]) {
  const name = details.find((d) => d.label === "To")?.value ?? "Ricky Martin";
  const number = details.find((d) => d.label === "Number")?.value ?? "Ac no. 8050530XXX";
  return { name, number };
}

export default function SendMoneyScreen({ onSend, onBack }: Props) {
  const colors = useColors();
  const { flow } = useAppPrefs();
  const recipient = useMemo(() => recipientFrom(flow.details), [flow.details]);
  const initialAmount = useMemo(
    () => flow.confirmHero.replace(/[^0-9.]/g, "") || "580.00",
    [flow.confirmHero],
  );
  const [amount, setAmount] = useState(initialAmount);

  const onKeyPress = (key: string) => {
    if (key === "⌫") {
      setAmount((v) => (v.length > 1 ? v.slice(0, -1) : "0"));
      return;
    }
    if (key === ".") {
      if (amount.includes(".")) return;
      setAmount((v) => v + key);
      return;
    }
    const decimalIndex = amount.indexOf(".");
    if (decimalIndex !== -1 && amount.length - decimalIndex - 1 >= 2) return;
    setAmount((v) => (v === "0" ? key : v + key));
  };

  const canSend = Number(amount) > 0;

  return (
    <Screen style={styles.root}>
      <View style={styles.top}>
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          role="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          style={styles.topBtn}
        >
          <Icon name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <AppText variant="headingSM" heading={1}>Send Money</AppText>
        <Pressable
          onPress={() => Alert.alert("Notifications", "You're all caught up.")}
          accessibilityRole="button"
          role="button"
          accessibilityLabel="Notifications"
          hitSlop={8}
          style={styles.topBtn}
        >
          <Icon name="notifications-outline" size={22} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <View style={styles.recipient}>
          <Avatar source={brandImages.ricky} size={108} />
          <AppText variant="heading" color={colors.text} style={styles.name}>
            {recipient.name}
          </AppText>
          <AppText variant="bodySM" color={colors.textSubtle}>
            {recipient.number}
          </AppText>
          <Pressable onPress={onBack} accessibilityLabel="Change recipient" hitSlop={8}>
            <AppText variant="labelXS" color={colors.textSubtle} style={styles.change}>
              Change
            </AppText>
          </Pressable>
        </View>

        <AppText
          variant="displayLG"
          color={colors.text}
          align="center"
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.amount}
        >
          {`GH₵${amount.includes(".") ? amount : `${amount}.00`}`}
        </AppText>

        <View style={styles.keypad}>
          {KEYS.map((key) => (
            <Pressable
              key={key}
              onPress={() => onKeyPress(key)}
              accessibilityLabel={key === "⌫" ? "Delete" : `Digit ${key}`}
              style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
            >
              {key === "⌫" ? (
                <Icon name="backspace-outline" size={24} color={colors.text} />
              ) : (
                <AppText variant="titleSM" color={colors.text}>
                  {key}
                </AppText>
              )}
            </Pressable>
          ))}
        </View>
      </View>

      <ScreenFooter>
        <Button onPress={onSend} disabled={!canSend} variant="purple">
          Send
        </Button>
      </ScreenFooter>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
    minHeight: 52,
    flexShrink: 0,
  },
  topBtn: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.screenX,
    justifyContent: "space-between",
  },
  recipient: {
    alignItems: "center",
    paddingTop: spacing.sm,
  },
  name: {
    marginTop: spacing.md,
  },
  change: {
    marginTop: 6,
    textDecorationLine: "underline",
  },
  amount: {
    letterSpacing: -1,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: spacing.sm,
  },
  key: {
    width: "33.33%",
    height: 58,
    alignItems: "center",
    justifyContent: "center",
  },
  keyPressed: {
    opacity: 0.45,
  },
});
