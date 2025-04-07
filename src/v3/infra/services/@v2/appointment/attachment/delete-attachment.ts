import apiRequest from '../../../api'

export interface DeleteUserAttachmentParams {
  attachmentId: number
  appointmentId: number
}

export async function deleteAttachment({
  appointmentId,
  attachmentId,
}: DeleteUserAttachmentParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/appointments/:appointmentId/attachments/:attachmentId',
    pathParams: { appointmentId, attachmentId },
  })
}
