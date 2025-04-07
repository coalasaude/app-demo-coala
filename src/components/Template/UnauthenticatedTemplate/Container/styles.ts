import { Container as MContainer } from '@mui/material'
import styledEngine from '@mui/styled-engine'

import { breakpoint } from '@/utils/breakpoints'
import { spacing } from '@/utils/spacing'

export const Container = styledEngine(MContainer)`
  min-height: 100vh;
  width: 100%;
  min-height: 100vh;
  min-width: 100%;
  background: var(--mui-palette-background-default);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: ${spacing(4)};

  & > svg {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  @media (max-width: ${breakpoint('sm')}) {
    padding: 0;
    background: white;
  }
`
