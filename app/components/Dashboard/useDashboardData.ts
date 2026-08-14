import { useMemo } from "react"

import type { DashboardData } from "./dashboard.types"
import { getWeekStreakDays } from "./getWeekStreakDays"

export function useDashboardData(): DashboardData {
  return useMemo(
    () => ({
      userName: "Asang",
      hasUnreadNotifications: true,
      balance: 245200,
      changeAmount: 1280,
      changePercent: 4.8,
      periodLabel: "this month",
      streakCount: 12,
      streakDays: getWeekStreakDays(),
      task: {
        icon: "help-circle",
        title: "30-Second Wealth Quiz",
        subtitle: "Test your money knowledge.",
        xpReward: 100,
        ctaLabel: "Take Quiz",
      },
      progress: {
        xp: 780,
        level: 3,
        xpToNextReward: 220,
        nextRewardLabel: "₹100 Bonus*",
      },
    }),
    [],
  )
}
