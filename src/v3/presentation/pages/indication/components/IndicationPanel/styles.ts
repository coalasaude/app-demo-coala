import styled from 'styled-components'
import { Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'
import { CardTitleWrapper } from '@/components/Card'

export const StyledTypography = styled(Typography)``

export const StyledModalTitle = styled(Typography)`
  color: var(--mui-palette-primary-main);
  font-size: 20px;
  font-weight: bold;
`

export const StyledTitleWrapper = styled(CardTitleWrapper)``

export const StyledButtonIcon = styled(KeyboardArrowRightIcon)`
  color: var(--mui-palette-primary-main);
`

export const StyledCardButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--mui-palette-primary-main);
  cursor: pointer;
  display: flex;
  font-size: 11px;
  font-weight: bold;
  padding: 0;
  text-transform: uppercase;
`

export const StyledCard = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};
  justify-content: space-between;
  padding: ${spacing(1)};
  height: ${spacing(11)};

  @media (min-width: ${breakpoint('md')}) {
    align-items: center;
    flex-direction: row;
    padding-right: ${spacing(2)};
    height: ${spacing(9)};
  }

  ${StyledTitleWrapper} {
    ${StyledTypography} {
      font-size: 11px;

      @media (min-width: ${breakpoint('md')}) {
        font-size: 14px;
      }
    }
  }
`

export const StyledCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${StyledTypography} {
    font-size: 24px;
    font-weight: 300;
  }

  @media (min-width: ${breakpoint('md')}) {
    gap: ${spacing(4)};
  }
`

export const StyledContainer = styled.div`
  display: flex;
  gap: ${spacing(1)};

  @media (min-width: ${breakpoint('md')}) {
    gap: ${spacing(4)};
  }

  ${StyledCard} {
    flex: 3;

    &:last-of-type {
      flex: 5;
    }

    ${StyledTypography} {
      line-height: 1;
    }
  }
`
