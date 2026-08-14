import type { StreakDay } from "./dashboard.types"

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"]

export function getWeekStreakDays(today = new Date()): StreakDay[] {
  const todayIndex = (today.getDay() + 6) % 7

  return DAY_LABELS.map((label, index) => ({
    label,
    status: index < todayIndex ? "complete" : index === todayIndex ? "current" : "upcoming",
  }))
}
