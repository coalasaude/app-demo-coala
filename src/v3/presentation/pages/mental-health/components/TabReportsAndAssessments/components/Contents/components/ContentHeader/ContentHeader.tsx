import { Box } from '@mui/material'

import { CButton } from '@/v3/presentation/newComponents'

interface ContentHeaderProps {
  primaryButtonLabel?: string
  secondaryButtonLabel?: string
  primaryButtonClick: () => void
  secondaryButtonClick: () => void
  primaryButtonIcon: React.ReactNode
  secondaryButtonIcon: React.ReactNode
}

export const ContentHeader = ({
  primaryButtonLabel,
  secondaryButtonLabel,
  primaryButtonClick,
  secondaryButtonClick,
  primaryButtonIcon,
  secondaryButtonIcon,
}: ContentHeaderProps) => {
  return (
    <Box
      display='flex'
      gap={[1, 2]}
      flex={1}
      width={['100%', 'auto']}
      justifyContent={['center', 'flex-end']}
      position={['absolute', 'relative']}
      bottom={[0, 'auto']}
      left={[0, 'auto']}
      px={['10px', 0]}
      py={[2, 0]}
      boxShadow={['0px 0px 8px 0px #00000014', 'none']}
    >
      {secondaryButtonLabel && (
        <CButton variant='link' sx={{ width: ['100%', 'auto'] }} onClick={secondaryButtonClick}>
          {secondaryButtonIcon}
          {secondaryButtonLabel}
        </CButton>
      )}
      {primaryButtonLabel && (
        <CButton variant='secondary' sx={{ width: ['100%', 'auto'] }} onClick={primaryButtonClick}>
          {primaryButtonIcon}
          {primaryButtonLabel}
        </CButton>
      )}
    </Box>
  )
}
