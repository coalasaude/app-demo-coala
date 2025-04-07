import { Box, Typography } from '@mui/material'
import React from 'react'

import InformationIcon from '/public/assets/svg/InformationIcon.svg'

interface Props {
  text?: string
}

export const NotFound = ({ text }: Props) => {
  return (
    <Box
      p={1}
      border='solid 2px var(--color-neutral-low-light)'
      style={{ borderRadius: '16px' }}
      mt={2}
      display='flex'
      alignItems='center'
      justifyContent='center'
      gap={1}
    >
      <InformationIcon />
      <Typography variant='h6' color='var(--mui-palette-grey-500)'>
        {text || 'Nenhum registro encontrado.'}
      </Typography>
    </Box>
  )
}
