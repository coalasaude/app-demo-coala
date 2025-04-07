import apiRequest from '@/services/api'

type Params = { name: string; categoryId: number; userId: number }

export async function readSubCategory(params: Params) {
  const subCategory = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/category/:categoryId/subcategory/:name',
    pathParams: params,
  })) as { id: number } | null

  return subCategory
}
