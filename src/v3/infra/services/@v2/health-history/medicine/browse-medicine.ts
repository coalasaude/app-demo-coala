import {
  MedicineBrowseModel,
  MedicineBrowseModelConstructor,
} from '@/v3/domain/@v2/health-history/medicine/medicine-browse.model'

import apiRequest from '../../../api'

type BrowseMedicineResponse = MedicineBrowseModelConstructor

export interface BrowseMedicineParams {
  userId: number
}

export async function browseMedicine({ userId }: BrowseMedicineParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/medicine',
    pathParams: { userId },
  })) as BrowseMedicineResponse

  return new MedicineBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
