import {
  AllergySymptomBrowseModel,
  AllergySymptomBrowseModelConstructor,
} from '@/v3/domain/@v2/health-history/allergy/allergy-symptoms-browse.model'

import apiRequest from '../../../api'

type BrowseAllergySymptomsResponse = AllergySymptomBrowseModelConstructor

export async function browseAllergySymptoms() {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/health-history/allergy/symptoms',
  })) as BrowseAllergySymptomsResponse

  return new AllergySymptomBrowseModel({ data: data.data })
}
