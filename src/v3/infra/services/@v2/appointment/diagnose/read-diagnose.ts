import { DiagnoseModel, DiagnoseModelConstructor } from '@/v3/domain/@v2/appointment/diagnose.model'

import apiRequest from '../../../api'

export type ReadDiagnoseResponse = DiagnoseModelConstructor

export interface ReadDiagnoseParams {
  appointmentId: number
  diagnoseId: number
}

export async function readDiagnose({ appointmentId, diagnoseId }: ReadDiagnoseParams) {
  const data = (await apiRequest<ReadDiagnoseResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId/diagnoses/:diagnoseId',
    pathParams: { appointmentId, diagnoseId },
  })) as ReadDiagnoseResponse

  return new DiagnoseModel(data)
}
