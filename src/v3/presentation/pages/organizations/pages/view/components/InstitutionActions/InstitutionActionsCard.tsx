import React from 'react'
import { Typography } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'

export const InstitutionActionsCard: React.FC<{
  title: React.ReactNode
  value: any
  isPrimary?: boolean
}> = ({ title, value }) => {
  return (
    <Paper px={2} display='flex' flexDirection='column' gap={1} py={1}>
      <Typography variant='h3'>{value}</Typography>
      <Typography variant='h5'>{title}</Typography>
    </Paper>
  )
}

export default InstitutionActionsCard
