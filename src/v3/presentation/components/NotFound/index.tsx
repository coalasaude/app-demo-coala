import { InfoOutlined } from '@mui/icons-material'
import { BoxProps, Typography } from '@mui/material'
import React from 'react'

import { NotFoundContainer } from './styles'

interface Props extends BoxProps {
  text?: string
}

export const NotFound = ({ text, ...props }: Props) => {
  return (
    <NotFoundContainer {...props}>
      <InfoOutlined sx={{ mr: 1 }} />
      <Typography textAlign='center'>{text || 'Nenhum registro encontrado.'}</Typography>
    </NotFoundContainer>
  )
}
