import { CreateFollowUpProps, TApiFollowUpResponse } from '@/v3/domain/api/ApiFollowUpResponse'

import apiRequest from '../../api'

export const createFollowUp = ({
  appointmentId,
  body,
}: CreateFollowUpProps): Promise<TApiFollowUpResponse> => {
  return apiRequest<TApiFollowUpResponse>({
    path: 'appointments/:id/follow-up',
    method: 'POST',
    pathParams: {
      id: appointmentId,
    },
    body,
    throwError: true,
  }) as Promise<TApiFollowUpResponse>
}
