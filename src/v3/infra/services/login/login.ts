import { TApiUserResponse } from '@/v3/domain/api/ApiUserResponse'

import apiRequest from '../api'

interface IInitLoginPayload {
  access: string
  sendToken?: boolean
}

interface IInitLoginResponse {
  activationStatus: ActivationStatusEnum
  userName: string
}

interface ILoginPayload {
  access: string
  password?: string
  token?: string
}

interface ILoginResponse {
  accessToken: string
  refreshToken: string
  activationStatus: ActivationStatusEnum
  user: TApiUserResponse
}

export enum ActivationStatusEnum {
  INSERT_EMAIL = 'INSERT_EMAIL',
  INSERT_PHONE = 'INSERT_PHONE',
  VALIDATE_EMAIL = 'VALIDATE_EMAIL',
  VALIDATE_PHONE = 'VALIDATE_PHONE',
  ACTIVE = 'ACTIVE',
  MISSING_PASSWORD = 'MISSING_PASSWORD',
  ACTIVATING = 'ACTIVATING',
}

export const initLogin = (body: IInitLoginPayload) =>
  apiRequest<IInitLoginResponse>({
    path: 'auth/login/init',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  }) as Promise<IInitLoginResponse>

export const login = (body: ILoginPayload) =>
  apiRequest<ILoginResponse>({
    path: 'auth/login',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  }) as Promise<ILoginResponse>
