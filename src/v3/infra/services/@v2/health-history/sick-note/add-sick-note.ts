import apiRequest from '../../../api'

export interface AddHistorySickNoteParams {
  file: File
  validUntil: Date
  appointmentDate: Date
  description?: string
  userId: number
}

export async function addHistorySickNote({ userId, ...params }: AddHistorySickNoteParams) {
  const formData = new FormData()

  formData.append('validUntil', String(params.validUntil.toISOString()))
  formData.append('appointmentDate', params.appointmentDate.toISOString())
  if (params.description) formData.append('description', String(params.description))
  formData.append('file', params.file)

  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/sick-note',
    body: formData,
    cType: 'multipart/form-data',
    pathParams: { userId },
  })
}
