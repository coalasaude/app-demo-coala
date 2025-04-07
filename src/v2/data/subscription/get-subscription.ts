import { TUser } from '@/v2/domain/User'
import { TApiRequest } from '@/v2/infra/request'

export interface TGetSubscription {
  isPending?: boolean
}
export class GetSubscriptionById {
  constructor(private readonly apiRequest: TApiRequest) {}
  async get({ isPending }: TGetSubscription) {
    const data = await this.apiRequest.execute<TUser>({
      path: isPending ? 'subscription/pending' : 'subscription/active',
      method: 'GET',
    })
    return data
  }
}
