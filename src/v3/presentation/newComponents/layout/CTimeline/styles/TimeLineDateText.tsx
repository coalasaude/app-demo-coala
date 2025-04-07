import { Typography } from '@mui/material'

export const CTimelineDateText = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Typography variant='caption' width='max-content'>
      {children}
    </Typography>
  )
}
