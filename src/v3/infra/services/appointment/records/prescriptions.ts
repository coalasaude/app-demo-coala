import { Medicine } from '@/types/medicine'

import apiRequest from '../../api'

type AddPrescriptionParams = {
  appointmentId: number
  data: {
    medicine: Medicine[]
    certificatePass: string
    valid_until: string
  }
}

export function addPrescription({ appointmentId, data }: AddPrescriptionParams) {
  return apiRequest({
    path: 'appointments/:id/prescriptions',
    method: 'POST',
    pathParams: {
      id: appointmentId,
    },
    body: {
      ...data,
      certification_password: data.certificatePass,
      medicine: data?.medicine?.filter((medicine: Medicine) => !!medicine.name),
      appointment_id: appointmentId,
      valid_until: Number(data.valid_until),
    },
  })
}
