import { ActivationStatusEnum } from '@/types/activationStatusEnum'

import apiRequest from '../../api'

interface IInitLoginPayload {
  access: string
  isLoginWithCode?: boolean
}

interface IInitLoginResponse {
  activationStatus: ActivationStatusEnum
  userName: string
}

export const initLogin = (body: IInitLoginPayload) =>
  apiRequest<IInitLoginResponse>({
    path: 'v2/init-login',
    throwError: true,
    method: 'POST',
    useApiFilters: false,
    body: body,
  }) as Promise<IInitLoginResponse>
