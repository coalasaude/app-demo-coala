import { useRouter } from 'next/router'
import React from 'react'

import { UserStatus } from '@/types/user'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { NEW_ROUTES } from '@/constants/routes'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { auth, isLoaded, canAccessApp } = useAuth()

  if (!isLoaded) return null
  if (auth.user?.status === UserStatus.TRIAL) {
    return <>{children}</>
  }

  if (!canAccessApp) {
    const pathname =
      auth.user?.status === UserStatus.ACTIVE
        ? NEW_ROUTES.UNAUTHENTICATED.ACTIVATION.path
        : NEW_ROUTES.UNAUTHENTICATED.LOGIN.path
    router.replace({
      pathname,
      query: {
        page: window.location.pathname + window.location.search,
      },
    })

    return null
  }

  return <>{children}</>
}
