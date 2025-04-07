import { THistorySickNote } from '@/v3/domain/api/ApiHistorySickNote'

import apiRequest from './api'

export interface CreateHistorySickNotePayload {
  file: File
  validUntil: number
  appointmentDate: Date
  description?: string
  userId: number
}

export const listHistorySickNote = (userId?: number) =>
  apiRequest<{ count: number; results: THistorySickNote[] }>({
    method: 'GET',
    path: `user/:userId/health-history/sicknote`,
    pathParams: { userId },
  })

export const getHistorySickNote = (userId?: number, id?: number) =>
  apiRequest<{ count: number; results: THistorySickNote[] }>({
    method: 'GET',
    path: `user/:userId/health-history/sicknote/:id`,
    pathParams: { userId, id },
  })

export const deleteHistorySickNote = ({ userId, id }: { userId?: number; id?: number }) =>
  apiRequest<boolean>({
    method: 'DELETE',
    path: `user/:userId/health-history/sicknote/:id`,
    pathParams: { userId, id },
  })

export const createHistorySickNote = (payload: CreateHistorySickNotePayload) => {
  const formData = new FormData()
  formData.append('file', payload.file)
  formData.append('validUntil', String(payload.validUntil))
  formData.append('appointmentDate', String(payload.appointmentDate))

  if (payload.description) {
    formData.append('description', payload.description)
  }

  return apiRequest<THistorySickNote>({
    method: 'POST',
    path: `user/:userId/health-history/sicknote`,
    pathParams: { userId: payload.userId },
    body: formData,
    cType: 'multipart/form-data',
  })
}
