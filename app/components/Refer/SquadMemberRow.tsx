import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Avatar } from "@/components/Avatar"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { SquadMember } from "./refer.types"

interface SquadMemberRowProps {
  member: SquadMember
}

export function SquadMemberRow(props: SquadMemberRowProps) {
  const { name, status } = props.member
  const { themed, theme } = useAppTheme()

  const isJoined = status === "joined"

  return (
    <View style={themed($container)}>
      <Avatar initial={name.charAt(0).toUpperCase()} />
      <Text text={name} weight="bold" size="sm" style={themed($name)} />

      <View style={themed($statusChip)}>
        {isJoined ? (
          <Feather name="check-circle" size={12} color={theme.colors.tint} />
        ) : (
          <Text text="⏳" size="xxs" />
        )}
        <Text
          text={isJoined ? "Joined" : "Invited"}
          size="xxs"
          weight="bold"
          style={themed(isJoined ? $statusText.joined : $statusText.invited)}
        />
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.surfaceContainer,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 16,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.sm,
  gap: spacing.sm,
})

const $name: ThemedStyle<TextStyle> = () => ({
  flex: 1,
})

const $statusChip: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
  borderRadius: 9999,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  backgroundColor: colors.surface,
})

const $statusText: Record<"joined" | "invited", ThemedStyle<TextStyle>> = {
  joined: ({ colors }) => ({ color: colors.tint }),
  invited: ({ colors }) => ({ color: colors.textDim }),
}
