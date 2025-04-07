import {
  DocumentModel,
  DocumentModelConstructor,
} from '@/v3/domain/@v2/mental-health/document/document.model'

import apiRequest from '../../../api'

export interface AddDocumentParams {
  userId: number
  file: File
}

export async function addMentalHealthDocument({ userId, ...params }: AddDocumentParams) {
  const formData = new FormData()

  formData.append('file', params.file)

  const document = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/documents',
    body: formData,
    cType: 'multipart/form-data',
    pathParams: { userId },
  })) as DocumentModelConstructor

  return new DocumentModel(document)
}
