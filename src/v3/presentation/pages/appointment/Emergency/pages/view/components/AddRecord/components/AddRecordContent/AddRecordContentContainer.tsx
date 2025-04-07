import { Stack, Typography } from '@mui/material'

import { Records } from '@/types/records'
import useMediaQuery from '@/hooks/useMediaQuery'

interface RecordContentData {
  appointmentId?: number
  record?: Records
}

interface RecordContentProps {
  title: string

  data?: RecordContentData
  children: React.ReactNode | React.ReactNode[]
}

export const AddRecordContentContainer = ({ children, title }: RecordContentProps) => {
  const isMobile = useMediaQuery('sm')
  return (
    <Stack width='100%' p={isMobile ? 2 : 0} pt={isMobile ? 4 : 0}>
      <Typography variant='h4'>{title}</Typography>
      {children}
    </Stack>
  )
}
