import apiRequest from '../../api'

type AddSickNotesParams = {
  appointmentId: number
  data: {
    body: string
    cidId: number
    certificatePass: string
    validUntil: string
  }
}

export function postSickNote({ appointmentId, data }: AddSickNotesParams) {
  return apiRequest({
    path: 'appointments/:appointmentId/sick-notes',
    method: 'POST',
    pathParams: { appointmentId },
    body: {
      ...data,
      cid_id: data.cidId ? Number(data.cidId) : null,
      certification_password: data.certificatePass,
      valid_until: Number(data.validUntil),
      appointment_id: appointmentId,
    },
  })
}
