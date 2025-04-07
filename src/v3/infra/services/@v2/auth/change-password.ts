import apiRequest from '../../api'

export interface ChangePasswordParams {
  oldPassword?: string
  password: string
}

export const changePassword = (body: ChangePasswordParams) =>
  apiRequest<boolean>({
    path: 'v2/change-password',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  })
