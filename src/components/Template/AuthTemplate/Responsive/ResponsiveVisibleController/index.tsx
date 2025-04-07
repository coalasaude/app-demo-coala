import React from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'

export const ResponsiveVisibleController = ({
  children,
  show,
}: {
  children: React.ReactNode
  show: boolean
}) => {
  const isSmallDevice = useMediaQuery('sm')

  if (isSmallDevice && !show) {
    return null
  }

  return <>{children}</>
}
