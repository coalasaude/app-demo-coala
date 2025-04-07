import apiRequest from '../../../api'

export interface DeleteUserPrescriptionParams {
  prescriptionId: number
  appointmentId: number
}

export async function deletePrescription({
  appointmentId,
  prescriptionId,
}: DeleteUserPrescriptionParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/appointments/:appointmentId/prescriptions/:prescriptionId',
    pathParams: { appointmentId, prescriptionId },
  })
}
