import styled from 'styled-components'
import styledEngine from '@mui/styled-engine'
import { Grid } from '@mui/material'

import { spacing } from '@/utils/spacing'
import { breakpoint } from '@/utils/breakpoints'

export const Container = styledEngine(Grid)`
  padding: ${spacing(1)};
  padding-left: 0;
`

export const Content = styled.div`
  & > * {
    border-left: unset !important;
    padding-left: ${spacing(1)};
  }
  @media (max-width: ${breakpoint('md')}) {
    & > * {
      border-left: unset !important;
      padding-left: ${spacing(1)};
    }
  }
`
