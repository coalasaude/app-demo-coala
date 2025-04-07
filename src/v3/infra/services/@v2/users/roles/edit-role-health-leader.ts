import apiRequest from '../../../api'

export interface EditRoleHealthLeaderPayload {
  roleId: number
  userId: number
  isHealthLeader: boolean
}

export async function editRoleHealthLeaderRole({
  roleId,
  userId,
  ...params
}: EditRoleHealthLeaderPayload) {
  await apiRequest({
    method: 'PUT',
    throwError: true,
    path: 'v2/users/:userId/roles/:roleId/health-leader',
    body: params,
    pathParams: { userId, roleId },
  })
}
