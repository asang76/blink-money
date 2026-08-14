import { ComponentProps } from "react"
import { Feather } from "@expo/vector-icons"

export type StreakDayStatus = "complete" | "current" | "upcoming"

export interface StreakDay {
  label: string
  status: StreakDayStatus
}

export interface DashboardTask {
  icon: ComponentProps<typeof Feather>["name"]
  title: string
  subtitle: string
  xpReward: number
  ctaLabel: string
}

export interface DashboardProgress {
  xp: number
  level: number
  xpToNextReward: number
  nextRewardLabel: string
}

export interface DashboardData {
  userName: string
  avatarUrl?: string
  hasUnreadNotifications: boolean
  balance: number
  changeAmount: number
  changePercent: number
  periodLabel: string
  streakCount: number
  streakDays: StreakDay[]
  task: DashboardTask
  progress: DashboardProgress
}
