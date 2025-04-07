import { Typography } from '@mui/material'

import { CTooltip } from '@/v3/presentation/newComponents'

interface AppointmentResumeProps {
  resume: string
}

export const AppointmentResume = ({ resume }: AppointmentResumeProps) => (
  <CTooltip description={resume}>
    <Typography
      variant='body1'
      sx={{
        maxWidth: 220,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      {resume}
    </Typography>
  </CTooltip>
)
