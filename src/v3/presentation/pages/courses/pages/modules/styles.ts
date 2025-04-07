import { styled } from '@mui/material/styles'

import { breakpoint } from '@/utils/breakpoints'

export const StyledWrapperOnlyMobile = styled('div')`
  width: 100%;

  @media (min-width: ${breakpoint('sm')}) {
    display: none;
  }
`
