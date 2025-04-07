import { Box, BoxProps } from '@mui/material'
import React from 'react'

export const CardContent = ({ children }: { children: React.ReactNode } & BoxProps) => {
  return (
    <Box
      display='block'
      whiteSpace='nowrap'
      alignItems='center'
      overflow='hidden'
      minHeight='0'
      flex={1}
      pr={2}
    >
      {children}
    </Box>
  )
}
