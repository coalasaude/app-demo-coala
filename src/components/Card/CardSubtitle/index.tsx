import { Typography } from '@mui/material'
import React from 'react'

export const CardSubtitle = ({ subtitle }: { subtitle: string }) => {
  return <Typography variant='h5'>{subtitle}</Typography>
}
