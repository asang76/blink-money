import { FC } from "react"
import { View, ViewStyle } from "react-native"

import { AppHeader } from "@/components/AppHeader"
import {
  ProgressCard,
  StreakCard,
  TaskCard,
  useDashboardData,
  WealthSummary,
} from "@/components/Dashboard"
import { Screen } from "@/components/Screen"
import type { MainTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface DashboardScreenProps extends MainTabScreenProps<"Home"> {}

export const DashboardScreen: FC<DashboardScreenProps> = function DashboardScreen(props) {
  const { navigation } = props
  const { themed } = useAppTheme()
  const data = useDashboardData()

  return (
    <Screen preset="scroll" contentContainerStyle={themed($content)} safeAreaEdges={["top"]}>
      <AppHeader
        title="BlinkMoney"
        avatarUrl={data.avatarUrl}
        avatarInitial={data.userName.charAt(0).toUpperCase()}
        hasUnreadNotifications={data.hasUnreadNotifications}
      />

      <View style={themed($body)}>
        <WealthSummary
          userName={data.userName}
          balance={data.balance}
          changeAmount={data.changeAmount}
          changePercent={data.changePercent}
          periodLabel={data.periodLabel}
        />

        <StreakCard streakCount={data.streakCount} days={data.streakDays} />

        <TaskCard
          icon={data.task.icon}
          title={data.task.title}
          subtitle={data.task.subtitle}
          xpReward={data.task.xpReward}
          ctaLabel={data.task.ctaLabel}
          onPressCta={() => navigation.navigate("Quiz")}
        />

        <ProgressCard
          xp={data.progress.xp}
          level={data.progress.level}
          xpToNextReward={data.progress.xpToNextReward}
          nextRewardLabel={data.progress.nextRewardLabel}
          onPressViewRewards={() => navigation.navigate("Rewards")}
        />
      </View>
    </Screen>
  )
}

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxl,
  gap: spacing.md,
})

const $body: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  gap: spacing.md,
})
