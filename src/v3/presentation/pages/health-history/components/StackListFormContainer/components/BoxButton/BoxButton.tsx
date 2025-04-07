
import { Typography } from '@mui/material'
import { ReactNode } from 'react'

import { spacing } from '@/utils/spacing'

import { StyledContainerItem } from './style'

export const BoxButton = ({text, subText, icon, onClick}: {
  text: ReactNode
  subText: ReactNode
  icon: ReactNode
  onClick?: () => void
}) => {

  return (
    <StyledContainerItem onClick={onClick}>
      {icon}
      <Typography ml={spacing(1)} variant='h5' >
        {text}
        <Typography ml={spacing(1)} variant='body2' component='span' >
          {subText}
        </Typography>
      </Typography>
    </StyledContainerItem>
  )
}
