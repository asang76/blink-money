import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { DashboardTask } from "./dashboard.types"

interface TaskCardProps extends DashboardTask {
  onPressCta?: () => void
}

export function TaskCard(props: TaskCardProps) {
  const { icon, title, subtitle, xpReward, ctaLabel, onPressCta } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($iconCircle)}>
        <Feather name={icon} size={22} color={theme.colors.tint} />
      </View>

      <Text text={title} weight="bold" size="lg" />
      <Text text={subtitle} size="sm" style={themed($subtitle)} />

      <View style={themed($footerRow)}>
        <View style={themed($xpChip)}>
          <Feather name="star" size={12} color={theme.colors.tint} />
          <Text text={`+${xpReward} XP`} size="xxs" weight="medium" style={themed($xpChipText)} />
        </View>

        <Button
          text={ctaLabel.toUpperCase()}
          preset="filled"
          style={themed($ctaButton)}
          textStyle={themed($ctaButtonText)}
          onPress={onPressCta}
        />
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.surfaceContainer,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 24,
  padding: spacing.lg,
  gap: spacing.xs,
})

const $iconCircle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 44,
  height: 44,
  borderRadius: 22,
  borderWidth: 1,
  borderColor: colors.tint,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.sm,
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginBottom: spacing.md,
})

const $footerRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

const $xpChip: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
  backgroundColor: colors.surface,
  borderRadius: 9999,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
})

const $xpChipText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $ctaButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.tint,
  borderWidth: 0,
  minHeight: 40,
  paddingHorizontal: spacing.md,
  borderRadius: 12,
})

const $ctaButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.onPrimary,
  fontSize: 13,
})
