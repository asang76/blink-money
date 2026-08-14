import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { QuizQuestion } from "./quiz.types"

interface QuizFeedbackStepProps {
  question: QuizQuestion
  isCorrect: boolean
  isLastQuestion: boolean
  onContinue: () => void
}

export function QuizFeedbackStep(props: QuizFeedbackStepProps) {
  const { question, isCorrect, isLastQuestion, onContinue } = props
  const { themed, theme } = useAppTheme()

  const accentColor = isCorrect ? theme.colors.tint : theme.colors.textDim
  const xpEarned = isCorrect ? question.correctXp : question.incorrectXp

  return (
    <View style={themed($container)}>
      <View style={themed([$iconCircle, { borderColor: accentColor }])}>
        <Feather name={isCorrect ? "check" : "info"} size={32} color={accentColor} />
      </View>

      <Text
        text={isCorrect ? "CORRECT!" : "Not quite."}
        weight="bold"
        size="xl"
        style={themed($headline)}
      />

      {!isCorrect && <Text text="The correct answer is:" size="sm" style={themed($subtext)} />}

      <Text
        text={question.options[question.correctIndex]}
        weight="bold"
        size="lg"
        style={themed($answer)}
      />

      <Text text={question.explanation} size="sm" style={themed($explanation)} />

      <View style={themed($xpChip)}>
        <Text text={`+${xpEarned} XP`} weight="bold" size="sm" style={themed($xpChipText)} />
      </View>

      <Button
        text={isCorrect ? (isLastQuestion ? "SEE RESULTS" : "NEXT QUESTION") : "LEARN & CONTINUE"}
        preset="filled"
        style={themed($continueButton)}
        textStyle={themed($continueButtonText)}
        onPress={onContinue}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xxl,
  gap: spacing.xs,
})

const $iconCircle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 72,
  height: 72,
  borderRadius: 36,
  borderWidth: 1.5,
  backgroundColor: colors.surfaceContainer,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.md,
})

const $headline: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
})

const $subtext: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: "center",
  marginTop: spacing.sm,
})

const $answer: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginTop: spacing.xs,
})

const $explanation: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: "center",
  marginTop: spacing.xs,
  marginBottom: spacing.md,
})

const $xpChip: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.surface,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 9999,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  marginBottom: spacing.xl,
})

const $xpChipText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $continueButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  alignSelf: "stretch",
  backgroundColor: colors.tint,
  borderWidth: 0,
  borderRadius: 9999,
  marginTop: "auto",
})

const $continueButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.onPrimary,
})
