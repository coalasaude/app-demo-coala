import {
  AllergyCategoryBrowseModel,
  AllergyCategoryBrowseModelConstructor,
} from '@/v3/domain/@v2/health-history/allergy/allergy-category-browse.model'

import apiRequest from '../../../api'

type BrowseAllergyCategoryResponse = AllergyCategoryBrowseModelConstructor

export async function browseAllergyCategory() {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/health-history/allergy/categories',
  })) as BrowseAllergyCategoryResponse

  return new AllergyCategoryBrowseModel({ data: data.data })
}
