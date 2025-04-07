import apiRequest from '../../api'

export interface ApproveOnboardingParams {
  onboardingId: number
}

export async function approveUserOnboarding({ onboardingId }: ApproveOnboardingParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/imports/users/:onboardingId/approve',
    pathParams: { onboardingId },
  })
}
