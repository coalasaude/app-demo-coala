import { BoxProps, Typography } from '@mui/material'
import React from 'react'

export const CardTitle = ({ children }: { children: React.ReactNode } & BoxProps) => {
  return (
    <Typography component='span' display='block' variant='h4' noWrap>
      {children}
    </Typography>
  )
}
