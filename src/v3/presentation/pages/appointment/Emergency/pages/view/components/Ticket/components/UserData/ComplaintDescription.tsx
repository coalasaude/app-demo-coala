import { Box } from '@mui/material'

import { ComplaintDescription as ComplainDescriptionEnum } from '@/constants/complaint'
import { CDisplayRecord } from '@/v3/presentation/newComponents'

export const ComplaintDescription = ({
  complaint,
  resume,
}: {
  complaint: string
  resume: string
}) => {
  return (
    <Box>
      <CDisplayRecord
        label={(ComplainDescriptionEnum as any)[complaint] || '-'}
        value={resume || '-'}
        withDivider={false}
      />
    </Box>
  )
}
