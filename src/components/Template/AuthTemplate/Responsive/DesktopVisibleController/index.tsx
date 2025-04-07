import React from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const DesktopVisibleController = ({
  children,
  show,
}: {
  children: React.ReactNode
  show: boolean
}) => {
  const { isLoaded } = useAuth()
  const isDesktopDevice = useMediaQuery('sm', 'up')

  if (!isLoaded) {
    return null
  }

  if (isDesktopDevice && !show) {
    return null
  }

  return <>{children}</>
}
