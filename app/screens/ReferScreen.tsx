import { FC, useCallback } from "react"
import { Share, TextStyle, View, ViewStyle } from "react-native"

import { AppHeader } from "@/components/AppHeader"
import {
  ReferHero,
  ReferralRewardCard,
  SquadMemberRow,
  SquadProgress,
  useReferData,
} from "@/components/Refer"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { MainTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface ReferScreenProps extends MainTabScreenProps<"Refer"> {}

export const ReferScreen: FC<ReferScreenProps> = function ReferScreen() {
  const { themed } = useAppTheme()
  const data = useReferData()

  const joinedCount = data.members.filter((member) => member.status === "joined").length

  const handleInvite = useCallback(() => {
    Share.share({ message: data.shareMessage }).catch(() => {})
  }, [data.shareMessage])

  return (
    <Screen preset="scroll" contentContainerStyle={themed($content)} safeAreaEdges={["top"]}>
      <AppHeader title="BlinkMoney" leadingIcon="users" />

      <View style={themed($body)}>
        <ReferHero />

        <ReferralRewardCard
          title={data.reward.title}
          description={data.reward.description}
          onPressInvite={handleInvite}
        />

        <SquadProgress
          joinedCount={joinedCount}
          requiredFriends={data.requiredFriends}
          nextBadgeName={data.nextBadgeName}
        />

        <View style={themed($squadSection)}>
          <Text text="YOUR SQUAD" size="xxs" weight="medium" style={themed($sectionLabel)} />

          <View style={themed($squadList)}>
            {data.members.map((member) => (
              <SquadMemberRow key={member.id} member={member} />
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
  gap: spacing.lg,
})

const $squadSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $sectionLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  letterSpacing: 1,
})

const $squadList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})
