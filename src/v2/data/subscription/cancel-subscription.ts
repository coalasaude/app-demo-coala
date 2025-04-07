import { TUser } from '@/v2/domain/User'
import { TApiRequest } from '@/v2/infra/request'

export class CancelSubscription {
  constructor(private readonly apiRequest: TApiRequest) {}
  async cancel({ cancelAtPeriodEnd }: { cancelAtPeriodEnd: boolean }) {
    const data = await this.apiRequest.execute<TUser>({
      path: `subscription`,
      method: 'DELETE',
      body: {
        cancel_at_period_end: cancelAtPeriodEnd,
      },
    })
    return data
  }
}
