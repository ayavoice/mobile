# Aya

Aya is an accessibility-first, local-language financial voice agent for Ghana. It lets visually
impaired, low-literacy, and elderly mobile money users complete transactions (send money, check
balance, buy airtime) by speaking naturally in Akan (Twi) or Ewe — including code-switched
Akan/Ewe/English — instead of navigating USSD menus or English-only text prompts.

Non-negotiable product principle: **voice controls the experience, private device authentication
controls the money.** Every transaction gets a spoken read-back and explicit confirm/cancel before
it executes; the microphone closes before any PIN/biometric handoff, and PINs/OTPs are never
spoken, captured, or transmitted. Keep this invariant in mind for any change touching a
transaction flow, confirmation step, or auth handoff. Full product context: [README.md](README.md).

This repo (`mobile/`) is currently the Expo/React Native UI shell and simulated transaction flows
(transfer, balance, airtime) for the hackathon deliverable — the on-device ASR/NLU and Android
AccessibilityService automation are not yet implemented here.

# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.
