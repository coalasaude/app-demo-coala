import { ActivationStatusEnum } from '@/types/activationStatusEnum'

import apiRequest from '../../api'

interface ILoginPayload {
  access: string
  password?: string
  code?: string
}

interface ILoginResponse {
  accessToken: string
  refreshToken: string
  activationStatus: ActivationStatusEnum
}

export const login = (body: ILoginPayload) =>
  apiRequest<ILoginResponse>({
    path: 'v2/login',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  }) as Promise<ILoginResponse>
