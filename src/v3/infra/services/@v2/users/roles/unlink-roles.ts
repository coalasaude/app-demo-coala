import apiRequest from '../../../api'

export interface UnlinkRolesParams {
  institutionId: number
  userIds: number[]
}

export async function unlinkRoles({ institutionId, userIds }: UnlinkRolesParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/roles',
    body: { institutionId, userIds },
  })
}
