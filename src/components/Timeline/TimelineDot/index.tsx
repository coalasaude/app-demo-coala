import { AssistantPhotoOutlined, Check } from '@mui/icons-material'
import { useMediaQuery } from '@mui/material'

import { TimelineDotContainer } from './styles'

export const TimelineDot = ({ isFinished }: { isFinished?: boolean }) => {
  const isSmallDevice = useMediaQuery('sm')

  return (
    <TimelineDotContainer isFinished={isFinished}>
      {isFinished ? (
        <AssistantPhotoOutlined
          sx={{ color: 'white', fontSize: isSmallDevice ? '16px' : '20px' }}
        />
      ) : (
        <Check sx={{ color: 'white', fontSize: isSmallDevice ? '16px' : '20px' }} />
      )}
    </TimelineDotContainer>
  )
}
