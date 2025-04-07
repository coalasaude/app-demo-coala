import { RankingUserReqData } from '@/types/analytics'

export const adapterRanking = (property: RankingUserReqData[]) => {
  if (!property) {
    return false
  }
  return property.map(({ count, user }) => ({
    id: user?.id || 0,
    name: `${user?.name} ${user?.lastname}`,
    number: count,
    profile: user?.UserProfile?.map(({ profile }) => profile.name).join(', '),
  }))
}
