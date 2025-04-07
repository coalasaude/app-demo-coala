import apiRequest from '../../api'

export interface RollbackOnboardingParams {
  onboardingId: number
}

export async function rollbackUserOnboarding({ onboardingId }: RollbackOnboardingParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/imports/users/:onboardingId/rollback',
    pathParams: { onboardingId },
  })
}
