import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { breakpoint } from '@/utils/breakpoints'

export const StyledChartsCard = styled(Box)`
  height: 100%;
  padding: ${({ theme }) => theme.spacing(2)};

  @media (max-width: ${breakpoint('md')}) {
    padding-right: ${({ theme }) => theme.spacing(1)};
    padding-left: ${({ theme }) => theme.spacing(1)};
  }
`
