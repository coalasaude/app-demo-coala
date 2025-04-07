import React from 'react'
import Router from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const UnauthenticatedGuard = ({
  children,
  isProtectedRoute,
  isPublicRoute,
}: {
  children: React.ReactNode
  isProtectedRoute?: boolean
  isPublicRoute?: boolean
}) => {
  const { isLoaded, canAccessApp, auth } = useAuth()
  if (!isLoaded) return null

  if (canAccessApp && !isProtectedRoute && !isPublicRoute) {
    const redirectPage = Router.query?.page || auth.redirectPage

    if (redirectPage) {
      const [pathname, query] = decodeURIComponent(redirectPage as string).split('?')

      Router.push({ pathname, query })
      return null
    }

    Router.push(NEW_ROUTES.AUTHENTICATED.HELLO.path)
    return null
  }

  return <>{children}</>
}
