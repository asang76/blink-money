import { useMemo } from "react"

import type { ReferData } from "./refer.types"

export function useReferData(): ReferData {
  return useMemo(
    () => ({
      requiredFriends: 3,
      members: [
        { id: "rahul", name: "Rahul", status: "joined" },
        { id: "amit", name: "Amit", status: "invited" },
        { id: "priya", name: "Priya", status: "invited" },
      ],
      reward: {
        title: "Unlock a bonus reward",
        description: "when your friend joins...",
      },
      nextBadgeName: "Wealth Connector",
      shareMessage:
        "Join me on BlinkMoney and build better money habits together! Download the app to get started: https://blinkmoney.app/invite",
    }),
    [],
  )
}
