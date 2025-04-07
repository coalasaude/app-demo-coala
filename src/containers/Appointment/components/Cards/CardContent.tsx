import { Box, BoxProps } from '@mui/material'
import React from 'react'

export const CardContent = ({ children }: { children: React.ReactNode } & BoxProps) => {
  return (
    <Box display='block' whiteSpace='nowrap' alignItems='center' overflow='hidden' flex={1}>
      {children}
    </Box>
  )
}
