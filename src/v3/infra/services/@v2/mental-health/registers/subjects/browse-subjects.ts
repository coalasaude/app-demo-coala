import {
  MentalHealthSubjectBrowseModel,
  MentalHealthSubjectBrowseModelConstructor,
} from '@/v3/domain/@v2/mental-health/registers/subjects/subjects-browse.model'

import apiRequest from '../../../../api'

export type BrowseMentalHealthSubjectResponse = MentalHealthSubjectBrowseModelConstructor

export interface BrowseMentalHealthSubjectParams {
  offset?: number
  limit?: number
  search?: string
}

export async function browseMentalHealthSubject({
  search,
  ...params
}: BrowseMentalHealthSubjectParams) {
  const data = (await apiRequest<BrowseMentalHealthSubjectResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/mental-health/records/subjects',
    queryParams: { name: search, ...params },
  })) as BrowseMentalHealthSubjectResponse

  return new MentalHealthSubjectBrowseModel(data)
}
