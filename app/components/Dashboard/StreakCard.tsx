import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { StreakDay } from "./dashboard.types"

interface StreakCardProps {
  streakCount: number
  days: StreakDay[]
}

export function StreakCard(props: StreakCardProps) {
  const { streakCount, days } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($titleRow)}>
        <Text text="🔥" size="sm" />
        <Text text={`${streakCount} DAY STREAK`} weight="medium" size="xs" style={themed($title)} />
      </View>

      <View style={themed($daysRow)}>
        {days.map((day, index) => (
          <View key={`${day.label}-${index}`} style={themed($dayColumn)}>
            <Text text={day.label} size="xxs" style={themed($dayLabel)} />
            <View style={themed($dayDot[day.status])}>
              {day.status === "complete" && (
                <Feather name="check" size={12} color={theme.colors.onPrimary} />
              )}
              {day.status === "current" && <View style={themed($currentDot)} />}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.surfaceContainer,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 24,
  padding: spacing.md,
  gap: spacing.md,
})

const $titleRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  letterSpacing: 1,
})

const $daysRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
})

const $dayColumn: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  gap: spacing.xxs,
})

const $dayLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $dayDotBase: ThemedStyle<ViewStyle> = () => ({
  width: 28,
  height: 28,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1.5,
})

const $dayDot: Record<StreakDay["status"], ThemedStyle<ViewStyle>> = {
  complete: (theme) => ({
    ...$dayDotBase(theme),
    backgroundColor: theme.colors.tint,
    borderColor: theme.colors.tint,
  }),
  current: (theme) => ({
    ...$dayDotBase(theme),
    borderColor: theme.colors.tint,
  }),
  upcoming: (theme) => ({
    ...$dayDotBase(theme),
    borderColor: theme.colors.border,
  }),
}

const $currentDot: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.tint,
})
