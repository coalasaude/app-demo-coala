import apiRequest from '../../api'

export interface CreatePasswordParams {
  password: string
}

export const createPassword = (body: CreatePasswordParams) =>
  apiRequest<void>({
    path: 'v2/first-password',
    throwError: true,
    method: 'POST',
    body: body,
  })
