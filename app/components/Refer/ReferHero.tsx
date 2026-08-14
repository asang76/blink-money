import { TextStyle, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export function ReferHero() {
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <Text text="Build Your Wealth Squad" weight="bold" size="xxl" />
      <Text text="👥" size="lg" />
      <Text
        text="Invite friends. Build better money habits together."
        size="sm"
        style={themed($subtitle)}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xs,
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
