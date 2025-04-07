import { DocumentTypeEnum } from '@/types/documentType'
import {
  DocumentModel,
  DocumentModelConstructor,
} from '@/v3/domain/@v2/health-history/document/document.model'

import apiRequest from '../../../api'

export interface AddDocumentParams {
  userId: number
  type: DocumentTypeEnum
  file: File
}

export async function addHealthHistoryDocument({ userId, ...params }: AddDocumentParams) {
  const formData = new FormData()

  formData.append('type', String(params.type))
  formData.append('file', params.file)

  const document = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/health-history/documents',
    body: formData,
    cType: 'multipart/form-data',
    pathParams: { userId },
  })) as DocumentModelConstructor

  return new DocumentModel(document)
}
