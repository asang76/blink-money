import { FC, useCallback, useEffect, useRef, useState } from "react"
import { ViewStyle } from "react-native"

import { useDashboardData } from "@/components/Dashboard"
import {
  clearQuizSession,
  createQuizSessionId,
  hasCompletedQuizToday,
  loadQuizSession,
  markQuizCompletedToday,
  PERFECT_SCORE_BONUS_XP,
  QUESTION_DURATION_SECONDS,
  QuizCompletedTodayStep,
  QuizFeedbackStep,
  QuizHeader,
  QuizIntroStep,
  QuizQuestionStep,
  QuizResultStep,
  saveQuizSession,
  useQuizQuestions,
  type PersistedQuizSession,
  type QuizAnswer,
  type QuizQuestion,
} from "@/components/Quiz"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

type QuizStep = "intro" | "question" | "feedback" | "result" | "completed"

interface QuizScreenProps extends AppStackScreenProps<"Quiz"> {}

export const QuizScreen: FC<QuizScreenProps> = function QuizScreen(props) {
  const { navigation } = props
  const { themed } = useAppTheme()
  const { meta, questions: liveQuestions } = useQuizQuestions()
  const { progress, streakCount } = useDashboardData()

  // Read any resumable session (and today's completion lock) exactly once, on mount.
  const initialLoadRef = useRef<{
    session: PersistedQuizSession | null
    completedToday: boolean
  } | null>(null)
  if (initialLoadRef.current === null) {
    initialLoadRef.current = {
      session: loadQuizSession(),
      completedToday: hasCompletedQuizToday(),
    }
  }
  const { session: resumedSession, completedToday } = initialLoadRef.current

  const [step, setStep] = useState<QuizStep>(() => {
    if (completedToday) return "completed"
    if (resumedSession) return resumedSession.step
    return "intro"
  })
  const [questionIndex, setQuestionIndex] = useState(() => resumedSession?.questionIndex ?? 0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    () => resumedSession?.selectedIndex ?? null,
  )
  const [answers, setAnswers] = useState<QuizAnswer[]>(() => resumedSession?.answers ?? [])
  const [secondsRemaining, setSecondsRemaining] = useState(
    () => resumedSession?.secondsRemaining ?? QUESTION_DURATION_SECONDS,
  )
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>(
    () => resumedSession?.questions ?? [],
  )
  const [sessionId, setSessionId] = useState(() => resumedSession?.sessionId ?? "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasSubmittedRef = useRef(false)

  // Once a quiz is started, we always play through the exact question set it started with —
  // even if the "live" question source changes mid-session.
  const displayQuestions = sessionQuestions.length > 0 ? sessionQuestions : liveQuestions
  const currentQuestion = displayQuestions[questionIndex]
  const isLastQuestion = questionIndex === displayQuestions.length - 1
  const lastAnswer = answers[answers.length - 1]
  const correctCount = answers.filter((answer) => answer.isCorrect).length
  const isPerfectScore = displayQuestions.length > 0 && correctCount === displayQuestions.length
  const xpEarned = meta.completionXp + (isPerfectScore ? PERFECT_SCORE_BONUS_XP : 0)
  const rewardThreshold = progress.xp + progress.xpToNextReward
  const rewardUnlocked = progress.xp < rewardThreshold && progress.xp + xpEarned >= rewardThreshold

  useEffect(() => {
    if (step !== "question" && step !== "feedback") return
    saveQuizSession({
      sessionId,
      questions: sessionQuestions,
      step,
      questionIndex,
      selectedIndex,
      answers,
      secondsRemaining,
    })
  }, [step, questionIndex, selectedIndex, answers, secondsRemaining, sessionQuestions, sessionId])

  const submitAnswer = useCallback(
    (index: number | null) => {
      if (hasSubmittedRef.current) return
      hasSubmittedRef.current = true
      setIsSubmitting(true)

      setAnswers((prev) => [
        ...prev,
        { questionIndex, selectedIndex: index, isCorrect: index === currentQuestion?.correctIndex },
      ])
      setStep("feedback")
    },
    [questionIndex, currentQuestion],
  )

  useEffect(() => {
    if (step !== "question") return
    if (secondsRemaining <= 0) {
      submitAnswer(selectedIndex)
      return
    }
    const timeout = setTimeout(() => setSecondsRemaining((prev) => prev - 1), 1000)
    return () => clearTimeout(timeout)
  }, [step, secondsRemaining, selectedIndex, submitAnswer])

  function handleStart() {
    hasSubmittedRef.current = false
    setIsSubmitting(false)
    setSessionId(createQuizSessionId())
    setSessionQuestions(liveQuestions)
    setSecondsRemaining(QUESTION_DURATION_SECONDS)
    setStep("question")
  }

  function handleContinue() {
    if (isLastQuestion) {
      clearQuizSession()
      markQuizCompletedToday()
      setStep("result")
      return
    }
    hasSubmittedRef.current = false
    setIsSubmitting(false)
    setQuestionIndex((prev) => prev + 1)
    setSelectedIndex(null)
    setSecondsRemaining(QUESTION_DURATION_SECONDS)
    setStep("question")
  }

  function handleExit() {
    navigation.goBack()
  }

  function handleBackToHome() {
    navigation.navigate("Main", { screen: "Home" })  
  }

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={themed($content)}
      safeAreaEdges={["top", "bottom"]}
    >
      {(step === "intro" || step === "question" || step === "completed") && (
        <QuizHeader
          title="Wealth Quiz"
          rightLabel={
            step === "question"
              ? `Question ${questionIndex + 1} of ${displayQuestions.length}`
              : undefined
          }
          onPressBack={handleExit}
        />
      )}

      {step === "completed" && <QuizCompletedTodayStep onBackToHome={handleBackToHome} />}

      {step === "intro" && (
        <QuizIntroStep meta={meta} questionCount={liveQuestions.length} onStart={handleStart} />
      )}

      {step === "question" && !!currentQuestion && (
        <QuizQuestionStep
          question={currentQuestion}
          questionNumber={questionIndex + 1}
          totalQuestions={displayQuestions.length}
          selectedIndex={selectedIndex}
          secondsRemaining={secondsRemaining}
          isSubmitting={isSubmitting}
          onSelect={setSelectedIndex}
          onSubmit={() => submitAnswer(selectedIndex)}
        />
      )}

      {step === "feedback" && !!lastAnswer && !!currentQuestion && (
        <QuizFeedbackStep
          question={currentQuestion}
          isCorrect={lastAnswer.isCorrect}
          isLastQuestion={isLastQuestion}
          onContinue={handleContinue}
        />
      )}

      {step === "result" && (
        <QuizResultStep
          correctCount={correctCount}
          totalQuestions={displayQuestions.length}
          xpEarned={xpEarned}
          startingXp={progress.xp}
          xpToNextReward={progress.xpToNextReward}
          streakCount={streakCount}
          rewardUnlocked={rewardUnlocked}
          rewardLabel={progress.nextRewardLabel}
          onViewRewards={() => navigation.navigate("Main", { screen: "Rewards" })}
          onBackToHome={handleBackToHome}
        />
      )}
    </Screen>
  )
}

const $content: ThemedStyle<ViewStyle> = () => ({
  flexGrow: 1,
})
