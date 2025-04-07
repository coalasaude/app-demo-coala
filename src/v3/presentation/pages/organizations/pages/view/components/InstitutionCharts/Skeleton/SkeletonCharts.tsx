import React from 'react'
import { Skeleton } from '@mui/material'

import ChartsCard from '@/components/Template/AuthTemplate/Charts/ChartsCard'

import { StyledChartsCard } from '../../styles'

export const SkeletonCharts = ({ title }: { title: string }) => {
  const sx = {
    height: 80,
    variant: 'text',
    width: '100%',
  }

  return (
    <StyledChartsCard>
      <ChartsCard title={title}>
        <Skeleton sx={{ ...sx }} />
        <Skeleton sx={{ ...sx }} />
        <Skeleton sx={{ ...sx }} />
        <Skeleton sx={{ ...sx }} />
      </ChartsCard>
    </StyledChartsCard>
  )
}

export default SkeletonCharts
