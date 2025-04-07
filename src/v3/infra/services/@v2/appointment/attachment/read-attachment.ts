import {
  AttachmentModel,
  AttachmentModelConstructor,
} from '@/v3/domain/@v2/appointment/attachment.model'

import apiRequest from '../../../api'

export type ReadAttachmentResponse = AttachmentModelConstructor

export interface ReadAttachmentParams {
  attachmentId: number
  appointmentId: number
}

export async function readAttachment({ appointmentId, attachmentId }: ReadAttachmentParams) {
  const data = (await apiRequest<ReadAttachmentResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/:appointmentId/attachments/:attachmentId',
    pathParams: { appointmentId, attachmentId },
  })) as ReadAttachmentResponse

  return new AttachmentModel(data)
}
