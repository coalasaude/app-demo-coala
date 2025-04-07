import { TDocument } from '../Document'

import { DefaultStatus } from './ApiCourseResponse'
import { TApiUserResponse } from './ApiUserResponse'

export interface THistorySickNote {
  id: number
  appointmentDate: Date
  validUntil: Date
  description: string | null
  status: DefaultStatus
  documentId: number
  createdAt: Date
  isSickNoteValid: boolean
  isExternal: boolean
  document?: TDocument
  user?: TApiUserResponse
}
