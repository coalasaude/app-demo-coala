import { styled } from '@mui/material/styles'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'

export const StyledQuizContainer = styled(Paper)`
  padding: ${spacing(2)};
  margin: ${spacing(1)};
  display: flex;
  flex-direction: column;
  gap: ${spacing(1)};
`

export const StyledQuizHeader = styled('div')`
  padding: ${spacing(1)};
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h2 {
    font-size: 12px;
    margin-bottom: ${spacing(1)};
    color: var(--mui-palette-grey-700);
  }
  h1 {
    font-size: 18px;
  }
`

export const StyledOnlyDesktop = styled('div')`
  @media (max-width: ${breakpoint('sm')}) {
    display: none;
  }
`
