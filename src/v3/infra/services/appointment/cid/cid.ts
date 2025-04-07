import { Cid, CidAppointment } from '@/types/cid'
import { CidAppointmentType } from '@/v3/domain/diagnose'

import apiRequest from '../../api'

type DiagnoseForm = {
  appointmentId: number
  cidId?: number | null
  date: Date
  diagnoseExternal: boolean
  type: CidAppointmentType
  professionalId: number
}

type GetCIDsParams = {
  appointmentId: number
  limit?: number
  offset?: number
  codeDescription?: string
}

export function getCIDs(params: GetCIDsParams) {
  if (!params.appointmentId || !params.codeDescription) return Promise.resolve([])

  return apiRequest<Cid[]>({
    path: `appointments/${params.appointmentId}/cid/code`,
    method: 'GET',
    queryParams: {
      code_description: params.codeDescription,
      limit: params.limit,
      offset: params.offset,
    },
    throwError: true,
  })
}

export function createDiagnose(body: DiagnoseForm) {
  const { appointmentId } = body

  return apiRequest<CidAppointment>({
    path: `appointments/:id/cid`,
    method: 'POST',
    pathParams: {
      id: appointmentId,
    },
    body,
    throwError: true,
  })
}
