import { TUser } from '@/v2/domain/User'
import { TApiRequest } from '@/v2/infra/request'

export interface TCreateSubscription {
  planId: number
  userProfileId?: number
  coupon?: string
}
export class CreateSubscription {
  constructor(private readonly apiRequest: TApiRequest) {}
  async create({ planId, coupon, userProfileId }: TCreateSubscription) {
    const data = await this.apiRequest.execute<TUser>({
      path: `subscription`,
      method: 'POST',
      body: {
        plan_id: planId,
        coupon: coupon?.toLowerCase(),
        user_profile_id: userProfileId,
      },
    })
    return data
  }
}
