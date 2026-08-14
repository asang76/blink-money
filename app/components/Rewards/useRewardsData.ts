import { useMemo } from "react"

import type { RewardsData } from "./rewards.types"

export function useRewardsData(): RewardsData {
  return useMemo(
    () => ({
      progress: {
        currentXp: 880,
        level: 3,
        nextLevel: 4,
        xpToNextReward: 120,
        nextRewardThreshold: 1000,
      },
      nextReward: {
        title: "₹100 Bonus*",
        currentXp: 880,
        unlockAtXp: 1000,
      },
      achievements: [
        { id: "welcome", title: "Welcome", icon: "flag", unlocked: true },
        { id: "quiz-starter", title: "Quiz Starter", icon: "help-circle", unlocked: true },
        { id: "streak-7", title: "7 Day Streak", icon: "zap", unlocked: true },
        {
          id: "wealth-builder",
          title: "Wealth Builder",
          icon: "briefcase",
          unlocked: false,
          requirementLabel: "2,000 XP",
        },
        {
          id: "wealth-connector",
          title: "Wealth Connector",
          icon: "share-2",
          unlocked: false,
          requirementLabel: "Refer 3 friends",
        },
      ],
    }),
    [],
  )
}
