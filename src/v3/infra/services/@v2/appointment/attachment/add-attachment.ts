import apiRequest from '../../../api'

export interface AddAttachmentParams {
  appointmentId: number
  title: string
  documentId: number
}

export async function addAttachment({ appointmentId, ...params }: AddAttachmentParams) {
  const medicalRecord = (await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/appointments/:appointmentId/attachments',
    body: params,
    pathParams: { appointmentId },
  })) as { id: number }

  return medicalRecord
}
