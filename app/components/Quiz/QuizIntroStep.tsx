import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Button } from "@/components/Button"
import { StatTile } from "@/components/StatTile"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { QuizMeta } from "./quiz.types"

interface QuizIntroStepProps {
  meta: QuizMeta
  questionCount: number
  onStart: () => void
}

export function QuizIntroStep(props: QuizIntroStepProps) {
  const { meta, questionCount, onStart } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($iconCircle)}>
        <Feather name="award" size={36} color={theme.colors.tint} />
      </View>

      <Text text={meta.title.toUpperCase()} weight="bold" size="xl" style={themed($title)} />
      <Text text={meta.subtitle} size="sm" style={themed($subtitle)} />

      <View style={themed($statsRow)}>
        <StatTile icon="help-circle" label={`${questionCount} Questions`} />
        <StatTile icon="clock" label={meta.estimatedTime} />
      </View>

      <View style={themed($rewardChip)}>
        <Feather name="zap" size={14} color={theme.colors.tint} />
        <Text
          text={`+${meta.completionXp} XP`}
          size="sm"
          weight="bold"
          style={themed($rewardText)}
        />
      </View>

      <Button
        text="START QUIZ"
        preset="filled"
        style={themed($startButton)}
        textStyle={themed($startButtonText)}
        onPress={onStart}
      />

      <Text
        text="No penalty for wrong answers. Learn as you play."
        size="xs"
        style={themed($footnote)}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xxl,
  gap: spacing.sm,
})

const $iconCircle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 88,
  height: 88,
  borderRadius: 44,
  borderWidth: 1,
  borderColor: colors.tint,
  backgroundColor: colors.surfaceContainer,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.md,
})

const $title: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
  letterSpacing: 0.5,
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: "center",
  marginBottom: spacing.md,
})

const $statsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignSelf: "stretch",
  gap: spacing.sm,
  marginBottom: spacing.md,
})

const $rewardChip: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
  backgroundColor: colors.surface,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 9999,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  marginBottom: spacing.xl,
})

const $rewardText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $startButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignSelf: "stretch",
  backgroundColor: colors.tint,
  borderWidth: 0,
  borderRadius: 12,
  marginBottom: spacing.md,
})

const $startButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.onPrimary,
})

const $footnote: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
})
