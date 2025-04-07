import { Box } from '@mui/material'
import styled from '@mui/system/styled'

import { breakpoint } from '@/utils/breakpoints'

export const StyledPaginationWrapper = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${breakpoint('sm')}) {
    flex-direction: column;
  }
`
