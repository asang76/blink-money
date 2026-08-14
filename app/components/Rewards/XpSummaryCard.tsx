import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { ProgressBar } from "@/components/ProgressBar"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface XpSummaryCardProps {
  currentXp: number
  level: number
  nextLevel: number
  xpToNextReward: number
  nextRewardThreshold: number
}

export function XpSummaryCard(props: XpSummaryCardProps) {
  const { currentXp, level, nextLevel, xpToNextReward, nextRewardThreshold } = props
  const { themed, theme } = useAppTheme()

  const progress = nextRewardThreshold > 0 ? currentXp / nextRewardThreshold : 0

  return (
    <View style={themed($container)}>
      <View style={themed($headerRow)}>
        <Text text="CURRENT XP" size="xxs" weight="medium" style={themed($label)} />

        <View style={themed($levelPill)}>
          <Feather name="award" size={12} color={theme.colors.tint} />
          <Text text={`Level ${level}`} size="xxs" weight="bold" style={themed($levelPillText)} />
        </View>
      </View>

      <View style={themed($xpRow)}>
        <Text text={`${currentXp}`} weight="bold" size="xxl" />
        <Text text="XP" weight="bold" size="xxl" style={themed($xpUnit)} />
      </View>

      <ProgressBar progress={progress} style={themed($progressBar)} />

      <View style={themed($footerRow)}>
        <Text text={`Level ${level}`} size="xs" style={themed($footerText)} />
        <Text text={`${xpToNextReward} XP to next reward`} size="xs" style={themed($footerText)} />
        <Text text={`Level ${nextLevel}`} size="xs" style={themed($footerText)} />
      </View>
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

const $levelPill: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
  backgroundColor: colors.surface,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 9999,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
})

const $levelPillText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $xpRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "flex-end",
  gap: spacing.xxs,
})

const $xpUnit: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $progressBar: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxs,
})

const $footerRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
})

const $footerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
