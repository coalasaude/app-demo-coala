import { Box } from '@mui/material'

import { CDivider } from '@/v3/presentation/newComponents'
import { useBreakpoint } from '@/hooks/useBreakpoints'

export const WrapperButtonsForm = ({ children }: { children: React.ReactNode }) => {
  const isSmallDevice = useBreakpoint('sm')

  return (
    <Box
      pb={2}
      pt={isSmallDevice ? 1 : 2}
      position={isSmallDevice ? 'fixed' : 'unset'}
      bottom={0}
      right={5}
      width='100%'
      zIndex={1}
      sx={{ background: 'white' }}
    >
      <CDivider sx={{ my: isSmallDevice ? 1 : 2 }} />
      {children}
    </Box>
  )
}
