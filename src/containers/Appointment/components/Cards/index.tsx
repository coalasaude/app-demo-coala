import { Box, BoxProps } from '@mui/material'
import React from 'react'

import { StyledCard } from './styles'
import { CardContent } from './CardContent'
import { CardWrapper } from './CardWrapper'
import { CardTitle } from './CardTitle'

export const SmallDeviceAppointmentCard = ({
  children,
  color,
  ...props
}: { children: React.ReactNode } & BoxProps) => {
  return (
    <StyledCard {...props}>
      {color && (
        <Box
          display='flex'
          alignItems='center'
          sx={{
            ':after': {
              backgroundColor: `var(${color})`,
              width: '10px',
              height: '100%',
              content: '""',
              position: 'absolute',
              top: '10%',
              left: '0',
              transform: 'translateY(-50%)',
              borderTopLeftRadius: 14,
              borderBottomLeftRadius: 14,
            },
          }}
        />
      )}
      {children}
    </StyledCard>
  )
}

SmallDeviceAppointmentCard.Content = CardContent
SmallDeviceAppointmentCard.Wrapper = CardWrapper
SmallDeviceAppointmentCard.Title = CardTitle
