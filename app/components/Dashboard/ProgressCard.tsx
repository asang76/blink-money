import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Button } from "@/components/Button"
import { ProgressBar } from "@/components/ProgressBar"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface ProgressCardProps {
  xp: number
  level: number
  xpToNextReward: number
  nextRewardLabel: string
  onPressViewRewards?: () => void
}

export function ProgressCard(props: ProgressCardProps) {
  const { xp, level, xpToNextReward, nextRewardLabel, onPressViewRewards } = props
  const { themed, theme } = useAppTheme()

  const totalForLevel = xp + xpToNextReward
  const progress = totalForLevel > 0 ? xp / totalForLevel : 0

  return (
    <View style={themed($container)}>
      <View style={themed($headerRow)}>
        <Text text="YOUR PROGRESS" size="xxs" weight="medium" style={themed($label)} />
        <Text text={`${xp} XP`} size="xs" weight="bold" style={themed($xpValue)} />
      </View>

      <Text text={`Level ${level}`} weight="bold" size="xl" />

      <ProgressBar progress={progress} style={themed($track)} />

      <View style={themed($helperRow)}>
        <Text
          text={`${xpToNextReward} XP to your next reward: `}
          size="xs"
          style={themed($helperText)}
        />
        <Text text={nextRewardLabel} size="xs" weight="bold" />
      </View>

      <Button
        text="VIEW REWARDS"
        preset="default"
        style={themed($viewRewardsButton)}
        RightAccessory={({ style }) => (
          <Feather name="arrow-right" size={16} color={theme.colors.text} style={style} />
        )}
        onPress={onPressViewRewards}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.surfaceContainer,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 24,
  padding: spacing.lg,
  gap: spacing.sm,
})

const $headerRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  letterSpacing: 1,
})

const $xpValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $track: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxs,
})

const $helperRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  marginBottom: spacing.xs,
})

const $helperText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $viewRewardsButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.transparent,
  borderColor: colors.border,
  borderRadius: 12,
  minHeight: 48,
  paddingHorizontal: spacing.md,
})
