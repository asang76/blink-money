import { ComponentProps } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "./Text"

interface StatRowProps {
  icon?: ComponentProps<typeof Feather>["name"]
  emoji?: string
  iconColor?: string
  label: string
  value?: string
  valueColor?: string
}

export function StatRow(props: StatRowProps) {
  const { icon, emoji, iconColor, label, value, valueColor } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($iconWrap)}>
        {emoji ? (
          <Text text={emoji} size="sm" />
        ) : icon ? (
          <Feather name={icon} size={16} color={iconColor ?? theme.colors.text} />
        ) : null}
      </View>

      <Text text={label} size="sm" style={themed($label)} />

      {!!value && (
        <Text
          text={value}
          size="sm"
          weight="bold"
          style={[themed($value), valueColor ? { color: valueColor } : undefined]}
        />
      )}
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.surface,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 12,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.sm,
  gap: spacing.xs,
})

const $iconWrap: ThemedStyle<ViewStyle> = () => ({
  width: 24,
  height: 24,
  alignItems: "center",
  justifyContent: "center",
})

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.text,
})

const $value: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})
