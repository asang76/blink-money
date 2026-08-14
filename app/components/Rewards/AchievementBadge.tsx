import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { Achievement } from "./rewards.types"

interface AchievementBadgeProps {
  achievement: Achievement
}

type LockState = "locked" | "unlocked"

export function AchievementBadge(props: AchievementBadgeProps) {
  const { icon, title, unlocked, requirementLabel } = props.achievement
  const { themed, theme } = useAppTheme()

  const state: LockState = unlocked ? "unlocked" : "locked"
  const iconColor = unlocked ? theme.colors.tint : theme.colors.textDim

  return (
    <View style={themed($container[state])}>
      {!unlocked && (
        <View style={themed($lockBadge)}>
          <Feather name="lock" size={12} color={theme.colors.textDim} />
        </View>
      )}

      <View style={themed($iconCircle[state])}>
        <Feather name={icon} size={22} color={iconColor} />
      </View>

      <Text text={title} weight="bold" size="xs" style={themed($title[state])} />

      {!unlocked && !!requirementLabel && (
        <Text text={requirementLabel} size="xxs" style={themed($requirement)} />
      )}
    </View>
  )
}

const $containerBase: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  minWidth: "45%",
  alignItems: "center",
  backgroundColor: colors.surfaceContainer,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 20,
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.sm,
  gap: spacing.xxs,
})

const $container: Record<LockState, ThemedStyle<ViewStyle>> = {
  unlocked: (theme) => $containerBase(theme),
  locked: (theme) => ({ ...$containerBase(theme), backgroundColor: theme.colors.surface }),
}

const $lockBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  top: spacing.sm,
  right: spacing.sm,
})

const $iconCircleBase: ThemedStyle<ViewStyle> = () => ({
  width: 56,
  height: 56,
  borderRadius: 28,
  borderWidth: 1,
  alignItems: "center",
  justifyContent: "center",
})

const $iconCircle: Record<LockState, ThemedStyle<ViewStyle>> = {
  unlocked: (theme) => ({
    ...$iconCircleBase(theme),
    borderColor: theme.colors.tint,
    backgroundColor: theme.colors.surface,
  }),
  locked: (theme) => ({
    ...$iconCircleBase(theme),
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceContainer,
  }),
}

const $title: Record<LockState, ThemedStyle<TextStyle>> = {
  unlocked: ({ colors }) => ({ color: colors.text, textAlign: "center" }),
  locked: ({ colors }) => ({ color: colors.textDim, textAlign: "center" }),
}

const $requirement: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
})
