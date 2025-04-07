import styled from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'
import { CardTitleWrapper } from '@/components/Card'
import { Paper } from '@/v3/presentation/components/Paper'
import { breakpoint } from '@/utils/breakpoints'
import Button from '@/v3/presentation/components/Button'

export const StyledInputContainer = styled.div``

export const StyledButton = styled(Button)``

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};

  @media (min-width: ${breakpoint('md')}) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${spacing(3)};

    ${StyledInputContainer} {
      width: calc(50% - ${spacing(3)});
    }
  }
`
export const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  margin-top: ${spacing(4)};
  width: 100%;

  @media (min-width: ${breakpoint('md')}) {
    flex-direction: row;
    justify-content: flex-end;

    ${StyledButton} {
      &:last-of-type {
        order: -1;
      }
    }
  }
`

export const StyledTitleWrapper = styled(CardTitleWrapper)`
  color: var(--mui-palette-primary-main);
`

export const StyledPaper = styled(Paper)`
  padding: ${spacing(2)};

  ${StyledTitleWrapper} {
    margin-bottom: ${spacing(5)};
  }
`
