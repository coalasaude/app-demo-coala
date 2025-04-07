import { NotifyAccountActivationModelConstructor } from '@/v3/domain/@v2/communication/get-last-notify-activate.mode'

import apiRequest from '../../../api'

export type LastNotifyAccountActivateParams = {
  institutionId: number
}

export async function lastNotifyAccountActivate({
  institutionId,
}: LastNotifyAccountActivateParams) {
  const response = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: `v2/communications/onboarding/activate-accounts/${institutionId}`,
    queryParams: { institutionId },
  })) as NotifyAccountActivationModelConstructor

  return response
}
