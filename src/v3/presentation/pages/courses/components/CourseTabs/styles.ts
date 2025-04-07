import { styled } from '@mui/material/styles'

import { spacing } from '@/v3/presentation/utils/spacing'
import { Paper } from '@/v3/presentation/components/Paper'
import { breakpoint } from '@/utils/breakpoints'

export const StyledCourseTabsWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: ${spacing(2)};
  padding: ${spacing(1)};

  @media (min-width: ${breakpoint('md')}) {
    width: 100%;
  }
`
