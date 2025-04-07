import React from 'react'
import { Box, Typography } from '@mui/material'

import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants'

import { BaseUnitPanel } from '../../BaseUnitPanel/BaseUnitPanel'

type Props = {
  title: string
  text: string
  subText?: string
  textTitle?: string
  icon: React.ReactNode
}

export const BaseMessageInfoUnit = ({ text, title, textTitle, icon, subText }: Props) => {
  return (
    <BaseUnitPanel isMessagePanel id={target.coalaSchoolHealth}>
      <Box mr={[1, , , 2]} pr={[-2, -3, , ,]} display='flex' alignItems='center'>
        {icon}
      </Box>
      <Box display='flex' flexDirection='column'>
        <Typography variant='h4' color='var(--mui-palette-primary-main)' mb={1}>
          {title}
        </Typography>
        <Typography variant='h5' color='var(--mui-palette-primary-main)' fontWeight={400}>
          {textTitle && <span style={{ fontWeight: 600 }}>{`${textTitle} `}</span>}
          {text}
          <Typography variant='h5' color='var(--mui-palette-primary-main)' fontWeight={400}>
            {subText}
          </Typography>
        </Typography>
      </Box>
    </BaseUnitPanel>
  )
}

export default BaseMessageInfoUnit
