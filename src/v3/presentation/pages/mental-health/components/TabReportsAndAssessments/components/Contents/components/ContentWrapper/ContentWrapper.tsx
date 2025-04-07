import { Close } from '@mui/icons-material'
import { Box, Dialog } from '@mui/material'
import { ReactNode } from 'react'

import { useBreakpoint } from '@/hooks/useBreakpoints'
import { CButton } from '@/v3/presentation/newComponents'

import { StyledCloseContainer } from './ContentWrapper.styles'

interface ContentWrapperProps {
  children: ReactNode
  onClose: () => void
}

export const ContentWrapper = ({ children, onClose }: ContentWrapperProps) => {
  const isMobile = useBreakpoint('sm')

  if (isMobile) {
    return (
      <Dialog open={isMobile} onClose={onClose} fullScreen>
        <StyledCloseContainer>
          <CButton variant='link' onClick={onClose} sx={{ minWidth: 36 }}>
            <Close sx={{ color: 'var(--mui-palette-grey-600)' }} />
          </CButton>
        </StyledCloseContainer>

        <Box p={2} pt={4} height='100%' position='relative'>
          {children}
        </Box>
      </Dialog>
    )
  }

  return (
    <Box my={2} ml={4}>
      {children}
    </Box>
  )
}
