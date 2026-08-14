import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Avatar } from "@/components/Avatar"
import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { useHeader } from "@/utils/useHeader"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = function WelcomeScreen(props) {
  const { navigation } = props
  const { themed } = useAppTheme()
  const { logout } = useAuth()

  function goNext() {
    navigation.navigate("Main", { screen: "Home" })
  }

  useHeader(
    {
      rightTx: "common:logOut",
      onRightPress: logout,
    },
    [logout],
  )

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Avatar icon="zap" size={88} />
        <Text text="BlinkMoney" weight="bold" size="xxl" style={themed($wordmark)} />

        <Text text="Master your money." weight="bold" size="xl" style={themed($headline)} />
        <Text
          text="Track spending, build habits, and grow your wealth — one blink at a time."
          size="sm"
          style={themed($subheading)}
        />
      </View>

      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Text text="Free to join. No credit card required." size="xs" style={themed($footnote)} />

        <Button
          testID="next-screen-button"
          text="GET STARTED"
          preset="filled"
          style={themed($ctaButton)}
          textStyle={themed($ctaButtonText)}
          onPress={goNext}
        />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
  gap: spacing.xs,
})

const $wordmark: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  marginBottom: spacing.xl,
})

const $headline: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
})

const $subheading: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: "center",
  marginTop: spacing.xs,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.surfaceContainer,
  borderTopWidth: 1,
  borderTopColor: colors.border,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg,
  paddingBottom: spacing.lg,
  gap: spacing.md,
})

const $footnote: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
})

const $ctaButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
  borderWidth: 0,
  borderRadius: 12,
})

const $ctaButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.onPrimary,
})
