import {
  AttachmentDocumentModel,
  AttachmentDocumentModelConstructor,
} from '@/v3/domain/@v2/appointment/attachment-document.model'

import apiRequest from '../../../api'

export interface AddAttachmentDocumentParams {
  appointmentId: number
  file: File
}

export async function addAttachmentDocument({ appointmentId, file }: AddAttachmentDocumentParams) {
  const formData = new FormData()

  formData.append('file', file)

  const document = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/attachments/document',
    body: formData,
    cType: 'multipart/form-data',
    pathParams: { appointmentId },
  })) as AttachmentDocumentModelConstructor

  return new AttachmentDocumentModel(document)
}
