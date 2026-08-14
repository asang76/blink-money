import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Button } from "@/components/Button"
import { ProgressBar } from "@/components/ProgressBar"
import { StatRow } from "@/components/StatRow"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { LOW_SCORE_THRESHOLD, PERFECT_SCORE_BONUS_XP } from "./quiz.constants"

interface QuizResultStepProps {
  correctCount: number
  totalQuestions: number
  xpEarned: number
  startingXp: number
  xpToNextReward: number
  streakCount: number
  rewardUnlocked: boolean
  rewardLabel: string
  onViewRewards: () => void
  onBackToHome: () => void
}

export function QuizResultStep(props: QuizResultStepProps) {
  const {
    correctCount,
    totalQuestions,
    xpEarned,
    startingXp,
    xpToNextReward,
    streakCount,
    rewardUnlocked,
    rewardLabel,
    onViewRewards,
    onBackToHome,
  } = props
  const { themed, theme } = useAppTheme()

  const endingXp = startingXp + xpEarned
  const totalForLevel = endingXp + xpToNextReward
  const progress = totalForLevel > 0 ? endingXp / totalForLevel : 0

  const isPerfectScore = totalQuestions > 0 && correctCount === totalQuestions
  const isLowScore = totalQuestions > 0 && correctCount / totalQuestions < LOW_SCORE_THRESHOLD

  return (
    <View style={themed($container)}>
      <View style={themed($trophyCircle)}>
        <Feather name="award" size={40} color={theme.colors.tint} />
      </View>

      <Text text="QUIZ COMPLETE" weight="bold" size="xl" style={themed($title)} />

      {isPerfectScore && (
        <View style={themed($highlightBanner)}>
          <Text text="🌟" size="sm" />
          <Text
            text={`Perfect score! +${PERFECT_SCORE_BONUS_XP} bonus XP added.`}
            size="sm"
            weight="bold"
            style={themed($highlightBannerText)}
          />
        </View>
      )}

      {rewardUnlocked && (
        <View style={themed($highlightBanner)}>
          <Text text="🎉" size="sm" />
          <Text
            text={`Reward unlocked: ${rewardLabel}`}
            size="sm"
            weight="bold"
            style={themed($highlightBannerText)}
          />
        </View>
      )}

      <View style={themed($resultCard)}>
        <View style={themed($resultRow)}>
          <View>
            <Text text="Result" size="xs" style={themed($resultLabel)} />
            <Text text={`${correctCount} / ${totalQuestions} Correct`} weight="bold" size="lg" />
          </View>

          <View style={themed($earnedChip)}>
            <Text text="Earned" size="xs" style={themed($resultLabel)} />
            <Text text={`+${xpEarned} XP`} weight="bold" size="sm" style={themed($earnedText)} />
          </View>
        </View>

        <View style={themed($xpTransitionRow)}>
          <Text text={`${startingXp} XP`} size="sm" style={themed($resultLabel)} />
          <Feather name="arrow-right" size={14} color={theme.colors.textDim} />
          <Text text={`${endingXp} XP`} size="sm" weight="bold" />
        </View>

        <ProgressBar progress={progress} style={themed($progressBar)} />
      </View>

      {isLowScore && (
        <View style={themed($encouragementCard)}>
          <Text text="💡" size="sm" />
          <Text
            text="Don't worry — review the explanations above and try again tomorrow. Every attempt helps you learn."
            size="xs"
            style={themed($encouragementText)}
          />
        </View>
      )}

      <StatRow emoji="🔥" label={`${streakCount} Day Streak — Your streak continues.`} />

      <View style={themed($buttonGroup)}>
        <Button
          text="VIEW REWARDS"
          preset="filled"
          style={themed($primaryButton)}
          textStyle={themed($primaryButtonText)}
          RightAccessory={({ style }) => (
            <Feather name="arrow-right" size={16} color={theme.colors.onPrimary} style={style} />
          )}
          onPress={onViewRewards}
        />

        <Button
          text="BACK TO HOME"
          preset="default"
          style={themed($secondaryButton)}
          onPress={onBackToHome}
        />
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xxl,
  gap: spacing.md,
})

const $trophyCircle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 96,
  height: 96,
  borderRadius: 48,
  borderWidth: 1.5,
  borderColor: colors.tint,
  backgroundColor: colors.surfaceContainer,
  alignItems: "center",
  justifyContent: "center",
})

const $title: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
  letterSpacing: 0.5,
})

const $highlightBanner: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "stretch",
  justifyContent: "center",
  gap: spacing.xs,
  backgroundColor: colors.palette.primary100,
  borderRadius: 12,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
})

const $highlightBannerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.onPrimary,
  textAlign: "center",
})

const $resultCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignSelf: "stretch",
  backgroundColor: colors.surfaceContainer,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 24,
  padding: spacing.lg,
  gap: spacing.sm,
})

const $resultRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
})

const $resultLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $earnedChip: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "flex-end",
  backgroundColor: colors.surface,
  borderRadius: 12,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
})

const $earnedText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $xpTransitionRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $progressBar: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxs,
})

const $encouragementCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignSelf: "stretch",
  alignItems: "flex-start",
  gap: spacing.xs,
  backgroundColor: colors.surfaceContainer,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 16,
  padding: spacing.md,
})

const $encouragementText: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.textDim,
})

const $buttonGroup: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignSelf: "stretch",
  gap: spacing.sm,
  marginTop: "auto",
  marginBottom: spacing.lg,
})

const $primaryButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
  borderWidth: 0,
  borderRadius: 9999,
})

const $primaryButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.onPrimary,
})

const $secondaryButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.transparent,
  borderColor: colors.border,
  borderRadius: 9999,
})
