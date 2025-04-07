import { Typography } from '@mui/material'

import { CTooltip } from '@/v3/presentation/newComponents'

interface Props {
  institution: string
}

export const AppointmentInstitution = ({ institution }: Props) => (
  <CTooltip description={institution}>
    <Typography
      sx={{ maxWidth: 220, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
      variant='body1'
    >
      {institution}
    </Typography>
  </CTooltip>
)
