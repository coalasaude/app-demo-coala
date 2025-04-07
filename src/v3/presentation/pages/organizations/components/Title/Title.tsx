import React from 'react'
import { Box } from '@mui/material'

import { CardTitle } from '@/v3/presentation/components/Cards/CardTitle'
import { spacing } from '@/v3/presentation/utils/spacing'
import { CDivider } from '@/v3/presentation/newComponents'

type TitleProps = {
  children: React.ReactNode
}

export const Title = ({ children }: TitleProps) => {
  return (
    <Box mb={spacing(2)}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CardTitle>{children}</CardTitle>
      </Box>

      <CDivider sx={{ mt: spacing(2) }} />
    </Box>
  )
}
