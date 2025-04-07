import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { breakpoint } from '@/utils/breakpoints'

export const InputContainer = styled(Box)`
  width: 50%;
  @media (max-width: ${breakpoint('sm')}) {
    width: 100%;
  }
`
