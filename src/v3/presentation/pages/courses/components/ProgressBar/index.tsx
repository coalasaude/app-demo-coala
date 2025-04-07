import * as React from 'react'
import { LinearProgressProps } from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { CProgressBar } from '@/v3/presentation/newComponents'

import { ProgressBarContainer } from './styles'

export default function ProgressBar(props: LinearProgressProps & { value: number }) {
  return (
    <ProgressBarContainer>
      <CProgressBar
        state='default'
        sx={{ borderRadius: 50 }}
        {...props}
        style={{ borderRadius: 50, minHeight: 6, minWidth: '100%' }}
      />
      <Box ml={1}>
        <Typography variant='body2' color='primary'>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </ProgressBarContainer>
  )
}
