# AYA — Tɛkyerɛma Pa Hackathon 2026 Winning Strategy

**Event:** MTN Tɛkyerɛma Pa Hackathon 2026 — Grand Finale, October 2026
**Today:** September 9, 2026 (~4 weeks to finale)
**Theme:** "Design and develop inclusive digital solutions that support communication in Ghanaian languages. All solutions must be accessible to persons with disabilities."

---

## 1. Why AYA fits this hackathon almost perfectly

AYA is not an app we're bending to fit the brief — it *is* the brief. That's our strongest asset and the core of the pitch.

| Hackathon track | AYA's answer |
|---|---|
| **Accessibility & Personalization** | Voice-first UI, PIN never spoken, adjustable text size/contrast, screen-reader-tested semantic markup (real `<h1>`, `<button>`, `<ul>/<li>`, landmark regions — not just ARIA-flavored `<div>`s) |
| **Fintech & Digital Services** | Mobile money by voice: transfer, balance check, airtime top-up, in Ghana's own MoMo idiom (PIN confirm, no card/bank rails) |
| **AI & Language Technologies** | Code-switched Akan/Ewe/English intent parsing (target architecture — see honesty note in §3), local-language phrase bank, language-authentic content |

**Special prize categories** — map our pitch to each explicitly, on stage:
- **Best Financial Inclusion Solution** — lead with the stat already in our README: *81% financial inclusion in Ghana, yet 72% of persons with disabilities who already hold MoMo accounts cannot use them independently.* This is the single most quotable line we have. Open the pitch with it.
- **Best Digital Experience Innovation** — the "speak → confirm → device auth" loop *is* the innovation: voice controls the experience, but voice never touches money.
- **Best Agentic AI Solution** — reframe the architecture explicitly as an agent loop: **perceive** (voice utterance) → **decide** (intent + slot extraction) → **propose** (spoken read-back) → **act only after human confirmation** (device biometric/PIN). This is a textbook human-in-the-loop agent pattern for a high-stakes domain — say those words on stage.
- **Best Female-Led Team** — flag internally now (not something to fabricate): if the team qualifies, register for it explicitly; it costs nothing to be eligible.

---

## 2. Honest current-state snapshot

Judges will ask "what's real vs. simulated?" — answering that confidently and *first*, before they ask, builds more trust than pretending everything works end-to-end. Overclaiming and getting caught is the single most common way hackathon teams lose credibility with judges.

**What's real and working today:**
- Full navigation flow, 25+ screens, phone+PIN auth (no email/password/social — deliberately, see §4)
- Three financial flows (transfer, balance, airtime top-up) wired end-to-end through listening → understanding → confirmation → biometric gate → processing → success/receipt
- Accessibility prefs that *actually* change behavior: text scale genuinely resizes type via `AppText`, high contrast genuinely swaps the color palette
- Web build deployed and live (Vercel, auto-deploys from `main`)
- Real semantic HTML/ARIA structure verified with automated DOM checks (landmarks, headings, real `<button>`/`<ul>` elements) — most teams never get this far
- Browser back/forward now correctly mirrors in-app navigation (History API integration)

**What's simulated (UI-only, no backend/model yet):**
- Voice recognition: `ListeningScreen` reveals a *hardcoded* transcript word-by-word on a timer — there is no microphone capture or ASR
- Intent parsing: `UnderstandingScreen` reads a static `intentLabel`/`details` object from content files — nothing is actually parsed from speech
- Biometric auth: `BiometricScreen` is a 1.6-second `setTimeout`, no `expo-local-authentication` or device biometric API call
- No backend: all balances, transaction history, and reference codes are hardcoded strings; no network calls anywhere in the app

**Gaps worth closing before demo day:**
- The **transfer flow's spoken utterance isn't actually localized** — Twi/Ewe/English all show the identical English sentence, while balance and airtime *do* have real Twi/Ewe phrases. This is our flagship flow; fix it first (see §4, P0).
- Currency inconsistency: transfer uses `$`, balance/airtime use `GH₵` — a 10-minute fix that avoids an easy judge nitpick.
- Never tested on a real Android device or with a real screen reader (TalkBack/VoiceOver) — only verified via automated DOM/Playwright checks so far.

---

## 3. What "winning" requires beyond what we have

A polished UI prototype alone won't beat teams who show *one real, working thing* end-to-end. We don't need to build the full on-device ASR/NLU pipeline described in the README as target architecture — we need **one true thin slice** that proves the concept isn't vaporware, wrapped in a flawless demo of everything else.

### The one thing that matters most: a real voice thin-slice

