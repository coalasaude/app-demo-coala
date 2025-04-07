import React from 'react'
import { Grid, Skeleton, SxProps, Theme } from '@mui/material'

export const SkeletonCardsChart = () => {
  const sx: SxProps<Theme> = {
    height: 160,
    variant: 'text',
    borderRadius: 3,
  }

  return (
    <Grid container>
      <Grid item xl={5} lg={5} md={5} xs={12} pr={[, , 3]}>
        <Skeleton sx={{ ...sx, ml: 2 }} />
      </Grid>
      <Grid item xl={3} lg={3} md={3} xs={12} pr={[, , 3]}>
        <Skeleton sx={{ ...sx }} />
      </Grid>
      <Grid item xl={4} lg={4} md={4} xs={12}>
        <Skeleton sx={{ ...sx, mr: 2 }} />
      </Grid>
    </Grid>
  )
}

export default SkeletonCardsChart
