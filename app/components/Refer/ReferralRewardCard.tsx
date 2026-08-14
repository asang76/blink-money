import { TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface ReferralRewardCardProps {
  title: string
  description: string
  onPressInvite?: () => void
}

export function ReferralRewardCard(props: ReferralRewardCardProps) {
  const { title, description, onPressInvite } = props
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <Text text="YOUR REWARD" size="xxs" weight="medium" style={themed($label)} />

      <View style={themed($titleRow)}>
        <Text text="🎁" size="lg" />
        <Text text={title} weight="bold" size="xl" />
      </View>

      <Text text={description} size="sm" style={themed($description)} />

      <Button
        text="INVITE A FRIEND"
        preset="filled"
        style={themed($ctaButton)}
        textStyle={themed($ctaButtonText)}
        onPress={onPressInvite}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.surfaceContainer,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 24,
  padding: spacing.lg,
  gap: spacing.sm,
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

const $description: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
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
