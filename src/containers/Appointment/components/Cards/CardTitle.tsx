import { Box, BoxProps, Typography } from '@mui/material'
import React from 'react'

export const CardTitle = ({ children }: { children: React.ReactNode } & BoxProps) => {
  return (
    <Box mb={2}>
      <Typography
        component='span'
        color='primary'
        display='block'
        variant='h4'
        noWrap
        style={{ whiteSpace: 'pre-wrap', textDecoration: 'underline' }}
      >
        {children}
      </Typography>
    </Box>
  )
}
