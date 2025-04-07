import apiRequest from '../../../api'

export type EditUserPayload = {
  userId: number
  email?: string | null
  telephone?: string | null
  password: string
}

export async function verifyEditLoginUser(params: EditUserPayload) {
  const { userId, ...body } = params

  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/verify-edit-login-user/:userId',
    body,
    pathParams: { userId },
  })
}
