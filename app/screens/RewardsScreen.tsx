import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { AppHeader } from "@/components/AppHeader"
import {
  AchievementBadge,
  NextRewardCard,
  useRewardsData,
  XpSummaryCard,
} from "@/components/Rewards"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { MainTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface RewardsScreenProps extends MainTabScreenProps<"Rewards"> {}

export const RewardsScreen: FC<RewardsScreenProps> = function RewardsScreen(props) {
  const { navigation } = props
  const { themed } = useAppTheme()
  const data = useRewardsData()

  return (
    <Screen preset="scroll" contentContainerStyle={themed($content)} safeAreaEdges={["top"]}>
      <AppHeader title="Rewards" leadingIcon="user" />

      <View style={themed($body)}>
        <XpSummaryCard
          currentXp={data.progress.currentXp}
          level={data.progress.level}
          nextLevel={data.progress.nextLevel}
          xpToNextReward={data.progress.xpToNextReward}
          nextRewardThreshold={data.progress.nextRewardThreshold}
        />

        <NextRewardCard
          title={data.nextReward.title}
          currentXp={data.nextReward.currentXp}
          unlockAtXp={data.nextReward.unlockAtXp}
          onPressEarnXp={() => navigation.navigate("Quiz")}
        />

        <View style={themed($achievementsSection)}>
          <Text text="YOUR ACHIEVEMENTS" size="xxs" weight="medium" style={themed($sectionLabel)} />

          <View style={themed($achievementsGrid)}>
            {data.achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </View>
        </View>
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

const $achievementsSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $sectionLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  letterSpacing: 1,
})

const $achievementsGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.sm,
})
