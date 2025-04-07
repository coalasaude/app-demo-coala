import { Box, Typography } from '@mui/material'

import Pill from '/public/assets/svg/AppointmentsView/Pill.svg'

export const AppointmentPill = ({ title, color }: { title: string; color?: string }) => {
  return (
    <Box display='flex' alignItems='center'>
      <Typography variant='body2'>{title}</Typography>
      <Box ml={1} />
      <Pill style={{ color: `var(${color})` }} />
    </Box>
  )
}
