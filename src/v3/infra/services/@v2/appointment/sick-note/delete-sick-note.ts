import apiRequest from '../../../api'

export interface DeleteUserSickNoteParams {
  sickNoteId: number
  appointmentId: number
}

export async function deleteSickNote({ appointmentId, sickNoteId }: DeleteUserSickNoteParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/appointments/:appointmentId/sick-notes/:sickNoteId',
    pathParams: { appointmentId, sickNoteId },
  })
}
