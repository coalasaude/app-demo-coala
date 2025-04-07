import { DiagnoseType } from '@/v3/domain/@v2/appointment/diagnose.model'

import apiRequest from '../../../api'

export interface AddDiagnoseParams {
  appointmentId: number
  type: DiagnoseType
  diagnoseExternal: boolean
  date: Date
  cidId: number
  externalDocCRM?: string
  externalDocName?: string
}

export async function addDiagnose({ appointmentId, ...params }: AddDiagnoseParams) {
  const medicalRecord = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/diagnoses',
    body: params,
    pathParams: { appointmentId },
  })) as { id: number }

  return medicalRecord
}
