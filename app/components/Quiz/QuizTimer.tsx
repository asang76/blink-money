import { View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface QuizTimerProps {
  secondsRemaining: number
}

type UrgencyState = "default" | "low"

const LOW_TIME_THRESHOLD = 5

export function QuizTimer(props: QuizTimerProps) {
  const { secondsRemaining } = props
  const { themed, theme } = useAppTheme()

  const state: UrgencyState = secondsRemaining <= LOW_TIME_THRESHOLD ? "low" : "default"
  const accentColor = state === "low" ? theme.colors.error : theme.colors.textDim

  return (
    <View style={themed($container[state])}>
      <Feather name="clock" size={12} color={accentColor} />
      <Text
        text={`${Math.max(secondsRemaining, 0)}s`}
        size="xs"
        weight="bold"
        style={{ color: accentColor }}
      />
    </View>
  )
}

const $containerBase: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
  borderWidth: 1,
  borderRadius: 9999,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  backgroundColor: colors.surface,
})

const $container: Record<UrgencyState, ThemedStyle<ViewStyle>> = {
  default: (theme) => ({ ...$containerBase(theme), borderColor: theme.colors.border }),
  low: (theme) => ({ ...$containerBase(theme), borderColor: theme.colors.error }),
}
