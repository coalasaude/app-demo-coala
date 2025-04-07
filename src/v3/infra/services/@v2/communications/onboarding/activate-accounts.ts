import { NotifyGroupEnum } from '@/v3/domain/@v2/communication/get-last-notify-activate.mode'

import apiRequest from '../../../api'

export type NotifyAccountActivationRequestParams = {
  institutionId: number
  group: NotifyGroupEnum
}

export async function notifyAccountActivationRequest(params: NotifyAccountActivationRequestParams) {
  const { institutionId, group } = params

  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/communications/onboarding/activate-accounts/institution',
    body: { institutionId, group },
  })
}
