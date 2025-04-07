import styled from 'styled-components'
import { Box } from '@mui/material'

import { spacing } from '@/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'

export const PaginationWrapper = styled(Box)`
  margin-top: ${spacing(2)};
  margin-bottom: ${spacing(2)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${breakpoint('sm')}) {
    flex-direction: column;
  }
`
