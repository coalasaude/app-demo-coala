import React, { useState } from 'react'

import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { useSyncUserState } from './hooks/useSyncUserState'

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRequestFinished, setIsRequestFinished] = useState(false)
  const { auth } = useAuth()
  const permissionsList = auth.permissions
  const isLoaded = useSyncUserState(setIsRequestFinished, isRequestFinished, permissionsList)

  if (!isLoaded || (auth.accessToken && !auth.user?.id && !isRequestFinished)) {
    return null
  }

  return <>{children}</>
}
