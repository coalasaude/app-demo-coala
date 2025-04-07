import { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'

export const MobileContent = ({
  children,
  useWhiteBackground,
  ...props
}: {
  children: React.ReactNode
  useWhiteBackground?: boolean
} & BoxProps) => {
  useEffect(() => {
    const className = 'white-bg'
    if (useWhiteBackground) {
      const container = document.getElementById('container')
      if (container) {
        if (!container.classList.contains(className)) {
          container.classList.add(className)
        }
      }
    }
    return () => {
      if (useWhiteBackground) {
        const container = document.getElementById('container')
        if (container) {
          if (container.classList.contains(className)) {
            container.classList.remove(className)
          }
        }
      }
    }
  })

  return (
    <Box {...props} p={1} height='inherit'>
      {children}
    </Box>
  )
}
