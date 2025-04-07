import apiRequest from '../../../api'

export interface RegenerateUserMedicalRecordParams {
  medicalRecordId: number
  appointmentId: number
}

export async function regenerateMedicalRecord({
  appointmentId,
  medicalRecordId,
}: RegenerateUserMedicalRecordParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/medical-records/:medicalRecordId/regenerate',
    pathParams: { appointmentId, medicalRecordId },
  })
}
