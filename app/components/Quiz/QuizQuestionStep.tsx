import { TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { ProgressBar } from "@/components/ProgressBar"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { AnswerOption } from "./AnswerOption"
import type { QuizQuestion } from "./quiz.types"
import { QuizTimer } from "./QuizTimer"

interface QuizQuestionStepProps {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  selectedIndex: number | null
  secondsRemaining: number
  isSubmitting: boolean
  onSelect: (index: number) => void
  onSubmit: () => void
}

export function QuizQuestionStep(props: QuizQuestionStepProps) {
  const {
    question,
    questionNumber,
    totalQuestions,
    selectedIndex,
    secondsRemaining,
    isSubmitting,
    onSelect,
    onSubmit,
  } = props
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($progressGroup)}>
        <ProgressBar progress={questionNumber / totalQuestions} style={$progressBar} />
        <QuizTimer secondsRemaining={secondsRemaining} />
      </View>

      <Text text={question.question} weight="bold" size="xl" />

      <View style={themed($options)}>
        {question.options.map((option, index) => (
          <AnswerOption
            key={option}
            label={option}
            state={selectedIndex === index ? "selected" : "default"}
            disabled={isSubmitting}
            onPress={() => onSelect(index)}
          />
        ))}
      </View>

      <Button
        text="SUBMIT ANSWER"
        preset="filled"
        disabled={selectedIndex === null || isSubmitting}
        disabledStyle={$disabledButton}
        style={themed($submitButton)}
        textStyle={themed($submitButtonText)}
        onPress={onSubmit}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.md,
  gap: spacing.lg,
})

const $progressGroup: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $progressBar: ViewStyle = {
  flex: 1,
}

const $options: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $submitButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.tint,
  borderWidth: 0,
  borderRadius: 9999,
  marginTop: "auto",
  marginBottom: spacing.lg,
})

const $submitButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.onPrimary,
})

const $disabledButton: ViewStyle = {
  opacity: 0.4,
}
