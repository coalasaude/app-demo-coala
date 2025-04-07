import apiRequest from '@/services/api'

type AddSubCategoryResponse = { id: number }

type Params = { name: string; categoryId: number; patientId: number }

export async function addSubCategory(params: Params) {
  const sub = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/category/:categoryId/subcategory',
    pathParams: { userId: params.patientId, categoryId: params.categoryId },
    body: params,
  })) as AddSubCategoryResponse

  return sub
}
