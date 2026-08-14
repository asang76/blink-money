import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface QuizHeaderProps {
  title: string
  rightLabel?: string
  onPressBack: () => void
}

export function QuizHeader(props: QuizHeaderProps) {
  const { title, rightLabel, onPressBack } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($titleGroup)}>
        <Pressable onPress={onPressBack} hitSlop={8}>
          <Feather name="arrow-left" size={20} color={theme.colors.text} />
        </Pressable>
        <Text text={title} weight="bold" size="lg" />
      </View>

      {!!rightLabel && <Text text={rightLabel} size="xs" style={themed($rightLabel)} />}
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.md,
})

const $titleGroup: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $rightLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
