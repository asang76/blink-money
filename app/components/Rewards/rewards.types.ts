import { ComponentProps } from "react"
import { Feather } from "@expo/vector-icons"

export interface RewardsProgress {
  currentXp: number
  level: number
  nextLevel: number
  xpToNextReward: number
  nextRewardThreshold: number
}

export interface NextReward {
  title: string
  currentXp: number
  unlockAtXp: number
}

export interface Achievement {
  id: string
  title: string
  icon: ComponentProps<typeof Feather>["name"]
  unlocked: boolean
  requirementLabel?: string
}

export interface RewardsData {
  progress: RewardsProgress
  nextReward: NextReward
  achievements: Achievement[]
}
