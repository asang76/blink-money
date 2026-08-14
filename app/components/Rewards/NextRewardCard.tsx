import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Button } from "@/components/Button"
import { ProgressBar } from "@/components/ProgressBar"
import { StatRow } from "@/components/StatRow"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface NextRewardCardProps {
  title: string
  currentXp: number
  unlockAtXp: number
  onPressEarnXp?: () => void
}

export function NextRewardCard(props: NextRewardCardProps) {
  const { title, currentXp, unlockAtXp, onPressEarnXp } = props
  const { themed, theme } = useAppTheme()

  const xpRemaining = Math.max(unlockAtXp - currentXp, 0)
  const progress = unlockAtXp > 0 ? currentXp / unlockAtXp : 0
  const percentLabel = `${Math.round(Math.min(progress, 1) * 100)}%`

  return (
    <View style={themed($container)}>
      <View style={themed($labelRow)}>
        <Feather name="lock" size={12} color={theme.colors.tint} />
        <Text text="NEXT REWARD" size="xxs" weight="medium" style={themed($label)} />
      </View>

      <View style={themed($titleRow)}>
        <Text text="🎁" size="lg" />
        <Text text={title} weight="bold" size="xl" />
      </View>

      <Text
        text={`Unlock at ${unlockAtXp.toLocaleString("en-IN")} XP`}
        size="sm"
        style={themed($subtitle)}
      />

      <StatRow
        icon="trending-up"
        label={`${xpRemaining} XP remaining`}
        value={percentLabel}
        valueColor={theme.colors.tint}
      />

      <ProgressBar progress={progress} style={themed($progressBar)} />

      <Button
        text="EARN XP"
        preset="filled"
        style={themed($ctaButton)}
        textStyle={themed($ctaButtonText)}
        LeftAccessory={({ style }) => (
          <Feather name="zap" size={16} color={theme.colors.onPrimary} style={style} />
        )}
        onPress={onPressEarnXp}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.surfaceContainer,
  borderWidth: 1,
  borderColor: colors.tint,
  borderRadius: 24,
  padding: spacing.lg,
  gap: spacing.sm,
})

const $labelRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
  letterSpacing: 1,
})

const $titleRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginBottom: spacing.xs,
})

const $progressBar: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $ctaButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
  borderWidth: 0,
  borderRadius: 12,
})

const $ctaButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.onPrimary,
})
