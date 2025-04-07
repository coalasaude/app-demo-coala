import { NovuProvider } from '@novu/react/hooks'
import React from 'react'

import { useAuth } from '../../hooks/useAuth'

import { NotificationListenerProvider } from './NotificationListenerProvider'

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth()

  return (
    <NovuProvider
      applicationIdentifier={String(process.env.NEXT_PUBLIC_NOVU_APLICATION_ID)}
      subscriberId={String(auth.user?.id)}
    >
      <NotificationListenerProvider>{children}</NotificationListenerProvider>
    </NovuProvider>
  )
}
