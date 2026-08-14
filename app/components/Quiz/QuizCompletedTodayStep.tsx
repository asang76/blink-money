import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface QuizCompletedTodayStepProps {
  onBackToHome: () => void
}

export function QuizCompletedTodayStep(props: QuizCompletedTodayStepProps) {
  const { onBackToHome } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($iconCircle)}>
        <Feather name="check-circle" size={36} color={theme.colors.tint} />
      </View>

      <Text text="You're all caught up!" weight="bold" size="xl" style={themed($title)} />
      <Text
        text="You've already completed today's Wealth Quiz. Come back tomorrow for a new one and keep your streak going."
        size="sm"
        style={themed($subtitle)}
      />

      <Button
        text="BACK TO HOME"
        preset="filled"
        style={themed($ctaButton)}
        textStyle={themed($ctaButtonText)}
        onPress={onBackToHome}
      />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
  gap: spacing.xs,
})

const $iconCircle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 88,
  height: 88,
  borderRadius: 44,
  borderWidth: 1,
  borderColor: colors.tint,
  backgroundColor: colors.surfaceContainer,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.md,
})

const $title: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: "center",
  marginBottom: spacing.xl,
})

const $ctaButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignSelf: "stretch",
  backgroundColor: colors.tint,
  borderWidth: 0,
  borderRadius: 12,
  marginTop: spacing.md,
})

const $ctaButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.onPrimary,
})
