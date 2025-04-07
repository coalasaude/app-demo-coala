import {
  SickNoteModel,
  SickNoteModelConstructor,
} from '@/v3/domain/@v2/health-history/sick-note/sick-note.model'

import apiRequest from '../../../api'

export type ReadSickNoteResponse = SickNoteModelConstructor

export interface ReadSickNoteParams {
  sickNoteId: number
  userId: number
}

export async function readSickNote({ userId, sickNoteId }: ReadSickNoteParams) {
  const data = (await apiRequest<ReadSickNoteResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/sick-note/:sickNoteId',
    pathParams: { userId, sickNoteId },
  })) as ReadSickNoteResponse

  return new SickNoteModel(data)
}
