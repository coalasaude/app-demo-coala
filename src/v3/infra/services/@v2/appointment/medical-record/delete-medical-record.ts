import apiRequest from '../../../api'

export interface DeleteUserMedicalRecordParams {
  medicalRecordId: number
  appointmentId: number
}

export async function deleteMedicalRecord({
  appointmentId,
  medicalRecordId,
}: DeleteUserMedicalRecordParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/appointments/:appointmentId/medical-records/:medicalRecordId',
    pathParams: { appointmentId, medicalRecordId },
  })
}
