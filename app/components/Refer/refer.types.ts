export type SquadMemberStatus = "joined" | "invited"

export interface SquadMember {
  id: string
  name: string
  status: SquadMemberStatus
}

export interface ReferralReward {
  title: string
  description: string
}

export interface ReferData {
  requiredFriends: number
  members: SquadMember[]
  reward: ReferralReward
  nextBadgeName: string
  shareMessage: string
}
