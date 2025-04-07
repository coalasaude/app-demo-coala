import {
  SickNoteBrowseModel,
  SickNoteBrowseModelConstructor,
} from '@/v3/domain/@v2/health-history/sick-note/sick-note-browse.model'

import apiRequest from '../../../api'

type BrowseSickNoteResponse = SickNoteBrowseModelConstructor

export interface BrowseSickNoteParams {
  userId: number
}

export async function browseSickNote({ userId }: BrowseSickNoteParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/health-history/sick-note',
    pathParams: { userId },
  })) as BrowseSickNoteResponse

  return new SickNoteBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
