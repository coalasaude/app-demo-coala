import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { ActivationStatusEnum } from '@/v3/infra/services/login/login'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { NEW_ROUTES } from '@/constants/routes'

export interface IActivationState {
  access?: string
  validateStatus?: ActivationStatusEnum.VALIDATE_EMAIL | ActivationStatusEnum.VALIDATE_PHONE
  activationStatus?: ActivationStatusEnum
}

export const useActivation = () => {
  const { user, auth, isLoaded, setAuth, hasToAddCertificated } = useAuth()
  const router = useRouter()
  const [activation, setActivation] = useState<IActivationState>({})

  useEffect(() => {
    if (isLoaded && !auth?.activationStatus) {
      router.push(NEW_ROUTES.UNAUTHENTICATED.LOGIN.path)
    }
  }, [auth.activationStatus, isLoaded, router])

  const onSetPartialActivation = useCallback(
    (authData: IActivationState) => {
      const isActivating = authData.activationStatus === ActivationStatusEnum.ACTIVATING
      const isMissingPassword = authData.activationStatus === ActivationStatusEnum.MISSING_PASSWORD

      if (isActivating || isMissingPassword) {
        setAuth({ ...auth, activationStatus: authData.activationStatus })
      }

      setActivation((prev) => ({ ...prev, ...authData }))
    },
    [auth, setAuth]
  )

  const isInsertEmail = auth.activationStatus === ActivationStatusEnum.INSERT_EMAIL
  const isInsertPhone = auth.activationStatus === ActivationStatusEnum.INSERT_PHONE
  const isActivating = [activation.activationStatus, auth.activationStatus].includes(
    ActivationStatusEnum.ACTIVATING
  )
  const isValidateEmail = [activation.activationStatus, auth.activationStatus].includes(
    ActivationStatusEnum.VALIDATE_EMAIL
  )
  const isValidatePhone = [activation.activationStatus, auth.activationStatus].includes(
    ActivationStatusEnum.VALIDATE_PHONE
  )
  const isMissingPassword = [activation.activationStatus, auth.activationStatus].includes(
    ActivationStatusEnum.MISSING_PASSWORD
  )

  const accessType: 'email' | 'phone' = isInsertPhone || isValidatePhone ? 'phone' : 'email'
  const access = activation.access || (isValidateEmail ? user?.email : user?.telephone)!
  const showUserDataStep = !isMissingPassword && isActivating
  const showInsertStep = isInsertEmail || isInsertPhone
  const showValidationStep = isValidateEmail || isValidatePhone || showInsertStep
  const showCertificationStep = hasToAddCertificated

  const redirect = isLoaded && !auth?.activationStatus
  const isLoading = !isLoaded || redirect

  return {
    setActivation: onSetPartialActivation,
    resetActivation: (data?: IActivationState) => setActivation(data || {}),
    activation: {
      ...activation,
      access,
    },
    redirect,
    user,
    accessType,
    isLoading,
    config: {
      showInsertStep,
      showValidationStep,
      showUserDataStep,
      isMissingPassword,
      showCertificationStep,
    },
  }
}
