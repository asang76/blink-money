export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  correctXp: number
  incorrectXp: number
}

export interface QuizMeta {
  title: string
  subtitle: string
  estimatedTime: string
  completionXp: number
}

export interface QuizAnswer {
  questionIndex: number
  selectedIndex: number | null
  isCorrect: boolean
}

export type PersistedQuizStep = "question" | "feedback"

export interface PersistedQuizSession {
  sessionId: string
  questions: QuizQuestion[]
  step: PersistedQuizStep
  questionIndex: number
  selectedIndex: number | null
  answers: QuizAnswer[]
  secondsRemaining: number
}
