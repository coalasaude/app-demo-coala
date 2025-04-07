import { Dialog } from '@mui/material'
import { Close } from '@mui/icons-material'

import { useBreakpoint } from '@/hooks/useBreakpoints'
import { CButton } from '@/v3/presentation/newComponents'

import { StyledCloseContainer } from '../../../Records/Components/RecordContent/styles'

import { AddRecordContentContainer } from './AddRecordContentContainer'

interface RecordContentProps {
  title: string
  registerType: string

  children: React.ReactNode | React.ReactNode[]

  onDeselect?: () => void
}

export const AddRecordContent = (props: RecordContentProps) => {
  const isMobile = useBreakpoint('sm')

  if (isMobile) {
    return (
      <Dialog open={isMobile} onClose={props.onDeselect} fullScreen>
        <StyledCloseContainer>
          <CButton variant='link' onClick={props.onDeselect}>
            <Close sx={{ color: 'var(--mui-palette-grey-600)' }} />
          </CButton>
        </StyledCloseContainer>

        <AddRecordContentContainer {...props} title={props.title} />
      </Dialog>
    )
  }

  return <AddRecordContentContainer {...props} title={props.title} />
}
