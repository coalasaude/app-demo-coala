import apiRequest from '../../../api'

export interface DeleteUserSickNoteParams {
  sickNoteId: number
  userId: number
}

export async function deleteSickNote({ userId, sickNoteId }: DeleteUserSickNoteParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/health-history/sick-note/:sickNoteId',
    pathParams: { userId, sickNoteId },
  })
}
