import styled from 'styled-components'

import { breakpoint } from '@/utils/breakpoints'
import { spacing } from '@/v3/presentation/utils/spacing'
import Paper from '@/v3/presentation/components/Paper'

export const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  padding: ${spacing(1)};

  @media (min-width: ${breakpoint('md')}) {
  }
`

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing(4)};
  padding: ${spacing(1)};
`
