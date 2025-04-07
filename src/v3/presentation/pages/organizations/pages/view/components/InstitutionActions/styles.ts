import styled from 'styled-components'
import { Box } from '@mui/material'

import { breakpoint } from '@/utils/breakpoints'
import { spacing } from '@/utils/spacing'
import Paper from '@/v3/presentation/components/Paper'
import { CardTitleWrapper } from '@/components/Card'

export const StyledContainer = styled(Box)`
  align-items: center;
  display: flex;
  gap: ${spacing(1)};
  padding: 0 ${spacing(2)};

  @media (min-width: ${breakpoint('md')}) {
    padding: 0;
  }
`
export const StyledCardTitleWrapper = styled(CardTitleWrapper)``

export const StyledCard = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};
  min-height: auto;
  height: 88px;
  width: max-content;
  flex-grow: 1;
  padding: ${spacing(1)};
  padding-right: ${spacing(2)};

  ${StyledCardTitleWrapper} {
    margin-bottom: 0;
    width: max-content;

    &::after {
      height: 22px;
    }
  }

  @media (min-width: ${breakpoint('md')}) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: ${spacing(2)};
    padding-top: ${spacing(2)};
  }
`
