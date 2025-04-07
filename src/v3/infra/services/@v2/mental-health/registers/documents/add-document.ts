import {
  DocumentModel,
  DocumentModelConstructor,
} from '@/v3/domain/@v2/mental-health/document/document.model'
import apiRequest from '@/v3/infra/services/api'

export const DocumentType = {
  EXTERNAL_RECORD: 'EXTERNAL_RECORD',
  INTERN_RECORD: 'INTERN_RECORD',
} as const

export interface AddDocumentParams {
  userId: number
  type: (typeof DocumentType)[keyof typeof DocumentType]
  file: File
}

export async function addMentalHealthRegisterDocument({ userId, ...params }: AddDocumentParams) {
  const formData = new FormData()

  formData.append('file', params.file)
  formData.append('type', params.type)

  const document = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/documents',
    body: formData,
    cType: 'multipart/form-data',
    pathParams: { userId },
  })) as DocumentModelConstructor

  return new DocumentModel(document)
}
