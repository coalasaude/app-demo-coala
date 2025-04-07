import {
  UserVaccineBrowseModel,
  UserVaccineBrowseModelConstructor,
} from '@/v3/domain/@v2/health-history/vaccine/user-vaccine-browse.model'

import apiRequest from '../../../api'

type BrowseUserVaccineResponse = UserVaccineBrowseModelConstructor

export interface BrowseUserVAccineParams {
  userId: number
}

export async function browseUserVaccine({ userId }: BrowseUserVAccineParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/vaccine',
    pathParams: { userId },
  })) as BrowseUserVaccineResponse

  return new UserVaccineBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
