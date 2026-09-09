const { colors } = require("./src/theme/tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./index.ts",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        aya: {
          yellow: colors.yellow,
          dark: colors.dark,
          white: colors.white,
          muted: colors.backgroundMuted,
          ghost: colors.surfaceGhost,
          surface: colors.surfaceYellow,
          border: colors.border,
          "border-muted": colors.borderMuted,
          text: colors.text,
          "text-secondary": colors.textSecondary,
          "text-muted": colors.textMuted,
          "text-subtle": colors.textSubtle,
          success: colors.success,
          "success-dark": colors.successDark,
          "success-surface": colors.successSurface,
          danger: colors.danger,
          "danger-surface": colors.dangerSurface,
          warning: colors.warningDark,
          "warning-surface": colors.surfaceWarning,
        },
      },
      fontFamily: {
        display: ["Sora-Regular"],
        "display-medium": ["Sora-Medium"],
        "display-semibold": ["Sora-SemiBold"],
        "display-bold": ["Sora-Bold"],
        "display-extrabold": ["Sora-ExtraBold"],
        "display-black": ["Sora-ExtraBold"],
        body: ["Nunito-Regular"],
        "body-medium": ["Nunito-Medium"],
        "body-semibold": ["Nunito-SemiBold"],
        "body-bold": ["Nunito-Bold"],
        "body-extrabold": ["Nunito-ExtraBold"],
      },
      borderRadius: {
        aya: "20px",
        "aya-lg": "24px",
        "aya-xl": "28px",
      },
    },
  },
  plugins: [],
};
