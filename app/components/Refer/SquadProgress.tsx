import { TextStyle, View, ViewStyle } from "react-native"

import { ProgressBar } from "@/components/ProgressBar"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface SquadProgressProps {
  joinedCount: number
  requiredFriends: number
  nextBadgeName: string
}

export function SquadProgress(props: SquadProgressProps) {
  const { joinedCount, requiredFriends, nextBadgeName } = props
  const { themed } = useAppTheme()

  const remaining = Math.max(requiredFriends - joinedCount, 0)
  const progress = requiredFriends > 0 ? joinedCount / requiredFriends : 0

  return (
    <View style={themed($container)}>
      <View style={themed($headerRow)}>
        <Text text="WEALTH SQUAD PROGRESS" size="xxs" weight="medium" style={themed($label)} />
        <Text text={`${joinedCount} / ${requiredFriends} friends`} weight="bold" size="sm" />
      </View>

      <ProgressBar progress={progress} />

      {remaining > 0 && (
        <Text size="sm" style={themed($helperText)}>
          Refer {remaining} more friend{remaining === 1 ? "" : "s"} to unlock:{" "}
          <Text text={nextBadgeName} weight="bold" style={themed($badgeName)} /> badge
        </Text>
      )}
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xs,
})

const $headerRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  letterSpacing: 1,
})

const $helperText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $badgeName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})
