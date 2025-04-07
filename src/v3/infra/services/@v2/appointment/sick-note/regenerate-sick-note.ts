import apiRequest from '../../../api'

export interface RegenerateUserSickNoteParams {
  sickNoteId: number
  appointmentId: number
}

export async function regenerateSickNote({
  appointmentId,
  sickNoteId,
}: RegenerateUserSickNoteParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/sick-notes/:sickNoteId/regenerate',
    pathParams: { appointmentId, sickNoteId },
  })
}
