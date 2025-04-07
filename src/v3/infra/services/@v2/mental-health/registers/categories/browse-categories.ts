import {
  MentalHealthRegisterCategoriesBrowseModel,
  MentalHealthRegisterCategoriesBrowseModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/categories/categories-browse.model'
import apiRequest from '@/v3/infra/services/api'

export type BrowseMentalHealthRegisterCategoriesResponse =
  MentalHealthRegisterCategoriesBrowseModelConstructor

export interface BrowseMentalHealthRegisterCategoriesParams {
  userId: number
}

export async function browseMentalHealthRegisterCategories({
  userId,
}: BrowseMentalHealthRegisterCategoriesParams) {
  const data = (await apiRequest<BrowseMentalHealthRegisterCategoriesResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records',
    pathParams: { userId },
  })) as BrowseMentalHealthRegisterCategoriesResponse

  return new MentalHealthRegisterCategoriesBrowseModel(data)
}
