import React, { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Box, BoxProps } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'

export const HeaderButtonsPortal = ({
  children,
  boxProps,
  isFlexButtons,
}: {
  children: React.ReactNode
  boxProps?: BoxProps
  isFlexButtons?: boolean
}) => {
  const [portal, setPortal] = useState<HTMLElement>()
  const isSmallDevice = useMediaQuery('sm')
  useLayoutEffect(() => {
    const content = document.getElementById('navbar-actions')
    if (isFlexButtons) content?.style.setProperty('display', 'flex')
    else content?.style.setProperty('display', 'block')
    if (content) {
      setPortal(content)
    }
  }, [setPortal, portal, isFlexButtons])

  if (isSmallDevice && portal) {
    return createPortal(
      children ? (
        <Box mx={1} pt={1} {...boxProps} display='flex'>
          {children}
        </Box>
      ) : null,
      portal,
    )
  }

  if (isSmallDevice) {
    return null
  }
  return <>{children}</>
}

export default HeaderButtonsPortal
