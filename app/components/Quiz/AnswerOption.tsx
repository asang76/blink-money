import { Pressable, TextStyle, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export type AnswerOptionState = "default" | "selected" | "correct" | "incorrect"

interface AnswerOptionProps {
  label: string
  state: AnswerOptionState
  onPress?: () => void
  disabled?: boolean
}

export function AnswerOption(props: AnswerOptionProps) {
  const { label, state, onPress, disabled } = props
  const { themed, theme } = useAppTheme()

  return (
    <Pressable
      style={themed($container[state])}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: state !== "default", disabled }}
    >
      <Text text={label} weight="bold" size="sm" style={themed($label)} />

      {state === "selected" || state === "correct" ? (
        <Feather name="check-circle" size={20} color={theme.colors.tint} />
      ) : state === "incorrect" ? (
        <Feather name="x-circle" size={20} color={theme.colors.error} />
      ) : null}
    </Pressable>
  )
}

const $containerBase: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderRadius: 16,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.md,
  backgroundColor: colors.surfaceContainer,
  borderColor: colors.border,
})

const $selectedTint = "rgba(184, 255, 0, 0.1)"

const $container: Record<AnswerOptionState, ThemedStyle<ViewStyle>> = {
  default: (theme) => $containerBase(theme),
  selected: (theme) => ({
    ...$containerBase(theme),
    borderColor: theme.colors.tint,
    backgroundColor: $selectedTint,
  }),
  correct: (theme) => ({
    ...$containerBase(theme),
    borderColor: theme.colors.tint,
    backgroundColor: $selectedTint,
  }),
  incorrect: (theme) => ({
    ...$containerBase(theme),
    borderColor: theme.colors.error,
  }),
}

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.text,
})
