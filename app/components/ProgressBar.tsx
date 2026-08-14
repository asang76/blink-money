import { StyleProp, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface ProgressBarProps {
  progress: number
  style?: StyleProp<ViewStyle>
  trackStyle?: StyleProp<ViewStyle>
}

export function ProgressBar(props: ProgressBarProps) {
  const { progress, style, trackStyle } = props
  const { themed } = useAppTheme()

  const clamped = Math.min(Math.max(progress, 0), 1)

  return (
    <View style={[themed($track), trackStyle, style]}>
      <View style={themed([$fill, { width: `${clamped * 100}%` }])} />
    </View>
  )
}

const $track: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral400,
  overflow: "hidden",
})

const $fill: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: "100%",
  borderRadius: 4,
  backgroundColor: colors.tint,
})
