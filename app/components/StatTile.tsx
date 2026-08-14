import { ComponentProps } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "./Text"

interface StatTileProps {
  icon: ComponentProps<typeof Feather>["name"]
  label: string
}

export function StatTile(props: StatTileProps) {
  const { icon, label } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      <Feather name={icon} size={18} color={theme.colors.textDim} />
      <Text text={label} size="xs" weight="medium" style={themed($label)} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  alignItems: "center",
  backgroundColor: colors.surface,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 12,
  paddingVertical: spacing.md,
  gap: spacing.xxs,
})

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})
