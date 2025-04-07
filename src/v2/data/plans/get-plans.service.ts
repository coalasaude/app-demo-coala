import { IListResponse } from '@/types/request'
import { Plan, TPlan } from '@/v2/domain/Plan'
import { TApiRequest } from '@/v2/infra/request'
import { convertObjectToCamelCase } from '@/v2/utils/convert-object-to-camel-case'

export class GetPlans {
  constructor(private readonly apiRequest: TApiRequest) {}
  async get({ name }: { name?: string }) {
    const planData = await this.apiRequest.execute<IListResponse<TPlan>>({
      method: 'GET',
      path: 'plan',
      queryParams: {
        name,
      },
    })
    return planData.results.map((plan) => new Plan(convertObjectToCamelCase(plan)))
  }
}
