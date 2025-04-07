import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { BoxProps, Typography } from '@mui/material'
import React from 'react'

import { DeniesAllergiesContainer } from './styles'

interface Props extends BoxProps {
  text: string
}

export const DeniesAllergies = ({ text, ...props }: Props) => {
  return (
    <DeniesAllergiesContainer {...props}>
      <SentimentSatisfiedAltIcon sx={{ mr: 1 }} />
      <Typography textAlign='center'>{text}</Typography>
    </DeniesAllergiesContainer>
  )
}
