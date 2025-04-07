import { Circle } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

import { CTooltip } from '@/v3/presentation/newComponents'

type Props = {
  title?: string
  circleColor?: string
  bgColor?: string
}

export const AppointmentStatusChip = ({ title, circleColor, bgColor }: Props) => {
  return (
    <CTooltip description={title}>
      <Box display='flex' alignItems='center' mx={-1} sx={{ maxWidth: 220 }}>
        <Box
          display='flex'
          alignItems='center'
          borderRadius={4}
          p='4px 12px'
          bgcolor={`var(${bgColor})`}
          sx={{
            maxWidth: 220,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <Circle
            sx={{
              color: `var(${circleColor})`,
              fontSize: '0.75rem',
              marginRight: 1,
            }}
          />
          <Typography
            variant='body1'
            sx={{
              maxWidth: 320,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </CTooltip>
  )
}
