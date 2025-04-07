import React from 'react'
import { Typography } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'

import DownloadBar from '../DownloadBar'

export const ContentPercentageFill = ({ percent }: { percent: number }) => {
  return (
    <GridWrapper>
      <GridItem xs={11}>
        <Typography variant='h5'>Fichas preenchidas</Typography>
      </GridItem>
      <GridItem xs={12}>
        <DownloadBar value={percent} />
      </GridItem>
      <GridItem xs={11}>
        <Typography variant='h6'>{`${percent?.toFixed(2)}%`}</Typography>
      </GridItem>
      <GridItem xs={1}>
        <Typography variant='h6'>100%</Typography>
      </GridItem>
    </GridWrapper>
  )
}

export default ContentPercentageFill
