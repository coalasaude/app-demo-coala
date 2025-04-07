import React, { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Box } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'

export const FilterContentButtonPortal = ({ children }: { children: React.ReactNode }) => {
  const [portal, setPortal] = useState<HTMLElement>()
  const isSmallDevice = useMediaQuery('sm')

  useLayoutEffect(() => {
    const content = document.getElementById('filter-content')
    if (content) {
      setPortal(content)
    }
  }, [setPortal, portal])

  if (isSmallDevice && portal) {
    return createPortal(
      children ? (
        <Box ml={2} width='100%'>
          {children}
        </Box>
      ) : null,
      portal
    )
  }

  if (isSmallDevice) {
    return null
  }
  return <>{children}</>
}

export default FilterContentButtonPortal
