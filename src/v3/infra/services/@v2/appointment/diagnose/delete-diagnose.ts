import apiRequest from '../../../api'

export interface DeleteUserDiagnoseParams {
  diagnoseId: number
  appointmentId: number
}

export async function deleteDiagnose({ appointmentId, diagnoseId }: DeleteUserDiagnoseParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/appointments/:appointmentId/diagnoses/:diagnoseId',
    pathParams: { appointmentId, diagnoseId },
  })
}
