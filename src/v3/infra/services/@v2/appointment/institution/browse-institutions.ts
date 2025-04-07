import {
  InstitutionBrowseModelConstructor,
  InstitutionBrowseModel,
} from '@/v3/domain/@v2/appointment/institution-browse.model'

import apiRequest from '../../../api'

type BrowseAppointmentInstitutionResponse = InstitutionBrowseModelConstructor

export interface BrowseAppointmentInstitutionParams {
  search?: string
  offset?: number
  limit?: number
}

export async function browseAppointmentInstitutions(params: BrowseAppointmentInstitutionParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/institutions',
    queryParams: { ...params, name: params.search },
  })) as BrowseAppointmentInstitutionResponse

  return new InstitutionBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
