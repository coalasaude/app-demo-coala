import apiRequest from '../../../api'

export interface RegenerateUserPrescriptionParams {
  prescriptionId: number
  appointmentId: number
}

export async function regeneratePrescription({
  appointmentId,
  prescriptionId,
}: RegenerateUserPrescriptionParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/prescriptions/:prescriptionId/regenerate',
    pathParams: { appointmentId, prescriptionId },
  })
}
