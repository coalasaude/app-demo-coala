import apiRequest from '../../../api'

export interface LinkRolePayload {
  userId: number
  profileId: number
  institutionId?: number
  healthRegister?: string
  class?: string
  enrollment?: string
  companyPositionId?: number
  educationalStageId?: number
  schoolGradeId?: number
}

export async function linkRole({ userId, ...params }: LinkRolePayload) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/roles',
    body: params,
    pathParams: { userId },
  })
}
