import { useState } from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { formatCurrency } from "@/utils/formatCurrency"
import { getGreeting } from "@/utils/getGreeting"

interface WealthSummaryProps {
  userName: string
  balance: number
  changeAmount: number
  changePercent: number
  periodLabel: string
}

export function WealthSummary(props: WealthSummaryProps) {
  const { userName, balance, changeAmount, changePercent, periodLabel } = props
  const { themed, theme } = useAppTheme()
  const [isHidden, setIsHidden] = useState(false)

  const isPositive = changeAmount >= 0
  const changeColor = isPositive ? theme.colors.tint : theme.colors.error
  const changeSign = isPositive ? "+" : "-"

  return (
    <View style={themed($container)}>
      <Text text={`${getGreeting()}, ${userName} 👋`} style={themed($greeting)} />

      <View style={themed($balanceRow)}>
        <Text text={isHidden ? "••••••" : formatCurrency(balance)} size="xxl" weight="bold" />
        <Pressable onPress={() => setIsHidden(!isHidden)} hitSlop={12}>
          <Feather name={isHidden ? "eye-off" : "eye"} size={20} color={theme.colors.textDim} />
        </Pressable>
      </View>

      <View style={themed($changeRow)}>
        <Feather
          name={isPositive ? "arrow-up-right" : "arrow-down-right"}
          size={14}
          color={changeColor}
        />
        <Text
          text={`${changeSign}${formatCurrency(Math.abs(changeAmount))} ${periodLabel} `}
          size="xs"
          style={{ color: changeColor }}
        />
        <Text
          text={`(${isPositive ? "↑" : "↓"} ${Math.abs(changePercent)}%)`}
          size="xs"
          style={themed($changePercent)}
        />
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxs,
})

const $greeting: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $balanceRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $changeRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
})

const $changePercent: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
