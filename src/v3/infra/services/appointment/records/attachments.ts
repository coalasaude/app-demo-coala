import { objectToFormData } from '@/utils/objectToFormData'

import apiRequest from '../../api'

type AddAttachmentParams = {
  appointmentId: number
  data: {
    title: string
    file: File | null
  }
}

export function addAttachment({ appointmentId, data }: AddAttachmentParams) {
  const formData = objectToFormData(data)
  formData.append('appointment_id', appointmentId.toString())

  return apiRequest({
    path: 'appointments/:appointmentId/attachments',
    method: 'POST',
    pathParams: { appointmentId },
    body: formData,
    cType: 'multipart/form-data',
  })
}
