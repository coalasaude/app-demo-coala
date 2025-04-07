import apiRequest from '../../../api'

export interface AddSickNoteParams {
  appointmentId: number
  body: string
  certificationPassword: string
  validUntil: Date
  cidId: number
}

export async function addSickNote({ appointmentId, ...params }: AddSickNoteParams) {
  const sickNote = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/sick-notes',
    body: params,
    pathParams: { appointmentId },
  })) as { id: number }

  return sickNote
}
