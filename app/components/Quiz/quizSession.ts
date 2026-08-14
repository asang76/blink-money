import { load, remove, save } from "@/utils/storage"

import type { PersistedQuizSession } from "./quiz.types"

const QUIZ_SESSION_KEY = "blinkMoney.quiz.session"
const LAST_COMPLETED_DATE_KEY = "blinkMoney.quiz.lastCompletedDate"

export function saveQuizSession(session: PersistedQuizSession) {
  save(QUIZ_SESSION_KEY, session)
}

export function loadQuizSession(): PersistedQuizSession | null {
  return load<PersistedQuizSession>(QUIZ_SESSION_KEY)
}

export function clearQuizSession() {
  remove(QUIZ_SESSION_KEY)
}

function todayDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * Local, single-device best-effort guard: has this device already claimed today's quiz reward?
 * This is NOT a substitute for server-side idempotency — a real backend needs to be the source of
 * truth once the same account can be used from multiple devices, since local storage can't see
 * what another device already claimed.
 */
export function hasCompletedQuizToday(): boolean {
  return load<string>(LAST_COMPLETED_DATE_KEY) === todayDateString()
}

export function markQuizCompletedToday() {
  save(LAST_COMPLETED_DATE_KEY, todayDateString())
}

export function createQuizSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
