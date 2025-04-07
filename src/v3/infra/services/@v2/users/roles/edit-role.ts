import apiRequest from '../../../api'

export interface EditRolePayload {
  roleId: number
  userId: number
  profileId: number
  healthRegister?: string
  class?: string
  enrollment?: string
  companyPositionId?: number
  educationalStageId?: number
  schoolGradeId?: number
}

export async function editRole({ roleId, userId, ...params }: EditRolePayload) {
  await apiRequest({
    method: 'PUT',
    throwError: true,
    path: 'v2/users/:userId/roles/:roleId',
    body: params,
    pathParams: { userId, roleId },
  })
}
