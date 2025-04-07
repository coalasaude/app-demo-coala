import { HealthAndSafetyOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'

import { target } from '../../atoms/CJoyride/constants'

interface CNavbarItemAddAppointmentProps {
  isActive: boolean
}

export const CNavbarItemAddAppointment: React.FC<CNavbarItemAddAppointmentProps> = ({
  isActive,
}) => (
  <Box
    id={target.coala}
    mx={1}
    style={{ borderRadius: '50%' }}
    minHeight='50px'
    minWidth='50px'
    display='flex'
    alignItems='center'
    justifyContent='center'
    sx={(theme) => ({
      backgroundColor: isActive ? theme.palette.secondary.dark : theme.palette.secondary.main,
    })}

  >
    <HealthAndSafetyOutlined sx={(theme) => ({ color: theme.palette.common.white })} />
  </Box>
)
