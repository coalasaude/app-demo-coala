import { useContext, useMemo } from 'react'

import { AuthContext } from '@/context/AuthProvider'

export const useAuth = () => {
  const context = useContext(AuthContext)

  const fullName = useMemo(() => {
    if (context.auth.user?.name && context.auth.user?.lastName) {
      return `${context.auth.user?.name} ${context.auth.user?.lastName}`
    } else if (context.auth.user?.name) {
      return context.auth.user.name
    }
    return ''
  }, [context.auth.user])

  const selectedUserId = context.auth?.selectedChildren || context.auth.user?.id

  const isAdmin = useMemo(() => context.auth.user?.isAdmin, [context])

  const hasVerifyAccess = context.auth.user?.validTelephone && context.auth.user?.validEmail
  const hasEmailAndPhoneAccess = context.auth?.user?.telephone && context.auth.user?.email

  const hasToAddCertificated =
    context.auth.user?.isPendingCertificatePassword || context.auth.user?.isPendingCertificateUpload

  const isTemporaryUser = context.auth.token?.attendanceOnly || context.auth.token?.surveyOnly

  const isActivated =
    context.auth?.user?.hasPassword &&
    !hasToAddCertificated &&
    hasVerifyAccess &&
    hasEmailAndPhoneAccess

  const canAccessApp = context.auth?.accessToken && (isActivated || isTemporaryUser)

  return {
    ...context,
    isAdmin,
    fullName,
    name: context.auth.user?.name,
    selectedUserId,
    user: context.auth.user,
    canAccessApp,
    hasToAddCertificated,
  }
}
