import { ComponentProps } from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { useAppTheme } from "@/theme/context"

import { Text } from "./Text"

interface AvatarProps {
  imageUrl?: string
  initial?: string
  icon?: ComponentProps<typeof Feather>["name"]
  size?: number
}

export function Avatar(props: AvatarProps) {
  const { imageUrl, initial, icon, size = 36 } = props
  const { theme } = useAppTheme()

  const dimensions = { width: size, height: size, borderRadius: size / 2 }

  if (imageUrl) {
    const $image: ImageStyle = dimensions
    return <Image source={{ uri: imageUrl }} style={$image} />
  }

  const $fallback: ViewStyle = {
    ...dimensions,
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: theme.colors.tint,
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <View style={$fallback}>
      {initial ? (
        <Text text={initial} weight="bold" style={{ color: theme.colors.tint }} />
      ) : (
        <Feather name={icon ?? "user"} size={size * 0.45} color={theme.colors.tint} />
      )}
    </View>
  )
}
