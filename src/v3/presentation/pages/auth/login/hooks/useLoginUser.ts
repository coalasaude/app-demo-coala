import { useCallback, useState } from 'react'

import { ActivationStatusEnum } from '@/v3/infra/services/login/login'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { isValidPhone } from '@/validators/phone'
import { onlyNumbers } from '@/v3/utils/onlyNumbers'

export interface IAuthLoginState {
  access?: string
  userName?: string
  activationStatus?: ActivationStatusEnum
  isChangePassword?: boolean
}

export const useLoginUser = () => {
  const { user } = useAuth()
  const [authentication, setAuthentication] = useState<IAuthLoginState>({})

  const onSetPartialAuthentication = useCallback((authData: IAuthLoginState) => {
    setAuthentication((prev) => ({ ...prev, ...authData }))
  }, [])

  const isPasswordLogin = authentication.activationStatus === ActivationStatusEnum.ACTIVE
  const accessType: 'phone' | 'email' = isValidPhone(onlyNumbers(authentication.access || ''))
    ? 'phone'
    : 'email'
  const isChangePassword = authentication.isChangePassword

  return {
    setAuthentication: onSetPartialAuthentication,
    resetAuthentication: (data?: IAuthLoginState) => setAuthentication(data || {}),
    authentication,
    user,
    isPasswordLogin,
    accessType,
    isChangePassword,
  }
}
