import apiRequest from '@/services/api'
import { BrowseCategory } from '@/v3/domain/@v2/mental-health/learning/browse-category.model'

type Params = { name?: string; patientId: number }

export async function browseCategory(params: Params) {
  const category = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/category',
    pathParams: { ...params, userId: params.patientId },
  })) as BrowseCategory

  return category
}
