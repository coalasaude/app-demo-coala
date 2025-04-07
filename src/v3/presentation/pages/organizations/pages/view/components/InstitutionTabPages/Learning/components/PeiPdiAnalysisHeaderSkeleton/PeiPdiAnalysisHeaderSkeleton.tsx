import { Skeleton } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'

const PeiPdiAnalysisHeaderSkeleton = () => {
  return (
    <GridWrapper alignItems='flex-end'>
      <GridItem xs={12} sm={12} md={4}>
        <Skeleton variant='rectangular' width='100%' height={80} />
      </GridItem>
      <GridItem xs={12} sm={3} md={2}>
        <Skeleton variant='rectangular' width='100%' height={80} />
      </GridItem>
      <GridItem xs={12} sm={3} md={2}>
        <Skeleton variant='rectangular' width='100%' height={80} />
      </GridItem>
      <GridItem xs={12} sm={3} md={2}>
        <Skeleton variant='rectangular' width='100%' height={80} />
      </GridItem>
      <GridItem xs={12} sm={3} md={2}>
        <Skeleton variant='rectangular' width='100%' height={80} />
      </GridItem>
    </GridWrapper>
  )
}

export default PeiPdiAnalysisHeaderSkeleton
