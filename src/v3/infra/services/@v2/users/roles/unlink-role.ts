import apiRequest from '../../../api'

export interface UnlinkRoleParams {
  roleId: number
  userId: number
}

export async function unlinkRole({ userId, roleId }: UnlinkRoleParams) {
  await apiRequest({
    method: 'DELETE',
    throwError: true,
    path: 'v2/users/:userId/roles/:roleId',
    pathParams: { userId, roleId },
  })
}
