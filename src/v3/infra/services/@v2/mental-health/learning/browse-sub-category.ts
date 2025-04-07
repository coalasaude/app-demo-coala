import apiRequest from '@/services/api'
import { BrowseSubCategory } from '@/v3/domain/@v2/mental-health/learning/browse-sub-category.model'

type Params = { name?: string; categoryId: number; patientId: number }

export async function browseSubCategory(params: Params) {
  const subCategory = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/category/:categoryId/subcategory',
    pathParams: { ...params, userId: params.patientId },
  })) as BrowseSubCategory

  return subCategory
}
