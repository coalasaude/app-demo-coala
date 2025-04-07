import { Box, BoxProps } from '@mui/material'
import React from 'react'

export * from '../CardTitleWrapper'
export * from '../CardSubtitle'

export const CardWrapper = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      style={{ borderRadius: '12px' }}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        padding: 2,
      })}
      {...props}
    >
      {children}
    </Box>
  )
}