Pick **one** flow (recommend: balance check — it's the simplest intent, one slot-free action) and make it genuinely voice-driven end to end:
- Use `expo-speech-recognition` (or the platform's native on-device recognizer via a small native module) to capture real audio and produce a real transcript for **English** first, then Twi/Ewe if time allows (on-device Twi/Ewe ASR is a hard problem — even a keyword-spotter that recognizes "balance", "sendi", "airtime" as trigger words layered over free-form capture is honest and demoable)
- Run genuinely local keyword/intent matching against the transcript (a simple rule-based matcher is fine and honest — don't claim an LLM/ML model you don't have)
- Everything downstream (confirmation read-back, biometric gate, processing, success) can stay exactly as built

This turns "we mocked the happy path" into "we built the hard 20% for one flow and the interaction model works" — which is a categorically stronger position for AI & Language Technologies judging.

### Second priority: real biometric gate

Swap `BiometricScreen`'s `setTimeout` for `expo-local-authentication`. This is a two-hour job with disproportionate credibility payoff — "PIN never spoken, confirmed by your device's real fingerprint/face" becomes something a judge can *watch happen* on a real phone, not take on faith.

### Third priority: real device + real assistive tech testing

Build an actual Android APK (`eas build` or a debug build) and test with TalkBack switched on, and get one screen reader user (ideally the same accessibility tester who already gave the feedback earlier this project) to try it and give a quote. A 20-second clip of a blind or low-vision user genuinely operating the app with TalkBack, unprompted, is worth more on stage than any slide.

---

## 4. Priority roadmap to the Grand Finale (~4 weeks)

Ordered by judge-visible impact per hour of work.

**Week 1 (now → Sep 16): Close credibility gaps**
- [ ] Localize the transfer flow's utterance in Twi and Ewe (matches balance/airtime quality bar)
- [ ] Fix the `$` / `GH₵` currency inconsistency
- [ ] Wire `expo-local-authentication` into `BiometricScreen` for a real biometric prompt
- [ ] Build and side-load a real Android APK; do a first TalkBack pass ourselves

**Week 2 (Sep 17–23): The voice thin-slice**
- [ ] Real mic capture + ASR for the balance-check flow (English first)
- [ ] Rule-based keyword/intent matcher wired to real transcript output
- [ ] If time allows: extend keyword-spotting to Twi/Ewe trigger words for the same flow

**Week 3 (Sep 24–30): Assistive-tech validation + polish**
- [ ] Recruit a real screen-reader user for a testing session; capture their feedback and (with consent) a short video clip
- [ ] Fix whatever that session surfaces (expect focus-management-on-navigate to come up again — see open item below)
- [ ] Implement route-change focus management: move DOM focus to each screen's `<h1>` on navigation (deferred earlier this project; now worth finishing since it's the #1 thing a real screen-reader tester will hit)
- [ ] Replace remaining hardcoded "Pratik" demo persona touches with something that reads as a deliberate demo account, not an oversight

**Week 4 (Oct 1–7): Pitch + rehearsal**
- [ ] Cut a 90-second demo video: open on the 81%/72% stat, show the real voice thin-slice, show the real biometric prompt, close on the screen-reader user's clip
- [ ] Build the pitch deck around the four track/prize mappings in §1 — one slide per prize category, explicit
- [ ] Rehearse the live demo on the actual Android device, not the web build (web build stays as backup/fallback only)
- [ ] Prepare a crisp, rehearsed answer to "what's real vs. mocked?" — lead with it unprompted in the pitch if there's time

---

## 5. Demo-day narrative arc

1. **Open with the stat, not the app.** "72% of Ghanaians with disabilities already have a mobile money account they can't use independently. That's not an access problem — it's a design problem." (10 seconds, no slide needed)
2. **Show the voice thin-slice live**, on a real phone, in the room. Speak a balance request naturally. Let the read-back happen out loud.
3. **Show the security moment**: "Aya never asks you to say your PIN" — then show the real fingerprint prompt gating the transaction.
4. **Show the accessibility layer isn't cosmetic**: flip the accessibility-mode toggle live and show text genuinely resize and contrast genuinely shift — a judge can look for cosmetic-only toggles, so make sure this one visibly isn't.
5. **Close on the human**: the screen-reader tester's clip, or a direct quote from that session.
6. **Land each prize category by name** in the last 20 seconds — don't make the judges do the mapping work in §1 themselves.

---

## 6. What NOT to do

- Don't claim on-device Twi/Ewe ASR or NLU exists if it doesn't by demo day — a single follow-up question ("show me it working on a phrase we give you") will expose it and cost more trust than the honest "target architecture, here's our thin slice" framing.
- Don't demo only on web — the whole premise (Android AccessibilityService driving USSD/MoMo apps) requires Android; a web-only demo undercuts the pitch's own thesis.
- Don't skip the currency/localization nitpicks in §3 — they're cheap to fix and expensive to be caught on.
