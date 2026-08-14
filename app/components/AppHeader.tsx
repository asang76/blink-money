import { ComponentProps } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Avatar } from "./Avatar"
import { Text } from "./Text"

interface AppHeaderProps {
  title: string
  avatarUrl?: string
  avatarInitial?: string
  leadingIcon?: ComponentProps<typeof Feather>["name"]
  hasUnreadNotifications?: boolean
  onPressNotifications?: () => void
}

export function AppHeader(props: AppHeaderProps) {
  const {
    title,
    avatarUrl,
    avatarInitial,
    leadingIcon,
    hasUnreadNotifications,
    onPressNotifications,
  } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($identity)}>
        <Avatar imageUrl={avatarUrl} initial={avatarInitial} icon={leadingIcon} />
        <Text text={title} weight="bold" size="lg" />
      </View>

      <Pressable style={themed($bellButton)} onPress={onPressNotifications} hitSlop={8}>
        <Feather name="bell" size={20} color={theme.colors.text} />
        {hasUnreadNotifications && <View style={themed($unreadDot)} />}
      </Pressable>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing.md,
  paddingBottom: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
})

const $identity: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $bellButton: ThemedStyle<ViewStyle> = () => ({
  width: 36,
  height: 36,
  alignItems: "center",
  justifyContent: "center",
})

const $unreadDot: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 6,
  right: 6,
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.tint,
})
