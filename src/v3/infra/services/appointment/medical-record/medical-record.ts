import {
  CreateMedicalRecordProps,
  TApiMedicalRecordResponse,
} from '@/v3/domain/api/ApiMedicalRecord'

import apiRequest from '../../api'

export const createMedicalRecord = ({
  appointmentId,
  body,
}: CreateMedicalRecordProps): Promise<TApiMedicalRecordResponse> => {
  return apiRequest<TApiMedicalRecordResponse>({
    path: 'appointments/:id/medical-records',
    method: 'POST',
    pathParams: {
      id: appointmentId,
    },
    body,
    throwError: true,
  }) as Promise<TApiMedicalRecordResponse>
}
