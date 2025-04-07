import styled from 'styled-components'
import { Stack } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'
import { CardTitleWrapper } from '@/components/Card'
import { breakpoint } from '@/utils/breakpoints'
import Button from '@/v3/presentation/components/Button'
import { CInputControlled } from '@/v3/presentation/newComponents'

export const StyledTitleWrapper = styled(CardTitleWrapper)`
  color: var(--mui-palette-primary-main);
`

export const StyledStack = styled(Stack)``

export const StyledTextField = styled(CInputControlled)``

export const StyledButton = styled(Button)``

export const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
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

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};

  @media (min-width: ${breakpoint('md')}) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${spacing(3, 2)};

    ${StyledStack} {
      width: calc((100% / 2) - ${spacing(1)});

      &:nth-of-type(5) {
        width: calc(((100% / 12) * 5) - ${spacing(2)});
      }

      &:nth-of-type(6) {
        width: calc(((100% / 12) * 1) - ${spacing(1)});
      }

      &:nth-of-type(7),
      &:nth-of-type(8) {
        width: calc(((100% / 12) * 3) - ${spacing(1.5)});
      }
    }
  }
`

export const StyledContainer = styled(Paper)`
  padding: ${spacing(2)};

  ${StyledTitleWrapper} {
    margin-bottom: ${spacing(5)};
  }
`
