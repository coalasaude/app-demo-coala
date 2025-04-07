import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'

import { AppointmentStatus } from '@/types/appointment'

const size = 30
const iconStyle = {
  width: `${size}px`,
  height: `${size}px`,
}

export const IconMapping = {
  [AppointmentStatus.WAITING_ATTENDANCE]: <HealthAndSafetyIcon style={iconStyle} />,
  [AppointmentStatus.IN_ATTENDANCE]: <AccessTimeOutlinedIcon style={iconStyle} />,
  [AppointmentStatus.FINISHED]: <OutlinedFlagOutlinedIcon style={iconStyle} />,
  [AppointmentStatus.FOLLOW_UP]: undefined,
  [AppointmentStatus.WAITING_NURSE]: undefined,
  [AppointmentStatus.WAITING_DOCTOR]: undefined,
}
