import { Box, Typography } from '@mui/material'
import { SmartToyOutlined } from '@mui/icons-material'

import Pill from '/public/assets/svg/AppointmentsView/Pill.svg'

export const AppointmentTablePill = ({
  title,
  color,
  isClassificationByAi,
}: {
  title: string
  color?: string
  isClassificationByAi?: boolean
}) => {
  return (
    <Box display='flex' alignItems='center'>
      {isClassificationByAi ? (
        <SmartToyOutlined sx={{ color: `var(${color})` }} />
      ) : (
        <Pill style={{ color: `var(${color})` }} />
      )}
      <Box ml={1} />
      <Typography variant='body1'>{title}</Typography>
    </Box>
  )
}
