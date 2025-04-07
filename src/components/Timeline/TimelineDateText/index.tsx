import { Typography } from '@mui/material'

export const TimelineDateText = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Typography variant='caption' width='max-content'>
      {children}
    </Typography>
  )
}
