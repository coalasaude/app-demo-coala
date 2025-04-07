import styled from 'styled-components'
import { Typography } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'

export const StyledTitle = styled(Typography)<any>``

export const StyledDisclaimerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
`

export const StyledDisclaimerCard = styled(Paper)`
  padding: ${spacing(2)};

  ${StyledTitle} {
    margin-bottom: ${spacing(1)};
    color: var(--mui-palette-primary-main);
    font-weight: bold;
  }

  @media (min-width: ${breakpoint('md')}) {
    padding: ${spacing(2, 3)};
  }
`
