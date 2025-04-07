import { Close } from '@mui/icons-material'
import { Dialog } from '@mui/material'
import { ReactNode } from 'react'

import { useBreakpoint } from '@/hooks/useBreakpoints'
import { CButton } from '@/v3/presentation/newComponents'

import RecordsOverlayScreen from '../../RecordsOverlayScreen/RecordsOverlayScreen'
import { StyledCloseContainer } from '../styles'

interface RecordContentWrapperProps {
  title: string
  viewOverlay?: boolean
  children: ReactNode
  onClose: () => void
}

export const RecordContentWrapper = ({
  children,
  onClose,
  title,
  viewOverlay,
}: RecordContentWrapperProps) => {
  const isMobile = useBreakpoint('sm')

  if (isMobile) {
    return (
      <Dialog open={isMobile} onClose={onClose} fullScreen>
        <StyledCloseContainer>
          <CButton variant='link' onClick={onClose}>
            <Close sx={{ color: 'var(--mui-palette-grey-600)' }} />
          </CButton>
        </StyledCloseContainer>

        {children}
      </Dialog>
    )
  }

  if (!!viewOverlay) {
    return (
      <RecordsOverlayScreen title={title} onClose={onClose}>
        {children}
      </RecordsOverlayScreen>
    )
  }

  return children
}
