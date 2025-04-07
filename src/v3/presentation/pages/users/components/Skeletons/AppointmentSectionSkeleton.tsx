import { Stack } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'

import { GridItem, GridWrapper } from '@/components/Grid'

export interface AppointmentSectionSkeletonProps {
  repeat?: number
}
const AppointmentSectionSkeleton: React.FC<AppointmentSectionSkeletonProps> = ({ repeat = 1 }) => {
  const skeletons = Array.from({ length: repeat }, (_, i) => (
    <GridItem key={i} xs={6}>
      <Skeleton variant='rectangular' height={150} width='100%' />
    </GridItem>
  ))

  return (
    <>
      <Stack direction='row' spacing={2} justifyContent='space-between' sx={{ m: 2 }}>
        <Skeleton variant='text' sx={{ fontSize: 36, width: 100 }} />
      </Stack>
      <Skeleton variant='rectangular' height={50} width='100%' />{' '}
      <GridWrapper>{skeletons}</GridWrapper>
    </>
  )
}

export default AppointmentSectionSkeleton
