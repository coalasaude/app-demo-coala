import { AssistantPhotoOutlined, Check } from '@mui/icons-material'
import { useMediaQuery } from '@mui/material'

import { StyledTimelineDotContainer } from './styles'

export const CTimelineDot = ({ isFinished }: { isFinished?: boolean }) => {
  const isSmallDevice = useMediaQuery('sm')

  return (
    <StyledTimelineDotContainer isFinished={isFinished}>
      {isFinished ? (
        <AssistantPhotoOutlined
          sx={{ color: 'white', fontSize: isSmallDevice ? '16px' : '20px' }}
        />
      ) : (
        <Check sx={{ color: 'white', fontSize: isSmallDevice ? '16px' : '20px' }} />
      )}
    </StyledTimelineDotContainer>
  )
}
