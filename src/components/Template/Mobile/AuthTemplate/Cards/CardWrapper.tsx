import { Box, BoxProps } from '@mui/material'
import React from 'react'

export const CardWrapper = ({ children }: { children: React.ReactNode } & BoxProps) => {
  return (
    <Box display='flex' alignItems='center'>
      {children}
    </Box>
  )
}
