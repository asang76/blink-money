import { ComponentProps } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Feather } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { DashboardScreen } from "@/screens/DashboardScreen"
import { ProfileScreen } from "@/screens/ProfileScreen"
import { ReferScreen } from "@/screens/ReferScreen"
import { RewardsScreen } from "@/screens/RewardsScreen"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { MainTabParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<MainTabParamList>()

function renderTabIcon(
  name: ComponentProps<typeof Feather>["name"],
  focused: boolean,
  color: string,
  activeBackgroundColor: string,
) {
  return (
    <View style={[$icon, focused && { backgroundColor: activeBackgroundColor }]}>
      <Feather name={name} size={20} color={color} />
    </View>
  )
}

export function MainNavigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: themed([$tabBar, { height: bottom + 64 }]),
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tintInactive,
        tabBarLabelStyle: themed($tabBarLabel),
        tabBarItemStyle: themed($tabBarItem),
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) =>
            renderTabIcon("home", focused, color, colors.palette.primary100),
        }}
      />

      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarLabel: "Rewards",
          tabBarIcon: ({ focused, color }) =>
            renderTabIcon("gift", focused, color, colors.palette.primary100),
        }}
      />

      <Tab.Screen
        name="Refer"
        component={ReferScreen}
        options={{
          tabBarLabel: "Refer",
          tabBarIcon: ({ focused, color }) =>
            renderTabIcon("users", focused, color, colors.palette.primary100),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color }) =>
            renderTabIcon("user", focused, color, colors.palette.primary100),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.border,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.sm,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
})

const $icon: ViewStyle = {
  width: 40,
  height: 32,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
}
