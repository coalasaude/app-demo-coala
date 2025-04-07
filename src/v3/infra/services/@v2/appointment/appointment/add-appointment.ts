import { appendFormData } from '@/v3/utils/append-form-data'

import apiRequest from '../../../api'

export interface AddAppointmentParams {
  patientId?: number
  requesterId?: number
  institutionId: number
  resume: string
  file?: File | null
  enableNotification?: boolean | null
}

type AddAppointmentResponse = { id: number }

export async function addAppointment(params: AddAppointmentParams) {
  const formData = appendFormData(params)
  formData.delete('institutionId')

  const appointment = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/institutions/:institutionId/appointments',
    pathParams: { institutionId: params.institutionId },
    body: formData,
    cType: 'multipart/form-data',
  })) as AddAppointmentResponse

  return appointment
}
