# AYA — Tɛkyerɛma Pa Hackathon 2026 Winning Strategy

**Event:** MTN Tɛkyerɛma Pa Hackathon 2026 — Grand Finale, October 2026
**Today:** September 10, 2026 (~4 weeks to finale)
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

**Gaps closed (Sep 10):**
- ✅ **Transfer flow localized** — Twi (`"Me pɛ sɛ me sendi GH₵580 ma Ricky Martin"`) and Ewe (`"Medi be maɖo GH₵580 ɖe Ricky Martin"`) utterances now match the quality bar balance/airtime already had.
- ✅ **Currency standardized on `GH₵`** everywhere (transfer flow, balance flow, Home screen, History, Send Money keypad, receipts) — no more stray `$` signs for a judge to catch.
- A `formatCurrency()` helper (`src/lib/currency.ts`) now centralizes this so it can't drift again.

**Remaining gap:**
- Never tested on a real Android device or with a real screen reader (TalkBack/VoiceOver) — only verified via automated DOM/Playwright checks so far.

---

## 3. Current decision: stay fully static, finish the flow first

**Team decision (Sep 10):** don't chase real ASR/biometric/native integration yet. Priority right now is a **complete, polished, fully-static/simulated prototype** — every screen, every flow, every piece of copy consistent and finished, with zero dead ends — before spending any time on real device APIs. The "make it real" ideas below are captured for later and are explicitly **not** in scope for the current push.

**Static-completeness checklist (current focus):**
- [x] All three financial flows (transfer, balance, airtime) wired end-to-end, App.tsx navigator has no missing/dead-end `ScreenId` cases (audited Sep 10 — confirmed clean)
- [x] Transfer flow localized in Twi/Ewe to match balance/airtime
- [x] Currency consistent (`GH₵`) everywhere via `formatCurrency()`
- [x] Semantic HTML/accessibility markup pass (headings, real buttons, list semantics, landmarks)
- [x] Browser back/forward mirrors in-app navigation
- [ ] Sweep remaining screens for any leftover placeholder/inconsistent copy (Services screen's "coming soon" tiles are intentional placeholders, not bugs — leave as-is, they read fine in a demo)
- [ ] One more full click-through of all three flows end to end (transfer, balance, airtime) in each of the three languages, checking every screen's text reads naturally

Once this checklist is clean, the static prototype is demo-ready on its own — a fully-finished simulated flow, honestly presented as such, is a legitimate and strong entry on its own. Everything below is optional upside if time remains before the finale, not a requirement.

---

## 3a. Later / optional: what would take this from "great static demo" to "hard to beat"

*Deferred — do not start until the static-completeness checklist above is fully done and the team decides there's time left.*

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

Ordered by judge-visible impact per hour of work. **Weeks 1–2 are the current plan** (fully static). Weeks "2.5+" are the optional §3a upside track — only start them once the static prototype is fully finished and the team explicitly decides to spend remaining time on real integration.

**Week 1 (now → Sep 16): Finish the static flow** — *current focus*
- [x] Localize the transfer flow's utterance in Twi and Ewe (matches balance/airtime quality bar)
- [x] Fix the `$` / `GH₵` currency inconsistency
- [ ] Full click-through QA of all three flows × three languages
- [ ] Real device + real assistive-tech testing *of the static prototype as-is* (TalkBack/VoiceOver pass, real Android build via Expo Go or a debug APK) — this doesn't require any real ASR/biometric work, just testing what's already built

**Week 2 (Sep 17–23): Pitch + rehearsal for the static demo**
- [ ] Cut a 90-second demo video of the finished static flow: open on the 81%/72% stat, walk through send/balance/airtime, show the accessibility-mode toggle visibly changing the UI
- [ ] Build the pitch deck around the four track/prize mappings in §1
- [ ] Rehearse the live demo; decide as a team whether remaining time (if any) goes to §3a's real thin-slice or stays polishing the static build

---

*(Weeks below are optional — see §3a. Only relevant if the team decides to pursue real integration after the static prototype is finished and rehearsed.)*

**Week 2.5 (optional): The voice thin-slice**
- [ ] Real mic capture + ASR for the balance-check flow (English first)
- [ ] Rule-based keyword/intent matcher wired to real transcript output
- [ ] If time allows: extend keyword-spotting to Twi/Ewe trigger words for the same flow

**Week 3 (optional): Assistive-tech validation + polish**
- [ ] Recruit a real screen-reader user for a testing session; capture their feedback and (with consent) a short video clip
- [ ] Fix whatever that session surfaces (expect focus-management-on-navigate to come up again — see open item below)
- [ ] Implement route-change focus management: move DOM focus to each screen's `<h1>` on navigation (deferred earlier this project; now worth finishing since it's the #1 thing a real screen-reader tester will hit)
- [ ] Replace remaining hardcoded "Pratik" demo persona touches with something that reads as a deliberate demo account, not an oversight

**Week 4 (optional, only if §3a was pursued): Re-cut the pitch around the real thin-slice**
- [ ] Re-cut the demo video to swap in the real voice capture + real biometric prompt in place of the static-flow footage from Week 2
- [ ] Rehearse the live demo on the actual Android device using the real integration
- [ ] Prepare a crisp, rehearsed answer to "what's real vs. mocked?" either way — the honest framing works whether or not §3a happened

---

## 5. Demo-day narrative arc

Works for the static prototype as-is; steps 2 and 3 get stronger if §3a's real thin-slice and biometric gate happen, but aren't required.

1. **Open with the stat, not the app.** "72% of Ghanaians with disabilities already have a mobile money account they can't use independently. That's not an access problem — it's a design problem." (10 seconds, no slide needed)
2. **Show the voice flow live**, on a real phone, in the room. Speak/trigger a balance request naturally. Let the read-back happen out loud. (Static version: narrate "here's the interaction model" as the simulated listening/confirm screens play out — still compelling if presented confidently and honestly as a prototype.)
3. **Show the security moment**: "Aya never asks you to say your PIN" — then show the biometric confirmation gating the transaction (real fingerprint prompt if §3a done; the simulated gate otherwise — either way, narrate *why* this step exists).
4. **Show the accessibility layer isn't cosmetic**: flip the accessibility-mode toggle live and show text genuinely resize and contrast genuinely shift — a judge can look for cosmetic-only toggles, so make sure this one visibly isn't.
5. **Close on the human**: the screen-reader tester's clip, or a direct quote from that session.
6. **Land each prize category by name** in the last 20 seconds — don't make the judges do the mapping work in §1 themselves.

---

## 6. What NOT to do

- Don't claim on-device Twi/Ewe ASR or NLU exists if it doesn't by demo day — a single follow-up question ("show me it working on a phrase we give you") will expose it and cost more trust than the honest "target architecture, here's our thin slice" framing.
- Don't demo only on web — the whole premise (Android AccessibilityService driving USSD/MoMo apps) requires Android; a web-only demo undercuts the pitch's own thesis.
- Don't skip the static-completeness checklist in §3 before moving to anything else — it's cheap to finish and expensive to be caught on.
