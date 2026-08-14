/**
 * BlinkMoney "Ink & Neon" palette — dark theme.
 * Source: DESIGN.md (prose spec) — Dark Minimalism, true-black surfaces, singular lime accent.
 *
 * BlinkMoney is a dark-only app by design (see theme/context.tsx), so colors.ts (the "light"
 * theme file) intentionally mirrors this file exactly. Keeping both files means the Theme
 * plumbing (light/dark switching, per-theme spacing, etc.) still works unchanged if a light
 * mode is ever introduced later — only the values here would need to diverge.
 */
const palette = {
  // Neutral ramp, white -> true black. Numbering follows the "dark" convention: the higher the
  // number, the lighter the color (this is what colors.ts's neutral900 etc. also point at).
  neutral900: "#FFFFFF", // primary text / headline color
  neutral800: "#A3A3A3", // secondary / de-prioritized text ("Ghost" text color)
  neutral700: "#666666", // placeholder text, inactive icons
  neutral600: "#404040", // subtle dividers, disabled content (interpolated — not explicit in spec)
  neutral500: "#292929", // card/input border, separators — spec's "Low-Contrast Outline"
  neutral400: "#1D1D1D", // chips/tags bg, chart grid lines, progress track, glass overlay base
  neutral300: "#171717", // raised card surface
  neutral200: "#101010", // primary surface / input field background
  neutral100: "#050505", // base screen background ("true black")

  // Lime — the spec's singular action color. Used for primary CTAs, positive trends, XP/progress.
  primary100: "#EAFFB3",
  primary200: "#D6FF66",
  primary300: "#C7FF33",
  primary400: "#C0FF1A",
  primary500: "#B8FF00", // brand lime, exact spec value
  primary600: "#93CC00", // pressed/darker state

  // No second brand hue is defined in the spec — secondary maps onto the neutral ramp so
  // components that reference it (Toggle/Checkbox/Radio track colors) stay on-brand.
  secondary100: "#F2F2F2",
  secondary200: "#D9D9D9",
  secondary300: "#A3A3A3",
  secondary400: "#666666",
  secondary500: "#404040",

  // Spec treats lime as the only accent, so "accent" aliases the same ramp as primary.
  accent100: "#EAFFB3",
  accent200: "#D6FF66",
  accent300: "#C7FF33",
  accent400: "#C0FF1A",
  accent500: "#B8FF00",

  // Error/danger states aren't defined in the spec — inferred to read clearly on true black.
  angry100: "#3D1210",
  angry500: "#FF453A",

  overlay20: "rgba(0, 0, 0, 0.4)", // scrim behind sheets/modals
  overlay50: "rgba(29, 29, 29, 0.8)", // spec's "Glassmorphism" fill (#1D1D1D @ 80%)
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral900,
  textDim: palette.neutral800,
  background: palette.neutral100,
  border: palette.neutral500,
  tint: palette.primary500,
  tintInactive: palette.neutral700,
  separator: palette.neutral500,
  error: palette.angry500,
  errorBackground: palette.angry100,

  /**
   * Additive tokens (beyond Ignite's defaults) needed for the new BlinkMoney screens.
   */
  // Primary surface: input fields, secondary panels.
  surface: palette.neutral200,
  // Raised card surface: dashboard cards, standard `rounded-xl` containers.
  surfaceContainer: palette.neutral300,
  // Text/icon color to use on top of a lime (`tint`) background, e.g. primary button labels.
  onPrimary: palette.neutral100,
  // Positive financial trend / success state — alias of tint, named for intent at call sites.
  success: palette.primary500,
} as const
