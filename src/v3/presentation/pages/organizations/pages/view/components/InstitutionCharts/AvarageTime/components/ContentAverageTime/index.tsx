import React from 'react'
import { Box, Typography } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'

export const ContentAverageTime = ({ onHold, duration }: { onHold: number; duration: number }) => {
  return (
    <>
      <GridWrapper>
        <GridItem xs={12}>
          <Box
            display='flex'
            justifyContent='space-between'
            bgcolor='var(--mui-palette-background-default)'
            p={1}
            pr={4}
            mb={1}
            mt={3}
            style={{ borderRadius: '8px' }}
            sx={{ border: '1px solid var(--mui-palette-grey-100)' }}
          >
            <Typography variant='h6' color='var(--mui-palette-grey-600)'>
              Em espera
            </Typography>

            <Typography
              variant='h6'
              color='primary'
              textAlign='right'
              sx={{
                wordWrap: 'break-word',
              }}
            >
              {`${onHold} min`}
            </Typography>
          </Box>
        </GridItem>
      </GridWrapper>
      <GridWrapper>
        <GridItem xs={12}>
          <Box
            display='flex'
            justifyContent='space-between'
            bgcolor='var(--mui-palette-background-default)'
            p={1}
            pr={4}
            style={{ borderRadius: '8px' }}
            sx={{ border: '1px solid var(--mui-palette-grey-100)' }}
          >
            <Typography variant='h6' color='var(--mui-palette-grey-600)'>
              Duração do atendimento
            </Typography>
            <Typography
              variant='h6'
              textAlign='right'
              color='primary'
              sx={{
                wordWrap: 'break-word',
              }}
            >
              {`${duration} min`}
            </Typography>
          </Box>
        </GridItem>
      </GridWrapper>
    </>
  )
}

export default ContentAverageTime
