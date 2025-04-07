import apiRequest from '../api'

interface ISendTokenPayload {
  access: string
}

interface IVerifyTokenPayload {
  token: string
}

interface IActivateUserPayload {
  name: string
  lastname: string
  cpf: string
  isSigned: boolean
}

interface ICreatePasswordPayload {
  password: string
}

interface IChangePasswordPayload {
  password: string
  oldPassword?: string
}

export const sendToken = (body: ISendTokenPayload) =>
  apiRequest<void>({
    path: 'me/send-token',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  })

export const verifyToken = (body: IVerifyTokenPayload) =>
  apiRequest<void>({
    path: 'me/verify-token',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  })

export const activateUser = (body: IActivateUserPayload) =>
  apiRequest<void>({
    path: 'me/activate-user',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  })

export const createPassword = (body: ICreatePasswordPayload) =>
  apiRequest<void>({
    path: 'auth/first-password',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  })

export const changePassword = (body: IChangePasswordPayload) =>
  apiRequest<void>({
    path: 'auth/password',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  })
