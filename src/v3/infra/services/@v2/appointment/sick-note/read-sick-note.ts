import {
  SickNoteModel,
  SickNoteModelConstructor,
} from '@/v3/domain/@v2/appointment/sick-note.model'

import apiRequest from '../../../api'

export type ReadSickNoteResponse = SickNoteModelConstructor

export interface ReadSickNoteParams {
  sickNoteId: number
  appointmentId: number
}

export async function readSickNote({ appointmentId, sickNoteId }: ReadSickNoteParams) {
  const data = (await apiRequest<ReadSickNoteResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId/sick-notes/:sickNoteId',
    pathParams: { appointmentId, sickNoteId },
  })) as ReadSickNoteResponse

  return new SickNoteModel(data)
}
