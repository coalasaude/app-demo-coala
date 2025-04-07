import styled from 'styled-components'
import { Typography } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'
import { CInput } from '@/v3/presentation/newComponents'

export const StyledTitle = styled(Typography)<any>``

export const StyledTextField = styled(CInput)``

export const StyledInputContainer = styled.div``

export const StyledIndicationAreaContent = styled.div`
  margin-top: ${spacing(4)};
`

export const StyledIndicationAreaCard = styled(Paper)`
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

export const StyledRulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
`

export const StyledList = styled.ol`
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  padding: ${spacing(0, 2)};

  li {
    margin-bottom: ${spacing(2)};

    &:last-of-type {
      margin-bottom: 0;
    }

    &::marker {
      font-weight: 600;
    }
  }

  ul {
    padding-left: ${spacing(2)};
    list-style: disc;

    li {
      margin-bottom: 0;
    }
  }
`

export const StyledFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
  margin-bottom: ${spacing(4)};

  @media (min-width: ${breakpoint('md')}) {
    flex-direction: row;

    ${StyledInputContainer} {
      width: calc(50% - ${spacing(1)});
    }
  }
`
