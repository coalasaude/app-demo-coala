import apiRequest from '../../../api'

export type EditUserPayload = {
  userId: number
  email?: string | null
  telephone?: string | null
  code: string
  password: string
}

export async function editLoginUser(params: EditUserPayload) {
  const { userId, ...body } = params
  await apiRequest({
    method: 'PATCH',
    throwError: true,
    path: 'v2/users/:userId/edit/login',
    body,
    pathParams: { userId },
  })
}
